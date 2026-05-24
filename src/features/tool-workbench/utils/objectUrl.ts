export const createObjectUrl = (fileOrBlob: File | Blob): string => URL.createObjectURL(fileOrBlob);

export const revokeObjectUrl = (value?: string): void => {
  if (!value) return;
  URL.revokeObjectURL(value);
};
