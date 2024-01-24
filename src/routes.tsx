import React, { lazy, useState } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';

import { Home } from '@pages/Home';
import { Register } from '@pages/Register';
import { Login } from '@pages/Login';
import { CatchError } from '@utils/CatchError';
import { ErrorPage } from '@pages/404';
import { Layout } from '@pages/layout/Layout';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonDetailsBook } from '@components/skeletons/SkeletonDBook';
import { PrivateRoute } from '@components/PrivateRoute';

import { useAuth } from '@contexts/AuthContext';

const PrivacyPolicies = lazy(() => import('@pages/PrivacyPolicies'));
const Explore = lazy(() => import('@pages/Explore'));
const Book = lazy(() => import('@pages/Book'));
const Search = lazy(() => import('@pages/Search'));
const NewBook = lazy(() => import('@pages/NewBook'));
const Profile = lazy(() => import('@pages/profile/Profile'));

export function Private({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SkeletonAllBooks />;
  }

  if (currentUser && location.pathname === '/login') {
    return <Navigate to='/explore' />;
  }

  return <>{children}</>;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          // <Private>
          <Home />
          // </Private>
        ),
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/new-post',
        element: (
          <PrivateRoute>
            <NewBook />
          </PrivateRoute>
        ),
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
        element: (
          // <Private>
          <Login />
          // </Private>
        ),
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
                  <CatchError skeletonLoad={<SkeletonAllBooks />}>
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
                  <CatchError skeletonLoad={<SkeletonDetailsBook />}>
                    <Book />
                  </CatchError>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        children: [
          {
            path: ':userId',
            element: <Profile />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default routes;
