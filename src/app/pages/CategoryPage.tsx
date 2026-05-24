import { Navigate, useParams } from 'react-router-dom';
import { SectionTitle } from '../../components/common/SectionTitle';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import type { ToolCategoryId } from '../../types/tool';
import { CategoryIcon } from '../../features/platform/components/CategoryIcon';
import { ToolCard } from '../../features/platform/components/ToolCard';
import { createCategoryMetadata, createToolsMetadata } from '../../features/platform/services/metadataService';
import { getCategoryById, getToolsByCategory } from '../../features/platform/services/toolRegistry';

export const CategoryPage = () => {
  const params = useParams<{ categoryId: ToolCategoryId }>();
  const categoryId = params.categoryId as ToolCategoryId | undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  usePageMetadata(category ? createCategoryMetadata(category) : createToolsMetadata());

  if (!categoryId) return <Navigate to="/tools" replace />;
  if (!category) return <Navigate to="/tools" replace />;

  const tools = getToolsByCategory(category.id);

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-xl shadow-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-900/70 dark:shadow-black/30">
          <div className="rounded-2xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300 inline-flex">
            <CategoryIcon iconKey={category.iconKey} className="h-6 w-6" />
          </div>
          <SectionTitle eyebrow={category.shortName} title={category.heroTitle} subtitle={category.heroDescription} />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};
