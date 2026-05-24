import { createSimpleRasterProcessor } from './shared';

export const jpgToPngProcessor = createSimpleRasterProcessor({
  id: 'jpg-to-png',
  accepts: ['image/jpeg'],
  outputType: 'image/png',
  outputExt: '.png',
});
