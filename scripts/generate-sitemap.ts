import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getPublicRoutePaths } from '../src/features/platform/services/routeRegistry';

const appUrl = process.env.VITE_APP_URL ?? 'http://localhost:5173';

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getPublicRoutePaths()
  .map((path) => `  <url><loc>${appUrl}${path}</loc></url>`)
  .join('\n')}\n</urlset>\n`;

const run = async () => {
  const targetDir = resolve(process.cwd(), 'dist');
  await mkdir(targetDir, { recursive: true });
  await writeFile(resolve(targetDir, 'sitemap.xml'), xml, 'utf8');
  console.info('Sitemap written to dist/sitemap.xml');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
