import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const NotFoundPage = () => (
  <div className="px-4 py-20 md:px-6">
    <div className="mx-auto max-w-3xl">
      <Card className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-zinc-900 dark:text-zinc-100">Page not found</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">The route exists in the platform shell, but this specific page could not be resolved.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/">
            <Button>Go home</Button>
          </Link>
          <Link to="/tools">
            <Button variant="secondary">Browse tools</Button>
          </Link>
        </div>
      </Card>
    </div>
  </div>
);
