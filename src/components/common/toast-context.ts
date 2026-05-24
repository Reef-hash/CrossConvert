import { createContext } from 'react';
import type { ToastVariant } from '../../types/ui';

export interface NotifyArgs {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export interface ToastContextValue {
  notify: (args: NotifyArgs) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
