import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { CatchError } from './utils/CatchError';
import { ErrorPage } from './pages/404';
import { Layout } from './pages/layout/Layout';

const PrivacyPolicies = lazy(() => import('./pages/PrivacyPolicies'));
const Explore = lazy(() => import('./pages/Explore'));
const Book = lazy(() => import('./pages/Book'));
const Search = lazy(() => import('./pages/Search'));
const NewBook = lazy(() => import('./pages/NewBook'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/new-post',
        element: <NewBook />,
      },
      {
        path: '/privacy-policies',
        element: <PrivacyPolicies />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/books',
        children: [
          {
            path: 'search',
            children: [
              {
                path: ':query/:param',
                element: (
                  <CatchError>
                    <Search />
                  </CatchError>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '/book',
        children: [
          {
            path: 'view',
            children: [
              {
                path: ':pathUrl',
                element: (
                  <CatchError>
                    <Book />
                  </CatchError>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default routes;
