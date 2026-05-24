import type { FileConstraints } from '../types/file';

export const APP_NAME = 'CrossConvert';

export const FILE_CONSTRAINTS: FileConstraints = {
  maxFileSizeMb: 25,
  maxFiles: 20,
};

export const SUPPORTED_ACCEPT = '.webp,image/webp';

export const ANIMATION_MS = {
  fast: 180,
  normal: 300,
};
