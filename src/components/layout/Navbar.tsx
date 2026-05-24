import { NavLink } from 'react-router-dom';
import { APP_NAME } from '../../config/constants';
import type { ThemeMode } from '../../types/ui';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => (
  <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
      <NavLink to="/" className="font-display text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {APP_NAME}
      </NavLink>
      <nav className="hidden items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300 md:flex">
        <NavLink to="/tools" className="transition hover:text-zinc-900 dark:hover:text-white">Tools</NavLink>
        <NavLink to="/image-tools" className="transition hover:text-zinc-900 dark:hover:text-white">Image</NavLink>
        <NavLink to="/pdf-tools" className="transition hover:text-zinc-900 dark:hover:text-white">PDF</NavLink>
        <NavLink to="/video-tools" className="transition hover:text-zinc-900 dark:hover:text-white">Video</NavLink>
        <NavLink to="/developer-tools" className="transition hover:text-zinc-900 dark:hover:text-white">Developer</NavLink>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </header>
);
