export interface ComparisonDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  targetToolSlugs: string[];
  summaryPoints: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const comparisonCatalog: ComparisonDefinition[] = [
  {
    id: 'webp-vs-png',
    slug: 'webp-vs-png',
    title: 'WEBP vs PNG: Which Format Should You Use?',
    description: 'Compare WEBP vs PNG for image quality, file size, transparency, and browser compatibility. Use this guide to choose the right format quickly.',
    primaryKeyword: 'webp vs png',
    keywords: ['webp vs png', 'png vs webp', 'which is better webp or png'],
    targetToolSlugs: ['webp-to-png', 'png-to-webp', 'image-compressor'],
    summaryPoints: [
      'Use WEBP for smaller file size and faster page load performance.',
      'Use PNG when you need lossless quality or broad editing compatibility.',
      'For website delivery, WEBP often wins on speed while preserving strong visual quality.',
    ],
    faqs: [
      {
        question: 'Is WEBP better than PNG for websites?',
        answer: 'For most websites, WEBP is better for performance because file sizes are usually smaller than PNG.',
      },
      {
        question: 'Does WEBP support transparency like PNG?',
        answer: 'Yes. WEBP supports transparency, making it a good PNG alternative for many web graphics.',
      },
    ],
  },
  {
    id: 'jpg-vs-png',
    slug: 'jpg-vs-png',
    title: 'JPG vs PNG: Quality, Size, and Best Use Cases',
    description: 'Learn the key differences between JPG and PNG for photos, graphics, and web publishing. Pick the best format for your use case.',
    primaryKeyword: 'jpg vs png',
    keywords: ['jpg vs png', 'jpeg vs png', 'difference between jpg and png'],
    targetToolSlugs: ['jpg-to-png', 'png-to-jpg', 'image-compressor'],
    summaryPoints: [
      'Use JPG for photos where smaller size matters more than perfect detail.',
      'Use PNG for graphics, text-heavy images, and transparent assets.',
      'A common workflow is editing in PNG and exporting final photos to JPG for delivery.',
    ],
    faqs: [
      {
        question: 'Which is smaller, JPG or PNG?',
        answer: 'JPG is typically smaller for photo content because it uses lossy compression.',
      },
      {
        question: 'Which format is better for logos?',
        answer: 'PNG is often better for logos due to lossless detail and transparent background support.',
      },
    ],
  },
  {
    id: 'png-vs-webp',
    slug: 'png-vs-webp',
    title: 'PNG vs WEBP: Format Comparison for Modern Web Images',
    description: 'Compare PNG vs WEBP to decide the best format for speed, quality, and compatibility across modern browsers and platforms.',
    primaryKeyword: 'png vs webp',
    keywords: ['png vs webp', 'webp vs png', 'should i use png or webp'],
    targetToolSlugs: ['png-to-webp', 'webp-to-png', 'image-compressor'],
    summaryPoints: [
      'WEBP usually delivers smaller files than PNG at similar visual quality.',
      'PNG remains useful for workflows that require strict lossless handling.',
      'Converting PNG assets to WEBP can significantly improve page load speed.',
    ],
    faqs: [
      {
        question: 'Should I convert PNG to WEBP?',
        answer: 'Yes, especially for web delivery where reduced image weight improves performance.',
      },
      {
        question: 'Will converting PNG to WEBP reduce quality?',
        answer: 'WEBP can preserve high quality while lowering size, depending on compression settings.',
      },
    ],
  },
  {
    id: 'avif-vs-png',
    slug: 'avif-vs-png',
    title: 'AVIF vs PNG: Next-Gen Compression vs Compatibility',
    description: 'Understand AVIF vs PNG tradeoffs for compression, quality, and browser support so you can choose the right output format.',
    primaryKeyword: 'avif vs png',
    keywords: ['avif vs png', 'png vs avif', 'is avif better than png'],
    targetToolSlugs: ['avif-to-png', 'png-to-webp', 'webp-to-png'],
    summaryPoints: [
      'AVIF can deliver very small files with strong quality in many cases.',
      'PNG offers broader legacy compatibility for editing and distribution.',
      'Converting AVIF to PNG is helpful when tools or platforms do not support AVIF.',
    ],
    faqs: [
      {
        question: 'Is AVIF better than PNG?',
        answer: 'AVIF is often better for compression efficiency, while PNG is stronger for compatibility and lossless workflows.',
      },
      {
        question: 'Why convert AVIF to PNG?',
        answer: 'You may need PNG for software compatibility, transparent editing assets, or sharing with older systems.',
      },
    ],
  },
];
