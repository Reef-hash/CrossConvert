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
  const { tasks, isProcessing, processor, addFiles, removeTask, clearAll, processAll } = useToolWorkbench(tool);

  return (
    <Card>
      <WorkbenchDropzone
        accept={tool.accepts?.join(',')}
        onFilesPicked={addFiles}
        title={`Upload files for ${tool.name}`}
        description={tool.longDescription}
      />
      <WorkbenchToolbar tasks={tasks} isProcessing={isProcessing} onProcessAll={processAll} onClearAll={clearAll} />
      <WorkbenchTaskList tasks={tasks} onRemove={removeTask} />
      {processor?.supportsPreview ? <WorkbenchPreviewGrid tasks={tasks} /> : null}
    </Card>
  );
};
