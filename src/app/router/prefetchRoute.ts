import {
  loadCategoryPage,
  loadComparisonPage,
  loadHomePage,
  loadNotFoundPage,
  loadToolPage,
  loadToolsPage,
} from './pageLoaders';

const prefetchedPaths = new Set<string>();

const categoryPaths = new Set([
  '/image-tools',
  '/pdf-tools',
  '/video-tools',
  '/audio-tools',
  '/ai-tools',
  '/developer-tools',
]);

export const prefetchRoute = (path: string): void => {
  if (!path || prefetchedPaths.has(path)) return;
  prefetchedPaths.add(path);

  if (path === '/') {
    void loadHomePage();
    return;
  }

  if (path === '/tools') {
    void loadToolsPage();
    return;
  }

  if (path.startsWith('/tools/')) {
    void loadToolPage();
    return;
  }

  if (path.startsWith('/compare/')) {
    void loadComparisonPage();
    return;
  }

  if (categoryPaths.has(path)) {
    void loadCategoryPage();
    return;
  }

  void loadNotFoundPage();
};
