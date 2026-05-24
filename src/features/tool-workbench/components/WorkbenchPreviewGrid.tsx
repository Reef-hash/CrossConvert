import { Download } from 'lucide-react';
import type { FileProcessingTask } from '../../../types/processing';
import { Button } from '../../../components/common/Button';
import { downloadBlob } from '../utils/download';

interface WorkbenchPreviewGridProps {
  tasks: FileProcessingTask[];
}

export const WorkbenchPreviewGrid = ({ tasks }: WorkbenchPreviewGridProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-zinc-700 dark:bg-zinc-900/60"
        >
          <div className="grid grid-cols-2">
            <div className="border-r border-zinc-200/80 p-3 dark:border-zinc-700">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Source</p>
              {task.sourcePreviewUrl ? (
                <img src={task.sourcePreviewUrl} alt={`${task.sourceFile.name} source preview`} className="h-40 w-full rounded-lg object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-xs text-zinc-500 dark:border-zinc-600">Preview unavailable</div>
              )}
            </div>
            <div className="p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Result</p>
              {task.resultPreviewUrl ? (
                <img src={task.resultPreviewUrl} alt={`${task.sourceFile.name} result preview`} className="h-40 w-full rounded-lg object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-xs text-zinc-500 dark:border-zinc-600">Waiting for processing</div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-200/80 p-3 dark:border-zinc-700">
            <p className="truncate text-sm text-zinc-700 dark:text-zinc-200">{task.resultFileName ?? 'Result pending'}</p>
            <Button
              variant="secondary"
              disabled={!task.resultBlob || !task.resultFileName}
              onClick={() => {
                if (!task.resultBlob || !task.resultFileName) return;
                downloadBlob(task.resultBlob, task.resultFileName);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};
