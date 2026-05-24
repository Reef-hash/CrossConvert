import { createMimeValidator } from '../validators/imageFileValidator';
import { canvasToBlob, decodeImage } from './shared';
import type { FileProcessorAdapter } from '../../../types/processing';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

export const cropImageProcessor: FileProcessorAdapter = {
  id: 'crop-image',
  accepts: acceptedTypes,
  outputs: ['image/png'],
  supportsPreview: true,
  validate: createMimeValidator(acceptedTypes, [/\.png$/i, /\.jpe?g$/i, /\.webp$/i]),
  process: async (file, onProgress) => {
    onProgress?.(20);
    const decoded = await decodeImage(file);
    onProgress?.(50);

    const side = Math.min(decoded.width, decoded.height);
    const sourceX = Math.round((decoded.width - side) / 2);
    const sourceY = Math.round((decoded.height - side) / 2);

    const canvas = document.createElement('canvas');
    canvas.width = side;
    canvas.height = side;

    const context = canvas.getContext('2d');
    if (!context) {
      decoded.cleanup?.();
      throw new Error('Canvas context is unavailable.');
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = decoded.width;
    tempCanvas.height = decoded.height;
    const tempContext = tempCanvas.getContext('2d');
    if (!tempContext) {
      decoded.cleanup?.();
      throw new Error('Canvas context is unavailable.');
    }
    decoded.draw(tempContext, decoded.width, decoded.height);
    decoded.cleanup?.();

    context.drawImage(tempCanvas, sourceX, sourceY, side, side, 0, 0, side, side);

    onProgress?.(80);
    const blob = await canvasToBlob(canvas, 'image/png');
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.cropped.png'),
};
