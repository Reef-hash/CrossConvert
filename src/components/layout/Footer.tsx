import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-zinc-200/70 bg-white/60 py-8 dark:border-zinc-800 dark:bg-zinc-950/60">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 text-sm text-zinc-600 dark:text-zinc-300 md:grid-cols-4 md:px-6">
      <div>
        <p className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">CrossConvert</p>
        <p className="mt-3">All-in-one SaaS utility platform with browser-first MVP tooling and cloud-ready architecture.</p>
      </div>
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Categories</p>
        <div className="mt-3 flex flex-col gap-2">
          <Link to="/image-tools">Image Tools</Link>
          <Link to="/pdf-tools">PDF Tools</Link>
          <Link to="/video-tools">Video Tools</Link>
          <Link to="/developer-tools">Developer Tools</Link>
        </div>
      </div>
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Platform</p>
        <div className="mt-3 flex flex-col gap-2">
          <Link to="/tools">All Tools</Link>
          <Link to="/tools/webp-to-png">Live MVP</Link>
          <span>API Access (planned)</span>
          <span>Dashboard (planned)</span>
        </div>
      </div>
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Company</p>
        <div className="mt-3 flex flex-col gap-2">
          <span>Pricing-ready architecture</span>
          <span>Analytics-ready services</span>
          <span>Cloud processing path</span>
          <p className="pt-2">© {new Date().getFullYear()} CrossConvert</p>
        </div>
      </div>
    </div>
  </footer>
);
