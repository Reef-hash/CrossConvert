import { createSimpleRasterProcessor } from './shared';

export const jpgToWebpProcessor = createSimpleRasterProcessor({
  id: 'jpg-to-webp',
  accepts: ['image/jpeg'],
  outputType: 'image/webp',
  outputExt: '.webp',
  quality: 0.92,
});
