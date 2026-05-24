import { createSimpleRasterProcessor } from './shared';

export const svgConverterProcessor = createSimpleRasterProcessor({
  id: 'svg-converter',
  accepts: ['image/svg+xml'],
  outputType: 'image/png',
  outputExt: '.png',
});
