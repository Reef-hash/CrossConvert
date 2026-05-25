export const loadHomePage = async () =>
  import('../pages/HomePage').then((module) => ({ default: module.HomePage }));

export const loadToolsPage = async () =>
  import('../pages/ToolsPage').then((module) => ({ default: module.ToolsPage }));

export const loadCategoryPage = async () =>
  import('../pages/CategoryPage').then((module) => ({ default: module.CategoryPage }));

export const loadToolPage = async () =>
  import('../pages/ToolPage').then((module) => ({ default: module.ToolPage }));

export const loadComparisonPage = async () =>
  import('../pages/ComparisonPage').then((module) => ({ default: module.ComparisonPage }));

export const loadNotFoundPage = async () =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }));
