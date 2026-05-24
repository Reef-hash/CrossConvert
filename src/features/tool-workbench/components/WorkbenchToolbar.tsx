import { Download, Sparkles, Trash2 } from 'lucide-react';
import type { FileProcessingTask } from '../../../types/processing';
import { Button } from '../../../components/common/Button';
import { downloadBlob } from '../utils/download';

interface WorkbenchToolbarProps {
  tasks: FileProcessingTask[];
  isProcessing: boolean;
  onProcessAll: () => void;
  onClearAll: () => void;
}

export const WorkbenchToolbar = ({ tasks, isProcessing, onProcessAll, onClearAll }: WorkbenchToolbarProps) => {
  const completedTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-zinc-600 dark:text-zinc-300">{tasks.length} files uploaded • {completedTasks.length} completed</div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={onProcessAll} disabled={tasks.length === 0 || isProcessing}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isProcessing ? 'Processing...' : 'Process All'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            completedTasks.forEach((task) => {
              if (task.resultBlob && task.resultFileName) {
                downloadBlob(task.resultBlob, task.resultFileName);
              }
            });
          }}
          disabled={completedTasks.length === 0 || isProcessing}
        >
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
        <Button variant="ghost" onClick={onClearAll} disabled={tasks.length === 0 || isProcessing}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
