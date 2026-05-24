import { categoryCatalog } from '../catalog/categoryCatalog';
import { toolCatalog } from '../catalog/toolCatalog';

export const getPublicRoutePaths = (): string[] => {
  const categoryRoutes = categoryCatalog.map((category) => `/${category.id}`);
  const toolRoutes = toolCatalog.map((tool) => `/tools/${tool.slug}`);
  return ['/', '/tools', ...categoryRoutes, ...toolRoutes];
};
