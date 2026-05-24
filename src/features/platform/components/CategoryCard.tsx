import { Link } from 'react-router-dom';
import type { ToolCategoryDefinition } from '../../../types/tool';
import { Card } from '../../../components/common/Card';
import { CategoryIcon } from './CategoryIcon';

interface CategoryCardProps {
  category: ToolCategoryDefinition;
  toolCount: number;
}

export const CategoryCard = ({ category, toolCount }: CategoryCardProps) => (
  <Link to={`/${category.id}`}>
    <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
          <CategoryIcon iconKey={category.iconKey} className="h-5 w-5" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{toolCount} tools</span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100">{category.name}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{category.description}</p>
    </Card>
  </Link>
);
