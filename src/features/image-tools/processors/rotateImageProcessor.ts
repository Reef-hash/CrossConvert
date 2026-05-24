import { createMimeValidator } from '../validators/imageFileValidator';
import { canvasToBlob, decodeImage } from './shared';
import type { FileProcessorAdapter } from '../../../types/processing';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

export const rotateImageProcessor: FileProcessorAdapter = {
  id: 'rotate-image',
  accepts: acceptedTypes,
  outputs: ['image/png'],
  supportsPreview: true,
  validate: createMimeValidator(acceptedTypes, [/\.png$/i, /\.jpe?g$/i, /\.webp$/i]),
  process: async (file, onProgress) => {
    onProgress?.(20);
    const decoded = await decodeImage(file);
    onProgress?.(50);

    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = decoded.width;
    sourceCanvas.height = decoded.height;
    const sourceContext = sourceCanvas.getContext('2d');
    if (!sourceContext) {
      decoded.cleanup?.();
      throw new Error('Canvas context is unavailable.');
    }
    decoded.draw(sourceContext, decoded.width, decoded.height);
    decoded.cleanup?.();

    const targetCanvas = document.createElement('canvas');
    targetCanvas.width = decoded.height;
    targetCanvas.height = decoded.width;
    const targetContext = targetCanvas.getContext('2d');
    if (!targetContext) {
      throw new Error('Canvas context is unavailable.');
    }

    targetContext.translate(targetCanvas.width / 2, targetCanvas.height / 2);
    targetContext.rotate(Math.PI / 2);
    targetContext.drawImage(sourceCanvas, -decoded.width / 2, -decoded.height / 2);

    onProgress?.(80);
    const blob = await canvasToBlob(targetCanvas, 'image/png');
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.rotated.png'),
};
