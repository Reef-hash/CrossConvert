import type { PropsWithChildren } from 'react';
import { ToastProvider } from '../../components/common/ToastProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
);
