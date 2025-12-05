import { BrowserRouter, Route } from 'react-router-dom';
import { withProvider } from '../shared/utils';
import { Home } from '../pages/home';
import { Cart } from '../pages/cart';
import { Wishlist } from '../pages/wishlist';
import { Layout } from '../layouts/app';
import type { ReactElement } from 'react';
import { Routes } from 'react-router';

// Тип для маршрута
interface RouteConfig {
  path: string;
  element: ReactElement;
}

const ROUTES: RouteConfig[] = [
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

export const App = withProvider(BrowserRouter)((): ReactElement => {
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