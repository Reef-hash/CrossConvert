export type ProcessingStatus =
  | 'queued'
  | 'validating'
  | 'ready'
  | 'processing'
  | 'done'
  | 'error';

export interface FileTaskValidationResult {
  valid: boolean;
  reason?: string;
}

export interface FileProcessingTask {
  id: string;
  sourceFile: File;
  sourcePreviewUrl?: string;
  resultBlob?: Blob;
  resultPreviewUrl?: string;
  resultFileName?: string;
  status: ProcessingStatus;
  progress: number;
  error?: string;
}

export interface FileProcessorAdapter {
  id: string;
  accepts: string[];
  outputs: string[];
  validate: (file: File) => FileTaskValidationResult;
  process: (file: File, onProgress?: (progress: number) => void) => Promise<Blob>;
  getOutputFileName: (input: File) => string;
  supportsPreview: boolean;
}
