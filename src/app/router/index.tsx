import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageSkeleton } from '../../components/common/PageSkeleton';
import { App } from '../App';
import { loadCategoryPage, loadComparisonPage, loadHomePage, loadNotFoundPage, loadToolPage, loadToolsPage } from './pageLoaders';

const HomePage = lazy(loadHomePage);
const ToolsPage = lazy(loadToolsPage);
const CategoryPage = lazy(loadCategoryPage);
const ToolPage = lazy(loadToolPage);
const ComparisonPage = lazy(loadComparisonPage);
const NotFoundPage = lazy(loadNotFoundPage);

const PageFallback = () => <PageSkeleton />;

export const AppRouter = () => (
	<Suspense fallback={<PageFallback />}>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<HomePage />} />
				<Route path="tools" element={<ToolsPage />} />
				<Route path="tools/:toolSlug" element={<ToolPage />} />
				<Route path="compare/:comparisonSlug" element={<ComparisonPage />} />
				<Route path=":categoryId" element={<CategoryPage />} />
				<Route path="home" element={<Navigate to="/" replace />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</Suspense>
);
