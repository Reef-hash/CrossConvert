import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({
  variant = 'primary',
  className,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400',
        variant === 'secondary' &&
          'border border-zinc-300 bg-white/70 text-zinc-900 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-800',
        variant === 'ghost' && 'text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-200 dark:hover:bg-zinc-800/60',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
