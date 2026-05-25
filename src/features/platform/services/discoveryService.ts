import type { ToolCategoryId, ToolDefinition } from '../../../types/tool';
import { getFeaturedTools, getTrendingTools } from './toolRegistry';
import { toolCatalog } from '../catalog/toolCatalog';

const RECENT_TOOLS_KEY = 'crossconvert-recent-tools';
const SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 150;

interface SearchCacheEntry {
  expiresAt: number;
  results: ToolDefinition[];
}

const searchCache = new Map<string, SearchCacheEntry>();
const recommendedCache = new Map<string, ToolDefinition[]>();
const trendingCache = new Map<number, ToolDefinition[]>();

const buildSearchCacheKey = (query: string, categoryId?: ToolCategoryId): string =>
  `${query.trim().toLowerCase()}::${categoryId ?? 'all'}`;

const pruneSearchCache = (): void => {
  const now = Date.now();
  for (const [key, entry] of searchCache.entries()) {
    if (entry.expiresAt <= now) {
      searchCache.delete(key);
    }
  }

  if (searchCache.size <= SEARCH_CACHE_MAX_ENTRIES) return;

  const overflow = searchCache.size - SEARCH_CACHE_MAX_ENTRIES;
  const keys = Array.from(searchCache.keys());
  for (const key of keys.slice(0, overflow)) {
    searchCache.delete(key);
  }
};

export const searchTools = (query: string, categoryId?: ToolCategoryId): ToolDefinition[] => {
  const cacheKey = buildSearchCacheKey(query, categoryId);
  const cached = searchCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.results;
  }

  const normalizedQuery = query.trim().toLowerCase();

  const results = toolCatalog.filter((tool) => {
    const inCategory = !categoryId || tool.categoryId === categoryId;
    if (!inCategory) return false;
    if (!normalizedQuery) return true;

    return [tool.name, tool.shortDescription, tool.longDescription, tool.slug, ...tool.searchAliases]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });

  searchCache.set(cacheKey, {
    expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
    results,
  });
  pruneSearchCache();

  return results;
};

export const getRecommendedTools = (currentToolId?: string): ToolDefinition[] => {
  const cacheKey = currentToolId ?? '__all__';
  const cached = recommendedCache.get(cacheKey);
  if (cached) return cached;

  const results = getFeaturedTools()
    .filter((tool) => tool.id !== currentToolId)
    .slice(0, 4);

  recommendedCache.set(cacheKey, results);
  return results;
};

export const getTrendingDiscovery = (): ToolDefinition[] => {
  const limit = 6;
  const cached = trendingCache.get(limit);
  if (cached) return cached;

  const results = getTrendingTools(limit);
  trendingCache.set(limit, results);
  return results;
};

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
