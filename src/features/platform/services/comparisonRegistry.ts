import { comparisonCatalog } from '../catalog/comparisonCatalog';
import type { ComparisonDefinition } from '../catalog/comparisonCatalog';

export const getAllComparisons = (): ComparisonDefinition[] => comparisonCatalog;

export const getComparisonBySlug = (slug: string): ComparisonDefinition | undefined =>
  comparisonCatalog.find((comparison) => comparison.slug === slug);

export const getComparisonsForTool = (toolSlug: string, limit = 2): ComparisonDefinition[] =>
  comparisonCatalog.filter((comparison) => comparison.targetToolSlugs.includes(toolSlug)).slice(0, limit);
