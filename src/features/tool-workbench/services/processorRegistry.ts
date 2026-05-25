import type { FileProcessorAdapter } from '../../../types/processing';

type ProcessorLoader = () => Promise<FileProcessorAdapter>;

const processorLoaders: Record<string, ProcessorLoader> = {
  'avif-to-png': async () => (await import('../../image-tools/processors/avifToPngProcessor')).avifToPngProcessor,
  'crop-image': async () => (await import('../../image-tools/processors/cropImageProcessor')).cropImageProcessor,
  'image-compressor': async () => (await import('../../image-tools/processors/imageCompressorProcessor')).imageCompressorProcessor,
  'image-to-pdf': async () => (await import('../../image-tools/processors/imageToPdfProcessor')).imageToPdfProcessor,
  'jpg-to-png': async () => (await import('../../image-tools/processors/jpgToPngProcessor')).jpgToPngProcessor,
  'jpg-to-webp': async () => (await import('../../image-tools/processors/jpgToWebpProcessor')).jpgToWebpProcessor,
  'png-to-jpg': async () => (await import('../../image-tools/processors/pngToJpgProcessor')).pngToJpgProcessor,
  'png-to-webp': async () => (await import('../../image-tools/processors/pngToWebpProcessor')).pngToWebpProcessor,
  'resize-image': async () => (await import('../../image-tools/processors/resizeImageProcessor')).resizeImageProcessor,
  'rotate-image': async () => (await import('../../image-tools/processors/rotateImageProcessor')).rotateImageProcessor,
  'svg-converter': async () => (await import('../../image-tools/processors/svgConverterProcessor')).svgConverterProcessor,
  'watermark-image': async () => (await import('../../image-tools/processors/watermarkImageProcessor')).watermarkImageProcessor,
  'webp-to-png': async () => (await import('../../image-tools/processors/webpToPngProcessor')).webpToPngProcessor,
};

const loadedProcessors = new Map<string, FileProcessorAdapter>();
const pendingProcessors = new Map<string, Promise<FileProcessorAdapter>>();

export const getProcessorById = async (processorId: string): Promise<FileProcessorAdapter | undefined> => {
  const loaded = loadedProcessors.get(processorId);
  if (loaded) return loaded;

  const pending = pendingProcessors.get(processorId);
  if (pending) return pending;

  const loader = processorLoaders[processorId];
  if (!loader) return undefined;

  const next = loader()
    .then((processor) => {
      loadedProcessors.set(processorId, processor);
      pendingProcessors.delete(processorId);
      return processor;
    })
    .catch((error) => {
      pendingProcessors.delete(processorId);
      throw error;
    });

  pendingProcessors.set(processorId, next);
  return next;
};

export const prefetchProcessorById = async (processorId?: string): Promise<void> => {
  if (!processorId) return;
  try {
    await getProcessorById(processorId);
  } catch {
    // Avoid interrupting UI flow for opportunistic prefetch.
  }
};

export const isProcessorLive = (processorId?: string): boolean =>
  Boolean(processorId && processorLoaders[processorId]);
