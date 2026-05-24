import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import type { ToastMessage } from '../../types/ui';
import { cn } from '../../utils/cn';

interface ToastProps {
  toast: ToastMessage;
}

export const Toast = ({ toast }: ToastProps) => {
  const icon =
    toast.variant === 'success' ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : toast.variant === 'error' ? (
      <AlertCircle className="h-4 w-4" />
    ) : (
      <Info className="h-4 w-4" />
    );

  return (
    <div
      className={cn(
        'animate-slide-up rounded-xl border p-4 text-sm shadow-xl backdrop-blur',
        toast.variant === 'success' && 'border-emerald-300/40 bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100',
        toast.variant === 'error' && 'border-rose-300/40 bg-rose-100/90 text-rose-800 dark:bg-rose-950/60 dark:text-rose-100',
        toast.variant === 'info' && 'border-sky-300/40 bg-sky-100/90 text-sky-800 dark:bg-sky-950/60 dark:text-sky-100',
      )}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5">{icon}</span>
        <div>
          <p className="font-semibold">{toast.title}</p>
          {toast.description ? <p className="mt-1 opacity-90">{toast.description}</p> : null}
        </div>
      </div>
    </div>
  );
};
