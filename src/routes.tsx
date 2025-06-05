import React, { lazy } from 'react';
import { ScrollRestoration, createBrowserRouter } from 'react-router-dom';

import { Login } from '@pages/Login';
import { CreateUser } from '@pages/CreateUser';
import { CatchError } from '@utils/CatchError';
import { ErrorPage } from '@pages/404';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonDetailsBook } from '@components/skeletons/SkeletonDBook';
import { PrivateRoute } from '@components/nav/PrivateRoute';

import { Explore } from '@pages/Explore';
import { MyAccount } from '@pages/profile/account/MyAccount';
import { Profile } from '@pages/profile/Profile';
import { RouteWatcher } from '@hooks/RouteWatcher';
import { AllCollections } from '@pages/profile/collections/AllCollections';
import { CollectionDetail } from '@pages/profile/collections/CollectionDetail';

const Layout = lazy(() => import('@pages/layout/Layout'));
const Home = lazy(() => import('@pages/Home'));
const PrivacyPolicies = lazy(() => import('@pages/PrivacyPolicies'));
const MostViewed = lazy(() => import('@pages/MostViewed'));
const Book = lazy(() => import('@pages/Book'));
const FilteredData = lazy(() => import('@pages/FilteredData'));
const NewBook = lazy(() => import('@pages/NewBook'));
const Favorites = lazy(() => import('@pages/profile/Favorites'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <RouteWatcher />
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
            path: 'filter',
            children: [
              {
                path: ':query/:param',
                element: (
                  <CatchError skeletonLoad={<SkeletonAllBooks showTags={true} />}>
                    <FilteredData />
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
        path: '/profile/:username/:userId?',
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
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-collections',
        element: (
          <PrivateRoute>
            <AllCollections />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-collections/collection/:collectionId',
        element: (
          <PrivateRoute>
            <CollectionDetail />
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
