import { Rocket, ServerCog, Sparkles } from 'lucide-react';
import type { ToolDefinition } from '../../../types/tool';
import { Card } from '../../../components/common/Card';

interface ComingSoonPanelProps {
  tool: ToolDefinition;
}

export const ComingSoonPanel = ({ tool }: ComingSoonPanelProps) => (
  <Card className="space-y-5">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500">Scaffolded Tool</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{tool.name} is architecture-ready</h3>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">This tool is already registered in the platform catalog, routing system, SEO layer, monetization model, and future processing strategy. The live runtime is not enabled yet.</p>
    </div>
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-700">
        <Rocket className="h-5 w-5 text-amber-500" />
        <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Route + SEO Ready</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Dynamic route, metadata, internal linking, and sitemap coverage can be generated from the same registry.</p>
      </div>
      <div className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-700">
        <ServerCog className="h-5 w-5 text-amber-500" />
        <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Cloud Processing Path</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Execution modes already define when this tool should run in-browser, in workers, or through backend queues and microservices.</p>
      </div>
      <div className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-700">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Monetization Ready</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Pricing tier, API readiness, and premium positioning are already modeled for rollout planning.</p>
      </div>
    </div>
  </Card>
);
