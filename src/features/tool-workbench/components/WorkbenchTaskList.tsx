import { Trash2 } from 'lucide-react';
import type { FileProcessingTask } from '../../../types/processing';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { formatFileSize } from '../../../utils/format';

interface WorkbenchTaskListProps {
  tasks: FileProcessingTask[];
  onRemove: (taskId: string) => void;
}

export const WorkbenchTaskList = ({ tasks, onRemove }: WorkbenchTaskListProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="rounded-xl border border-zinc-200/80 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{task.sourceFile.name}</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{formatFileSize(task.sourceFile.size)}</p>
            </div>
            <Button variant="ghost" onClick={() => onRemove(task.id)} aria-label="Remove file">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-700">
            <div className="h-full rounded-full bg-amber-500 transition-all duration-300" style={{ width: `${task.progress}%` }} />
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {task.status === 'processing' ? <Loader /> : null}
            <span className="capitalize text-zinc-600 dark:text-zinc-300">{task.status}</span>
            {task.error ? <span className="text-rose-500">- {task.error}</span> : null}
          </div>
        </article>
      ))}
    </div>
  );
};
