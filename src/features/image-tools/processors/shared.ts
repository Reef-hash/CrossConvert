import type { FileProcessorAdapter } from '../../../types/processing';
import { createMimeValidator } from '../validators/imageFileValidator';

export interface DecodedImage {
  width: number;
  height: number;
  draw: (context: CanvasRenderingContext2D, width: number, height: number) => void;
  cleanup?: () => void;
}

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image decode failed.'));
    image.src = src;
  });

export const decodeImage = async (file: File): Promise<DecodedImage> => {
  if (typeof createImageBitmap !== 'undefined') {
    const bitmap = await createImageBitmap(file);
    return {
      width: bitmap.width,
      height: bitmap.height,
      draw: (context, width, height) => context.drawImage(bitmap, 0, 0, width, height),
      cleanup: () => bitmap.close(),
    };
  }

  const sourceUrl = URL.createObjectURL(file);
  const image = await loadImageElement(sourceUrl);
  URL.revokeObjectURL(sourceUrl);

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
    draw: (context, width, height) => context.drawImage(image, 0, 0, width, height),
  };
};

export const canvasToBlob = async (canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Image export failed.'));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });

const extRegexFromMime = (mime: string): RegExp => {
  const ext = mime.split('/')[1]?.replace('+xml', '') ?? 'img';
  return new RegExp(`\\.${ext}$`, 'i');
};

interface SimpleRasterProcessorParams {
  id: string;
  accepts: string[];
  outputType: string;
  outputExt: string;
  quality?: number;
}

export const createSimpleRasterProcessor = ({
  id,
  accepts,
  outputType,
  outputExt,
  quality,
}: SimpleRasterProcessorParams): FileProcessorAdapter => {
  const extPatterns = accepts.flatMap((mime) => {
    if (mime === 'image/jpeg') {
      return [/\.jpe?g$/i];
    }
    return [extRegexFromMime(mime)];
  });

  return {
    id,
    accepts,
    outputs: [outputType],
    supportsPreview: true,
    validate: createMimeValidator(accepts, extPatterns),
    process: async (file, onProgress) => {
      onProgress?.(20);
      const decoded = await decodeImage(file);
      onProgress?.(55);

      const canvas = document.createElement('canvas');
      canvas.width = decoded.width;
      canvas.height = decoded.height;
      const context = canvas.getContext('2d');
      if (!context) {
        decoded.cleanup?.();
        throw new Error('Canvas context is unavailable.');
      }

      decoded.draw(context, decoded.width, decoded.height);
      decoded.cleanup?.();
      onProgress?.(80);

      const blob = await canvasToBlob(canvas, outputType, quality);
      onProgress?.(100);
      return blob;
    },
    getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, outputExt),
  };
};
