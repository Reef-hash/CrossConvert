import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import type { ToolDefinition } from '../../../types/tool';
import type { FileProcessingTask } from '../../../types/processing';
import { useToast } from '../../../hooks/useToast';
import { analyticsService } from '../../../services/analytics/analyticsService';
import { getProcessorById } from '../services/processorRegistry';
import { createObjectUrl, revokeObjectUrl } from '../utils/objectUrl';

interface WorkbenchState {
  tasks: FileProcessingTask[];
  isProcessing: boolean;
}

type WorkbenchAction =
  | { type: 'addTasks'; payload: FileProcessingTask[] }
  | { type: 'setTaskStatus'; payload: { id: string; status: FileProcessingTask['status']; error?: string } }
  | { type: 'setTaskProgress'; payload: { id: string; progress: number } }
  | {
      type: 'setTaskResult';
      payload: { id: string; resultBlob: Blob; resultFileName: string; resultPreviewUrl?: string };
    }
  | { type: 'setProcessing'; payload: boolean }
  | { type: 'removeTask'; payload: string }
  | { type: 'clearAll' };

const initialState: WorkbenchState = {
  tasks: [],
  isProcessing: false,
};

const reducer = (state: WorkbenchState, action: WorkbenchAction): WorkbenchState => {
  switch (action.type) {
    case 'addTasks':
      return { ...state, tasks: [...state.tasks, ...action.payload] };
    case 'setTaskStatus':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status, error: action.payload.error }
            : task,
        ),
      };
    case 'setTaskProgress':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, progress: action.payload.progress } : task,
        ),
      };
    case 'setTaskResult':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                resultBlob: action.payload.resultBlob,
                resultFileName: action.payload.resultFileName,
                resultPreviewUrl: action.payload.resultPreviewUrl,
                status: 'done',
                progress: 100,
              }
            : task,
        ),
      };
    case 'setProcessing':
      return { ...state, isProcessing: action.payload };
    case 'removeTask':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'clearAll':
      return { ...state, tasks: [] };
    default:
      return state;
  }
};

const createTaskId = (): string => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useToolWorkbench = (tool: ToolDefinition) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tasksRef = useRef(state.tasks);
  const { notify } = useToast();
  const processor = tool.processorId ? getProcessorById(tool.processorId) : undefined;

  useEffect(() => {
    tasksRef.current = state.tasks;
  }, [state.tasks]);

  useEffect(() => {
    return () => {
      tasksRef.current.forEach((task) => {
        revokeObjectUrl(task.sourcePreviewUrl);
        revokeObjectUrl(task.resultPreviewUrl);
      });
    };
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      if (!processor || files.length === 0) return;

      const nextTasks: FileProcessingTask[] = files.map((file) => {
        const validation = processor.validate(file);
        return {
          id: createTaskId(),
          sourceFile: file,
          sourcePreviewUrl: processor.supportsPreview ? createObjectUrl(file) : undefined,
          status: validation.valid ? 'ready' : 'error',
          progress: 0,
          error: validation.reason,
        };
      });

      dispatch({ type: 'addTasks', payload: nextTasks });

      const invalidTasks = nextTasks.filter((task) => task.status === 'error');
      if (invalidTasks.length > 0) {
        notify({
          title: 'Some files were rejected',
          description: 'Check file type and size constraints for this tool.',
          variant: 'error',
        });
      }
    },
    [notify, processor],
  );

  const removeTask = useCallback((taskId: string) => {
    const target = tasksRef.current.find((task) => task.id === taskId);
    if (target) {
      revokeObjectUrl(target.sourcePreviewUrl);
      revokeObjectUrl(target.resultPreviewUrl);
    }
    dispatch({ type: 'removeTask', payload: taskId });
  }, []);

  const clearAll = useCallback(() => {
    tasksRef.current.forEach((task) => {
      revokeObjectUrl(task.sourcePreviewUrl);
      revokeObjectUrl(task.resultPreviewUrl);
    });
    dispatch({ type: 'clearAll' });
  }, []);

  const processAll = useCallback(async () => {
    if (!processor) {
      notify({
        title: 'Processor unavailable',
        description: 'This tool is scaffolded, but the runtime processor is not live yet.',
        variant: 'info',
      });
      return;
    }

    const readyTasks = tasksRef.current.filter((task) => task.status === 'ready');
    if (readyTasks.length === 0) {
      notify({
        title: 'No valid files',
        description: 'Add at least one valid file before processing.',
        variant: 'info',
      });
      return;
    }

    dispatch({ type: 'setProcessing', payload: true });
    analyticsService.track('tool_process_started', { toolId: tool.id, taskCount: readyTasks.length });

    for (const task of readyTasks) {
      try {
        dispatch({ type: 'setTaskStatus', payload: { id: task.id, status: 'processing' } });
        const resultBlob = await processor.process(task.sourceFile, (progress) => {
          dispatch({ type: 'setTaskProgress', payload: { id: task.id, progress } });
        });
        const resultPreviewUrl = processor.supportsPreview ? createObjectUrl(resultBlob) : undefined;
        dispatch({
          type: 'setTaskResult',
          payload: {
            id: task.id,
            resultBlob,
            resultFileName: processor.getOutputFileName(task.sourceFile),
            resultPreviewUrl,
          },
        });
      } catch (error) {
        dispatch({
          type: 'setTaskStatus',
          payload: {
            id: task.id,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unexpected processing error.',
          },
        });
      }
    }

    dispatch({ type: 'setProcessing', payload: false });
    analyticsService.track('tool_process_completed', { toolId: tool.id, taskCount: readyTasks.length });
    notify({
      title: 'Processing complete',
      description: 'Your output files are ready to download.',
      variant: 'success',
    });
  }, [notify, processor, tool.id]);

  const completedCount = useMemo(
    () => state.tasks.filter((task) => task.status === 'done').length,
    [state.tasks],
  );

  return {
    tasks: state.tasks,
    isProcessing: state.isProcessing,
    completedCount,
    processor,
    addFiles,
    removeTask,
    clearAll,
    processAll,
  };
};
