import { createMimeValidator } from '../validators/imageFileValidator';
import { canvasToBlob, decodeImage } from './shared';
import type { FileProcessorAdapter } from '../../../types/processing';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

export const imageCompressorProcessor: FileProcessorAdapter = {
  id: 'image-compressor',
  accepts: acceptedTypes,
  outputs: ['image/jpeg'],
  supportsPreview: true,
  validate: createMimeValidator(acceptedTypes, [/\.png$/i, /\.jpe?g$/i, /\.webp$/i]),
  process: async (file, onProgress) => {
    onProgress?.(20);
    const decoded = await decodeImage(file);
    onProgress?.(50);

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
    const blob = await canvasToBlob(canvas, 'image/jpeg', 0.72);
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.compressed.jpg'),
};
