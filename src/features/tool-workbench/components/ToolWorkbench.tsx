import { Card } from '../../../components/common/Card';
import type { ToolDefinition } from '../../../types/tool';
import { useToolWorkbench } from '../hooks/useToolWorkbench';
import { WorkbenchDropzone } from './WorkbenchDropzone';
import { WorkbenchTaskList } from './WorkbenchTaskList';
import { WorkbenchPreviewGrid } from './WorkbenchPreviewGrid';
import { WorkbenchToolbar } from './WorkbenchToolbar';

interface ToolWorkbenchProps {
  tool: ToolDefinition;
}

export const ToolWorkbench = ({ tool }: ToolWorkbenchProps) => {
  const { tasks, isProcessing, processor, isProcessorLoading, addFiles, removeTask, clearAll, processAll } = useToolWorkbench(tool);

  return (
    <Card>
      <WorkbenchDropzone
        accept={tool.accepts?.join(',')}
        onFilesPicked={addFiles}
        title={`Upload files for ${tool.name}`}
        description={tool.longDescription}
      />
      {isProcessorLoading ? (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">Loading processing engine...</p>
      ) : null}
      <WorkbenchToolbar tasks={tasks} isProcessing={isProcessing} onProcessAll={processAll} onClearAll={clearAll} />
      <WorkbenchTaskList tasks={tasks} onRemove={removeTask} />
      {processor?.supportsPreview ? <WorkbenchPreviewGrid tasks={tasks} /> : null}
    </Card>
  );
};
