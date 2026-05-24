import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3, Layers3, Sparkles } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Card } from '../../components/common/Card';
import { ToolWorkbench } from '../../features/tool-workbench/components/ToolWorkbench';
import { ComingSoonPanel } from '../../features/platform/components/ComingSoonPanel';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createToolMetadata, createToolsMetadata } from '../../features/platform/services/metadataService';
import { getToolBySlug } from '../../features/platform/services/toolRegistry';
import { getRecommendedTools, recordRecentTool } from '../../features/platform/services/discoveryService';
import { analyticsService } from '../../services/analytics/analyticsService';
import { ToolCard } from '../../features/platform/components/ToolCard';
import { isProcessorLive } from '../../features/tool-workbench/services/processorRegistry';

export const ToolPage = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const tool = toolSlug ? getToolBySlug(toolSlug) : undefined;

  usePageMetadata(tool ? createToolMetadata(tool) : createToolsMetadata());

  useEffect(() => {
    if (!tool) return;
    recordRecentTool(tool.slug);
    analyticsService.track('tool_viewed', { toolId: tool.id, categoryId: tool.categoryId });
  }, [tool]);

  if (!tool) return <Navigate to="/tools" replace />;

  const recommended = getRecommendedTools(tool.id);
  const toolIsLive = tool.availability === 'live' && isProcessorLive(tool.processorId);

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100">
          <ArrowLeft className="h-4 w-4" />
          Back to all tools
        </Link>

        <div className="mt-6 grid gap-8 xl:grid-cols-[1fr,320px] xl:items-start">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Badge tone={toolIsLive ? 'emerald' : 'sky'}>{toolIsLive ? 'Live' : tool.availability}</Badge>
              <Badge tone="zinc">{tool.categoryId.replace('-', ' ')}</Badge>
              <Badge tone="amber">{tool.executionModes.join(' / ')}</Badge>
            </div>

            <SectionTitle eyebrow="Tool Page" title={tool.name} subtitle={tool.longDescription} />

            {toolIsLive ? <ToolWorkbench tool={tool} /> : <ComingSoonPanel tool={tool} />}
          </div>

          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300">
                <Layers3 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Tool profile</p>
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Surface:</span> {tool.surface}</p>
                <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Pricing:</span> {tool.monetization.primary}</p>
                <p><span className="font-medium text-zinc-900 dark:text-zinc-100">API ready:</span> {tool.monetization.apiReady ? 'Yes' : 'Planned'}</p>
                <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Ads eligible:</span> {tool.monetization.adsEligible ? 'Yes' : 'No'}</p>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 text-amber-500">
                <Clock3 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Recommended next</p>
              </div>
              <div className="mt-4 space-y-3">
                {recommended.map((item) => (
                  <Link key={item.id} to={`/tools/${item.slug}`} className="block rounded-xl border border-zinc-200/70 px-4 py-3 transition hover:border-amber-500 dark:border-zinc-700">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 text-sky-500">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Related tools</p>
              </div>
              <div className="mt-4 grid gap-3">
                {recommended.slice(0, 2).map((item) => (
                  <ToolCard key={item.id} tool={item} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
