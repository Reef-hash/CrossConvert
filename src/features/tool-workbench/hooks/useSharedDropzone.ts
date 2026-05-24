import { useCallback, useState } from 'react';
import type { DragEvent } from 'react';

interface DropzoneParams {
  onFilesPicked: (files: File[]) => void;
}

export const useSharedDropzone = ({ onFilesPicked }: DropzoneParams) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(false);
      onFilesPicked(Array.from(event.dataTransfer.files));
    },
    [onFilesPicked],
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  return {
    isDragActive,
    bindings: { onDrop, onDragOver, onDragLeave },
  };
};
