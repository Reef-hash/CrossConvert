import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ToolDefinition } from '../../../types/tool';
import { Badge } from '../../../components/common/Badge';
import { Card } from '../../../components/common/Card';

interface ToolCardProps {
  tool: ToolDefinition;
}

export const ToolCard = ({ tool }: ToolCardProps) => (
  <Link to={`/tools/${tool.slug}`}>
    <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <Badge tone={tool.availability === 'live' ? 'emerald' : tool.availability === 'beta' ? 'sky' : 'zinc'}>
          {tool.availability}
        </Badge>
        {tool.featured ? <Sparkles className="h-4 w-4 text-amber-500" /> : null}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100">{tool.name}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{tool.shortDescription}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>{tool.categoryId.replace('-', ' ')}</span>
        <span className="inline-flex items-center gap-1 text-zinc-900 dark:text-zinc-100">
          Open
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Card>
  </Link>
);
