import { createSimpleRasterProcessor } from './shared';

export const pngToWebpProcessor = createSimpleRasterProcessor({
  id: 'png-to-webp',
  accepts: ['image/png'],
  outputType: 'image/webp',
  outputExt: '.webp',
  quality: 0.92,
});
