import { createMimeValidator } from '../validators/imageFileValidator';
import { canvasToBlob, decodeImage } from './shared';
import type { FileProcessorAdapter } from '../../../types/processing';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxSide = 1920;

export const resizeImageProcessor: FileProcessorAdapter = {
  id: 'resize-image',
  accepts: acceptedTypes,
  outputs: ['image/png'],
  supportsPreview: true,
  validate: createMimeValidator(acceptedTypes, [/\.png$/i, /\.jpe?g$/i, /\.webp$/i]),
  process: async (file, onProgress) => {
    onProgress?.(20);
    const decoded = await decodeImage(file);
    onProgress?.(45);

    const ratio = Math.min(1, maxSide / Math.max(decoded.width, decoded.height));
    const targetWidth = Math.max(1, Math.round(decoded.width * ratio));
    const targetHeight = Math.max(1, Math.round(decoded.height * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      decoded.cleanup?.();
      throw new Error('Canvas context is unavailable.');
    }

    decoded.draw(context, targetWidth, targetHeight);
    decoded.cleanup?.();

    onProgress?.(80);
    const blob = await canvasToBlob(canvas, 'image/png');
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.resized.png'),
};
