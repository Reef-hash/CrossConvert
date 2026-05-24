import { UploadCloud } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { cn } from '../../../utils/cn';
import { useSharedDropzone } from '../hooks/useSharedDropzone';

interface WorkbenchDropzoneProps {
  accept?: string;
  onFilesPicked: (files: File[]) => void;
  title: string;
  description: string;
}

export const WorkbenchDropzone = ({ accept, onFilesPicked, title, description }: WorkbenchDropzoneProps) => {
  const { isDragActive, bindings } = useSharedDropzone({ onFilesPicked });

  return (
    <div
      {...bindings}
      className={cn(
        'relative rounded-2xl border-2 border-dashed p-8 text-center transition duration-200 md:p-10',
        isDragActive
          ? 'border-amber-500 bg-amber-100/60 dark:bg-amber-500/10'
          : 'border-zinc-300 bg-zinc-100/60 dark:border-zinc-700 dark:bg-zinc-800/30',
      )}
    >
      <UploadCloud className="mx-auto h-10 w-10 text-amber-500" />
      <h3 className="mt-3 font-display text-xl font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-600 dark:text-zinc-300">{description}</p>

      <input
        id="tool-file-upload"
        className="sr-only"
        type="file"
        accept={accept}
        multiple
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          onFilesPicked(files);
          event.currentTarget.value = '';
        }}
      />

      <Button
        className="mt-5"
        variant="secondary"
        onClick={() => document.getElementById('tool-file-upload')?.click()}
      >
        Choose Files
      </Button>
    </div>
  );
};
