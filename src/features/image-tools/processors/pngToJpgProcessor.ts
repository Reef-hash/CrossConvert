import { createSimpleRasterProcessor } from './shared';

export const pngToJpgProcessor = createSimpleRasterProcessor({
  id: 'png-to-jpg',
  accepts: ['image/png'],
  outputType: 'image/jpeg',
  outputExt: '.jpg',
  quality: 0.9,
});
