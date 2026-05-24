import type { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  tone?: 'amber' | 'zinc' | 'emerald' | 'sky';
  className?: string;
}

export const Badge = ({ tone = 'zinc', className, children }: PropsWithChildren<BadgeProps>) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
      tone === 'amber' && 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
      tone === 'zinc' && 'bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
      tone === 'emerald' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
      tone === 'sky' && 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
      className,
    )}
  >
    {children}
  </span>
);
