import type { PropsWithChildren } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { ThemeContext } from './theme-context';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { theme, toggleTheme } = useDarkMode();

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
