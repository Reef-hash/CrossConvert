interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => (
  <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-semibold text-zinc-900 dark:text-zinc-100 md:text-4xl">{title}</h2>
    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 md:text-base">{subtitle}</p>
  </div>
);
