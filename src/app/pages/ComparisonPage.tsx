import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Scale } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { SectionTitle } from '../../components/common/SectionTitle';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createComparisonMetadata, createToolsMetadata } from '../../features/platform/services/metadataService';
import { getComparisonBySlug } from '../../features/platform/services/comparisonRegistry';
import { getToolBySlug } from '../../features/platform/services/toolRegistry';

export const ComparisonPage = () => {
  const { comparisonSlug } = useParams<{ comparisonSlug: string }>();
  const comparison = comparisonSlug ? getComparisonBySlug(comparisonSlug) : undefined;

  usePageMetadata(comparison ? createComparisonMetadata(comparison) : createToolsMetadata());

  if (!comparison) return <Navigate to="/tools" replace />;

  const targetTools = comparison.targetToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool) => tool !== undefined);

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100">
          <ArrowLeft className="h-4 w-4" />
          Back to all tools
        </Link>

        <div className="mt-6 rounded-3xl border border-zinc-200/70 bg-white/85 p-8 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/70 dark:shadow-black/30">
          <div className="inline-flex rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
            <Scale className="h-5 w-5" />
          </div>
          <SectionTitle eyebrow="Format comparison" title={comparison.title} subtitle={comparison.description} />
          <p className="text-sm text-zinc-500 dark:text-zinc-300">Primary intent keyword: {comparison.primaryKeyword}</p>
        </div>

        <div className="mt-8 grid gap-4">
          {comparison.summaryPoints.map((point) => (
            <Card key={point}>
              <p className="text-sm text-zinc-700 dark:text-zinc-200">{point}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-300">Recommended next tools</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {targetTools.map((tool) => (
              <Link key={tool.id} to={`/tools/${tool.slug}`} className="rounded-xl border border-zinc-200/70 px-4 py-3 transition hover:border-amber-500 dark:border-zinc-700">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{tool.shortDescription}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-300">
                  Open tool
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-300">Frequently asked questions</p>
          <div className="mt-4 space-y-4">
            {comparison.faqs.map((faq) => (
              <div key={faq.question}>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{faq.question}</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
