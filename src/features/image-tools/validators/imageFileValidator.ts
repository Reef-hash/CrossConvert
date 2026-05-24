import { FILE_CONSTRAINTS } from '../../../config/constants';
import type { FileTaskValidationResult } from '../../../types/processing';

export const createMimeValidator = (acceptedMimeTypes: string[], acceptedExtensions: RegExp[]) => {
  return (file: File): FileTaskValidationResult => {
    if (file.size > FILE_CONSTRAINTS.maxFileSizeMb * 1024 * 1024) {
      return {
        valid: false,
        reason: `File ${file.name} exceeds ${FILE_CONSTRAINTS.maxFileSizeMb}MB limit.`,
      };
    }

    const mimeAccepted = acceptedMimeTypes.includes(file.type);
    const extAccepted = acceptedExtensions.some((pattern) => pattern.test(file.name));

    if (!mimeAccepted && !extAccepted) {
      return {
        valid: false,
        reason: `${file.name} is not a supported file for this tool.`,
      };
    }

    return { valid: true };
  };
};
