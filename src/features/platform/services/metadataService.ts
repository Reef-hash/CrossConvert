import { env } from '../../../config/env';
import type { ToolCategoryDefinition, ToolDefinition } from '../../../types/tool';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  schema?: Record<string, unknown>;
}

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
  keywords: tool.seo.keywords,
  canonicalPath: `/tools/${tool.slug}`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: tool.categoryId,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  },
});
