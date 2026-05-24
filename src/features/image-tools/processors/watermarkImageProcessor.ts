import { createMimeValidator } from '../validators/imageFileValidator';
import { canvasToBlob, decodeImage } from './shared';
import type { FileProcessorAdapter } from '../../../types/processing';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

export const watermarkImageProcessor: FileProcessorAdapter = {
  id: 'watermark-image',
  accepts: acceptedTypes,
  outputs: ['image/png'],
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

    const text = 'CrossConvert';
    context.font = `${Math.max(20, Math.round(canvas.width * 0.045))}px sans-serif`;
    context.fillStyle = 'rgba(255,255,255,0.7)';
    context.strokeStyle = 'rgba(0,0,0,0.35)';
    context.lineWidth = 2;
    const x = Math.round(canvas.width * 0.04);
    const y = Math.round(canvas.height * 0.92);
    context.strokeText(text, x, y);
    context.fillText(text, x, y);

    onProgress?.(80);
    const blob = await canvasToBlob(canvas, 'image/png');
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.watermarked.png'),
};
