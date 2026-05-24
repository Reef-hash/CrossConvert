import type { FileProcessorAdapter } from '../../../types/processing';
import { avifToPngProcessor } from '../../image-tools/processors/avifToPngProcessor';
import { cropImageProcessor } from '../../image-tools/processors/cropImageProcessor';
import { imageCompressorProcessor } from '../../image-tools/processors/imageCompressorProcessor';
import { imageToPdfProcessor } from '../../image-tools/processors/imageToPdfProcessor';
import { jpgToPngProcessor } from '../../image-tools/processors/jpgToPngProcessor';
import { jpgToWebpProcessor } from '../../image-tools/processors/jpgToWebpProcessor';
import { pngToJpgProcessor } from '../../image-tools/processors/pngToJpgProcessor';
import { pngToWebpProcessor } from '../../image-tools/processors/pngToWebpProcessor';
import { resizeImageProcessor } from '../../image-tools/processors/resizeImageProcessor';
import { rotateImageProcessor } from '../../image-tools/processors/rotateImageProcessor';
import { svgConverterProcessor } from '../../image-tools/processors/svgConverterProcessor';
import { watermarkImageProcessor } from '../../image-tools/processors/watermarkImageProcessor';
import { webpToPngProcessor } from '../../image-tools/processors/webpToPngProcessor';

const processorRegistry: Record<string, FileProcessorAdapter> = {
  'avif-to-png': avifToPngProcessor,
  'crop-image': cropImageProcessor,
  'image-compressor': imageCompressorProcessor,
  'image-to-pdf': imageToPdfProcessor,
  'jpg-to-png': jpgToPngProcessor,
  'jpg-to-webp': jpgToWebpProcessor,
  'png-to-jpg': pngToJpgProcessor,
  'png-to-webp': pngToWebpProcessor,
  'resize-image': resizeImageProcessor,
  'rotate-image': rotateImageProcessor,
  'svg-converter': svgConverterProcessor,
  'watermark-image': watermarkImageProcessor,
  'webp-to-png': webpToPngProcessor,
};

export const getProcessorById = (processorId: string): FileProcessorAdapter | undefined =>
  processorRegistry[processorId];

export const isProcessorLive = (processorId?: string): boolean =>
  Boolean(processorId && processorRegistry[processorId]);
