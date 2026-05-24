import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '../../components/common/Loader';
import { App } from '../App';

const HomePage = lazy(async () => import('../pages/HomePage').then((module) => ({ default: module.HomePage })));
const ToolsPage = lazy(async () => import('../pages/ToolsPage').then((module) => ({ default: module.ToolsPage })));
const CategoryPage = lazy(async () => import('../pages/CategoryPage').then((module) => ({ default: module.CategoryPage })));
const ToolPage = lazy(async () => import('../pages/ToolPage').then((module) => ({ default: module.ToolPage })));
const NotFoundPage = lazy(async () => import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

const PageFallback = () => (
	<div className="flex min-h-[50vh] items-center justify-center">
		<Loader />
	</div>
);

export const AppRouter = () => (
	<Suspense fallback={<PageFallback />}>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<HomePage />} />
				<Route path="tools" element={<ToolsPage />} />
				<Route path="tools/:toolSlug" element={<ToolPage />} />
				<Route path=":categoryId" element={<CategoryPage />} />
				<Route path="home" element={<Navigate to="/" replace />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</Suspense>
);
