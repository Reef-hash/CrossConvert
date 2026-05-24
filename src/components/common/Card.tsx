import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={cn(
      'rounded-2xl border border-zinc-200/70 bg-white/85 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:shadow-black/30',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);
