export interface FileValidationResult {
  valid: boolean;
  reason?: string;
}

export interface FileConstraints {
  maxFileSizeMb: number;
  maxFiles: number;
}
