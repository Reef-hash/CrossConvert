import type { FileProcessorAdapter } from '../../../types/processing';
import { createMimeValidator } from '../validators/imageFileValidator';

const validateWebp = createMimeValidator(['image/webp'], [/\.webp$/i]);

const loadImageBitmap = async (file: File): Promise<ImageBitmap> => createImageBitmap(file);

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image decode failed.'));
    image.src = src;
  });

export const webpToPngProcessor: FileProcessorAdapter = {
  id: 'webp-to-png',
  accepts: ['image/webp'],
  outputs: ['image/png'],
  supportsPreview: true,
  validate: validateWebp,
  process: async (file, onProgress) => {
    onProgress?.(10);
    const canvas = document.createElement('canvas');

    if (typeof createImageBitmap !== 'undefined') {
      const bitmap = await loadImageBitmap(file);
      onProgress?.(45);
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      if (!context) {
        bitmap.close();
        throw new Error('Canvas context is unavailable.');
      }
      context.drawImage(bitmap, 0, 0);
      bitmap.close();
    } else {
      // Fallback protects support on browsers missing createImageBitmap.
      const sourceUrl = URL.createObjectURL(file);
      const image = await loadImageElement(sourceUrl);
      URL.revokeObjectURL(sourceUrl);
      onProgress?.(45);
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Canvas context is unavailable.');
      }
      context.drawImage(image, 0, 0);
    }

    onProgress?.(85);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(new Error('PNG export failed.'));
          return;
        }
        resolve(result);
      }, 'image/png');
    });

    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.webp$/i, '.png'),
};
