import type { ToolCategoryId, ToolDefinition } from '../../../types/tool';
import { getFeaturedTools, getTrendingTools } from './toolRegistry';
import { toolCatalog } from '../catalog/toolCatalog';

const RECENT_TOOLS_KEY = 'crossconvert-recent-tools';

export const searchTools = (query: string, categoryId?: ToolCategoryId): ToolDefinition[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return toolCatalog.filter((tool) => {
    const inCategory = !categoryId || tool.categoryId === categoryId;
    if (!inCategory) return false;
    if (!normalizedQuery) return true;

    return [tool.name, tool.shortDescription, tool.longDescription, tool.slug, ...tool.searchAliases]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });
};

export const getRecommendedTools = (currentToolId?: string): ToolDefinition[] => {
  return getFeaturedTools()
    .filter((tool) => tool.id !== currentToolId)
    .slice(0, 4);
};

export const getTrendingDiscovery = (): ToolDefinition[] => getTrendingTools(6);

export const recordRecentTool = (toolSlug: string): void => {
  const current = readRecentToolSlugs().filter((item) => item !== toolSlug);
  const next = [toolSlug, ...current].slice(0, 6);
  localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(next));
};

export const readRecentToolSlugs = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export const getRecentTools = (): ToolDefinition[] => {
  const slugs = readRecentToolSlugs();
  return slugs
    .map((slug) => toolCatalog.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolDefinition => Boolean(tool));
};
