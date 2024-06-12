import React, { lazy } from 'react';
import { ScrollRestoration, createBrowserRouter } from 'react-router-dom';

import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { CreateUser } from '@pages/CreateUser';
import { CatchError } from '@utils/CatchError';
import { ErrorPage } from '@pages/404';
import { Layout } from '@pages/layout/Layout';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonDetailsBook } from '@components/skeletons/SkeletonDBook';
import { PrivateRoute } from '@components/PrivateRoute';

import { MyAccount } from '@pages/profile/account/MyAccount';
import { Profile } from '@pages/profile/Profile';

const PrivacyPolicies = lazy(() => import('@pages/PrivacyPolicies'));
const Explore = lazy(() => import('@pages/Explore'));
const MostViewed = lazy(() => import('@pages/MostViewed'));
const Book = lazy(() => import('@pages/Book'));
const Search = lazy(() => import('@pages/Search'));
const NewBook = lazy(() => import('@pages/NewBook'));
// const Profile = lazy(() => import('@pages/profile/Profile'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    errorElement: <div>Error 500 o Error Boundary</div>,
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
        path: '/most-viewed',
        element: <MostViewed />,
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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/create-username',
        element: <CreateUser />,
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
        path: '/:username/:userId?',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-account',
        element: (
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
