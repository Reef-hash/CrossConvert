import { categoryCatalog } from '../catalog/categoryCatalog';
import { comparisonCatalog } from '../catalog/comparisonCatalog';
import { toolCatalog } from '../catalog/toolCatalog';

export const getPublicRoutePaths = (): string[] => {
  const categoryRoutes = categoryCatalog.map((category) => `/${category.id}`);
  const toolRoutes = toolCatalog.map((tool) => `/tools/${tool.slug}`);
  const comparisonRoutes = comparisonCatalog.map((comparison) => `/compare/${comparison.slug}`);
  return ['/', '/tools', ...categoryRoutes, ...toolRoutes, ...comparisonRoutes];
};
