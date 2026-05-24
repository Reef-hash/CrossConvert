import type { FileProcessorAdapter } from '../../../types/processing';
import { webpToPngProcessor } from '../../image-tools/processors/webpToPngProcessor';

const processorRegistry: Record<string, FileProcessorAdapter> = {
  'webp-to-png': webpToPngProcessor,
};

export const getProcessorById = (processorId: string): FileProcessorAdapter | undefined =>
  processorRegistry[processorId];

export const isProcessorLive = (processorId?: string): boolean =>
  Boolean(processorId && processorRegistry[processorId]);
