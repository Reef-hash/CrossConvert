import { Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="top" className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
