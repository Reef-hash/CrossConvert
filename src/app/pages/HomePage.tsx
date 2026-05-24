import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Globe2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createHomeMetadata } from '../../features/platform/services/metadataService';
import { getAllCategories, getFeaturedTools, getToolsByCategory } from '../../features/platform/services/toolRegistry';
import { getTrendingDiscovery, getRecentTools } from '../../features/platform/services/discoveryService';
import { CategoryCard } from '../../features/platform/components/CategoryCard';
import { ToolCard } from '../../features/platform/components/ToolCard';

const platformStats = [
  { label: 'Planned tool surfaces', value: '60+' },
  { label: 'Core categories', value: '7' },
  { label: 'Execution modes', value: '5' },
  { label: 'Initial live tool', value: 'WEBP → PNG' },
];

const reasons = [
  {
    title: 'Registry-driven architecture',
    description: 'Tools, metadata, routes, discovery, and monetization hooks derive from a single catalog.',
    icon: Globe2,
  },
  {
    title: 'Browser-first where it makes sense',
    description: 'Privacy-friendly local processing for lightweight workflows, with a clean upgrade path to workers and cloud jobs.',
    icon: ShieldCheck,
  },
  {
    title: 'Built for heavy workloads later',
    description: 'Queue workers, microservices, AI inference, and API delivery are modeled into the execution layer from day one.',
    icon: Cpu,
  },
];

export const HomePage = () => {
  usePageMetadata(createHomeMetadata());

  const categories = getAllCategories();
  const featuredTools = getFeaturedTools().slice(0, 8);
  const trendingTools = getTrendingDiscovery();
  const recentTools = getRecentTools();

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-14 pt-16 md:px-6 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <div className="absolute left-[-10%] top-[-20%] h-64 w-64 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-500/20" />
          <div className="absolute bottom-[-20%] right-[-5%] h-72 w-72 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/20" />
        </div>
        <div className="mx-auto max-w-6xl animate-fade-in">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Platform-first SaaS utility architecture
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-zinc-950 dark:text-zinc-100 md:text-6xl">
                One platform for image, PDF, video, audio, AI, developer, and file utilities.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
                CrossConvert is being built as a centralized toolbox with programmatic SEO, dynamic tool routing, premium-ready services, and a processor architecture that scales from browser conversions to cloud pipelines.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/tools/webp-to-png">
                  <Button>
                    Launch WEBP to PNG
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="secondary">Explore All Tools</Button>
                </Link>
              </div>
            </div>
            <Card className="grid gap-4 p-6 md:grid-cols-2">
              {platformStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{stat.label}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Categories" title="A real utility platform, not a one-off converter" subtitle="The architecture already supports multi-category growth, tool discovery, premium routing, and future backend execution models." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} toolCount={getToolsByCategory(category.id).length} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Popular Tools" title="Discovery, trending, and featured workflows" subtitle="The catalog powers home-page recommendations, category listings, search, recent usage, and future personalized suggestions." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Why Choose Us" title="Engineered for startup speed and enterprise growth" subtitle="The current MVP remains browser-first, but the core contracts already support API access, history, billing, analytics, and queue workers." />
          <div className="grid gap-4 lg:grid-cols-3">
            {reasons.map((reason) => (
              <Card key={reason.title}>
                <reason.icon className="h-5 w-5 text-amber-500" />
                <h3 className="mt-4 font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100">{reason.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1fr,1fr]">
          <Card>
            <div className="flex items-center gap-2 text-amber-500">
              <Zap className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em]">Trending now</p>
            </div>
            <div className="mt-4 grid gap-3">
              {trendingTools.map((tool) => (
                <Link key={tool.id} to={`/tools/${tool.slug}`} className="rounded-xl border border-zinc-200/70 px-4 py-3 text-sm transition hover:border-amber-500 dark:border-zinc-700">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</span>
                    <span className="text-zinc-500">{tool.trendingScore}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 text-sky-500">
              <Sparkles className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em]">Recently used</p>
            </div>
            <div className="mt-4 grid gap-3">
              {recentTools.length > 0 ? (
                recentTools.map((tool) => (
                  <Link key={tool.id} to={`/tools/${tool.slug}`} className="rounded-xl border border-zinc-200/70 px-4 py-3 text-sm transition hover:border-sky-500 dark:border-zinc-700">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Your recently opened tools will appear here once you start using the platform.</p>
              )}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Card className="flex flex-col items-start justify-between gap-6 bg-zinc-950 text-white dark:bg-zinc-900 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Call to action</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">Start with the live MVP, scale into everything else.</h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-300">WEBP to PNG is already live inside the new platform foundation. The rest of the toolbox is scaffolded for fast delivery without rewriting core systems.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/tools/webp-to-png">
                <Button>Open live tool</Button>
              </Link>
              <Link to="/tools">
                <Button variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">View platform catalog</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
