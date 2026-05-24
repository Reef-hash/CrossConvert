import { jsPDF } from 'jspdf';
import type { FileProcessorAdapter } from '../../../types/processing';
import { createMimeValidator } from '../validators/imageFileValidator';

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

const readAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image decode failed.'));
    image.src = src;
  });

export const imageToPdfProcessor: FileProcessorAdapter = {
  id: 'image-to-pdf',
  accepts: acceptedTypes,
  outputs: ['application/pdf'],
  supportsPreview: false,
  validate: createMimeValidator(acceptedTypes, [/\.png$/i, /\.jpe?g$/i, /\.webp$/i]),
  process: async (file, onProgress) => {
    onProgress?.(25);
    const dataUrl = await readAsDataUrl(file);
    const image = await loadImage(dataUrl);

    const orientation = image.width >= image.height ? 'l' : 'p';
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [image.width, image.height],
    });

    onProgress?.(70);
    const format = file.type === 'image/png' ? 'PNG' : file.type === 'image/webp' ? 'WEBP' : 'JPEG';
    pdf.addImage(dataUrl, format, 0, 0, image.width, image.height);

    onProgress?.(95);
    const blob = pdf.output('blob');
    onProgress?.(100);
    return blob;
  },
  getOutputFileName: (input) => input.name.replace(/\.[^.]+$/i, '.pdf'),
};
