import { categoryCatalog } from '../catalog/categoryCatalog';
import { toolCatalog } from '../catalog/toolCatalog';
import type { ToolCategoryDefinition, ToolCategoryId, ToolDefinition } from '../../../types/tool';

export const getAllCategories = (): ToolCategoryDefinition[] => categoryCatalog;

export const getCategoryById = (categoryId: ToolCategoryId): ToolCategoryDefinition | undefined =>
  categoryCatalog.find((category) => category.id === categoryId);

export const getAllTools = (): ToolDefinition[] => toolCatalog;

export const getToolBySlug = (slug: string): ToolDefinition | undefined =>
  toolCatalog.find((tool) => tool.slug === slug);

export const getToolsByCategory = (categoryId: ToolCategoryId): ToolDefinition[] =>
  toolCatalog.filter((tool) => tool.categoryId === categoryId);

export const getFeaturedTools = (): ToolDefinition[] =>
  toolCatalog.filter((tool) => tool.featured).sort((left, right) => (right.trendingScore ?? 0) - (left.trendingScore ?? 0));

export const getTrendingTools = (limit = 8): ToolDefinition[] =>
  [...toolCatalog]
    .sort((left, right) => (right.trendingScore ?? 0) - (left.trendingScore ?? 0))
    .slice(0, limit);
