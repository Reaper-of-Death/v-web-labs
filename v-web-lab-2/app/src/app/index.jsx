import { BrowserRouter, Routes, Route } from 'react-router';
import { withProvider } from '../shared/utils';
import { Home } from '../pages/home';
import { Cart } from '../pages/cart';
import { Wishlist } from '../pages/wishlist';
import { Layout } from '../layouts/app';

const ROUTES = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '/wishlist',
		element: <Wishlist />,
	},
];

export const App = withProvider(BrowserRouter)(() => {
	return (
		<Layout>
			<Routes>
				{ROUTES.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
		</Layout>
	);
});