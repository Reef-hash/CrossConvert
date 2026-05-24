import { createSimpleRasterProcessor } from './shared';

export const avifToPngProcessor = createSimpleRasterProcessor({
  id: 'avif-to-png',
  accepts: ['image/avif'],
  outputType: 'image/png',
  outputExt: '.png',
});
