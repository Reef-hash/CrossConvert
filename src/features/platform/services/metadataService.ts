import { env } from '../../../config/env';
import type { ToolCategoryDefinition, ToolDefinition } from '../../../types/tool';
import type { ComparisonDefinition } from '../catalog/comparisonCatalog';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  schema?: Record<string, unknown>;
}

export interface ToolFaqItem {
  question: string;
  answer: string;
}

const toolFaqMap: Record<string, ToolFaqItem[]> = {
  'webp-to-png': [
    {
      question: 'How do I convert WEBP to PNG online?',
      answer: 'Open the WEBP to PNG tool, upload your WEBP file, and download the converted PNG in seconds.',
    },
    {
      question: 'Is WEBP to PNG conversion free?',
      answer: 'Yes. You can convert WEBP to PNG for free on CrossConvert.',
    },
    {
      question: 'Are my WEBP files uploaded to a server?',
      answer: 'Current live image tools process files in the browser for privacy-first conversion workflows.',
    },
  ],
  'png-to-jpg': [
    {
      question: 'How do I convert PNG to JPG online?',
      answer: 'Use PNG to JPG, upload your PNG image, and download the optimized JPG output.',
    },
    {
      question: 'Can I reduce file size when converting PNG to JPG?',
      answer: 'Yes. JPG output is often smaller than PNG for photos and web delivery.',
    },
    {
      question: 'Is PNG to JPG converter free to use?',
      answer: 'Yes. PNG to JPG is available as a free image conversion tool.',
    },
  ],
  'jpg-to-png': [
    {
      question: 'How do I convert JPG to PNG online?',
      answer: 'Upload your JPG image, run conversion, then download your PNG file instantly.',
    },
    {
      question: 'What is JPG to PNG useful for?',
      answer: 'JPG to PNG helps when you need PNG format compatibility for editing and publishing workflows.',
    },
    {
      question: 'Can I convert JPEG to PNG too?',
      answer: 'Yes. JPEG and JPG are supported in the same converter flow.',
    },
  ],
  'image-compressor': [
    {
      question: 'How do I compress an image online?',
      answer: 'Open Image Compressor, upload your image, then download the compressed result.',
    },
    {
      question: 'Will compression reduce image quality?',
      answer: 'Compression balances quality and file size. For most web use cases, quality remains visually strong.',
    },
    {
      question: 'Is this image compressor free?',
      answer: 'Yes. You can compress images directly from your browser.',
    },
  ],
  'remove-background': [
    {
      question: 'Can I remove background from images online?',
      answer: 'Yes, background removal is planned as a premium AI workflow in the CrossConvert roadmap.',
    },
    {
      question: 'Will remove background support product photos?',
      answer: 'Yes, the roadmap targets ecommerce and content workflows where clean transparent assets are needed.',
    },
    {
      question: 'When will remove background be available?',
      answer: 'This feature is listed as planned and will be released in an upcoming AI image phase.',
    },
  ],
};

const normalizeKeyword = (value: string): string => value.trim().toLowerCase();

const uniqueKeywords = (keywords: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const keyword of keywords) {
    const normalized = normalizeKeyword(keyword);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
};

const createDefaultToolFaq = (tool: ToolDefinition): ToolFaqItem[] => [
  {
    question: `How do I use the ${tool.name} tool online?`,
    answer: `Open ${tool.name}, upload your file, run the process, and download the result.`
  },
  {
    question: `Is ${tool.name} free to use?`,
    answer: tool.monetization.primary === 'free'
      ? `Yes. ${tool.name} is currently available as a free tool.`
      : `${tool.name} supports premium or credit-based usage depending on the workflow.`
  },
  {
    question: 'Are my files private?',
    answer: tool.executionModes.includes('browser')
      ? 'For browser-mode tools, processing runs locally in your browser for privacy-first workflows.'
      : 'Some workflows use API or queue processing depending on the selected tool capability.'
  },
];

const createToolSchema = (tool: ToolDefinition, canonicalPath: string): Record<string, unknown> => {
  const pageUrl = `${env.appUrl}${canonicalPath}`;
  const faqs = getToolFaqItems(tool);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: tool.categoryId,
        operatingSystem: 'Any',
        url: pageUrl,
        description: tool.seo.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Tools',
            item: `${env.appUrl}/tools`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tool.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

export const getToolFaqItems = (tool: ToolDefinition): ToolFaqItem[] =>
  toolFaqMap[tool.slug] ?? createDefaultToolFaq(tool);

export const createHomeMetadata = (): PageMetadata => ({
  title: 'CrossConvert | All-in-One SaaS Utility Platform',
  description:
    'CrossConvert is a scalable toolbox for image, PDF, video, audio, AI, developer, and file utilities. WEBP to PNG is live, with platform architecture ready for hundreds of future tools.',
  keywords: ['file conversion', 'pdf tools', 'image tools', 'developer tools', 'ai tools'],
  canonicalPath: '/',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CrossConvert',
    url: env.appUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${env.appUrl}/tools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
});

export const createToolsMetadata = (): PageMetadata => ({
  title: 'All Tools | CrossConvert',
  description: 'Browse image, PDF, video, audio, AI, and developer tools in a scalable SaaS utility platform.',
  keywords: ['all tools', 'image tools', 'pdf tools', 'video tools'],
  canonicalPath: '/tools',
});

export const createCategoryMetadata = (category: ToolCategoryDefinition): PageMetadata => ({
  title: category.seo.title,
  description: category.seo.description,
  keywords: category.seo.keywords,
  canonicalPath: `/${category.id}`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
  },
});

export const createToolMetadata = (tool: ToolDefinition): PageMetadata => ({
  title: tool.seo.title,
  description: tool.seo.description,
  keywords: uniqueKeywords([
    ...tool.seo.keywords,
    ...tool.searchAliases,
    tool.name,
    `${tool.name} online`,
    `${tool.name} free`,
  ]),
  canonicalPath: `/tools/${tool.slug}`,
  schema: createToolSchema(tool, `/tools/${tool.slug}`),
});

export const createComparisonMetadata = (comparison: ComparisonDefinition): PageMetadata => {
  const canonicalPath = `/compare/${comparison.slug}`;

  return {
    title: `${comparison.title} | CrossConvert`,
    description: comparison.description,
    keywords: uniqueKeywords([comparison.primaryKeyword, ...comparison.keywords]),
    canonicalPath,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: comparison.title,
          description: comparison.description,
          url: `${env.appUrl}${canonicalPath}`,
          keywords: comparison.keywords.join(', '),
        },
        {
          '@type': 'FAQPage',
          mainEntity: comparison.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Tools',
              item: `${env.appUrl}/tools`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Comparisons',
              item: `${env.appUrl}/compare/${comparison.slug}`,
            },
          ],
        },
      ],
    },
  };
};
