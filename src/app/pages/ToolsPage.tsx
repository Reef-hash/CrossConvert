import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { SectionTitle } from '../../components/common/SectionTitle';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createToolsMetadata } from '../../features/platform/services/metadataService';
import { getAllCategories } from '../../features/platform/services/toolRegistry';
import { getRecentTools, getTrendingDiscovery, searchTools } from '../../features/platform/services/discoveryService';
import type { ToolCategoryId } from '../../types/tool';
import { ToolSearchBar } from '../../features/platform/components/ToolSearchBar';
import { ToolCard } from '../../features/platform/components/ToolCard';

export const ToolsPage = () => {
  usePageMetadata(createToolsMetadata());

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryId | undefined>();
  const categories = getAllCategories();

  const results = useMemo(() => searchTools(query, selectedCategory), [query, selectedCategory]);
  const trending = getTrendingDiscovery();
  const recent = getRecentTools();

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Tool Catalog" title="Explore the full platform toolbox" subtitle="Search tools, browse categories, inspect trending workflows, and open live or scaffolded pages from one dynamic catalog." />

        <Card>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <ToolSearchBar
              value={query}
              onChange={(value) => {
                setQuery(value);
                setSearchParams(value ? { search: value } : {});
              }}
              placeholder="Search image, PDF, AI, developer, or media tools"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(undefined)}
                className={`rounded-full px-4 py-2 text-sm ${!selectedCategory ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'}`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm ${selectedCategory === category.id ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'}`}
                >
                  {category.shortName}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Search results</h2>
              <Badge tone="amber">{results.length} results</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Trending tools</p>
              <div className="mt-4 space-y-3">
                {trending.map((tool) => (
                  <Link key={tool.id} to={`/tools/${tool.slug}`} className="block rounded-xl border border-zinc-200/70 px-4 py-3 text-sm transition hover:border-amber-500 dark:border-zinc-700">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">{tool.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">Recently used</p>
              <div className="mt-4 space-y-3">
                {recent.length > 0 ? (
                  recent.map((tool) => (
                    <Link key={tool.id} to={`/tools/${tool.slug}`} className="block rounded-xl border border-zinc-200/70 px-4 py-3 text-sm transition hover:border-sky-500 dark:border-zinc-700">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Recently opened tools will appear here.</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
