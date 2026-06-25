import React, { lazy } from 'react';
import { Navigate, ScrollRestoration, createBrowserRouter } from 'react-router-dom';

import { CreateUser } from '@pages/CreateUser';
import { CatchError } from '@utils/CatchError';
import { ErrorPage } from '@pages/404';
import { ErrorBoundary } from '@pages/ErrorBoundary';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonDetailsBook } from '@components/skeletons/SkeletonDBook';
import { SkeletonReader } from '@components/skeletons/SkeletonReader';
import { PrivateRoute } from '@components/nav/PrivateRoute';

import { Explore } from '@pages/Explore';
import { MyAccount } from '@pages/profile/account/MyAccount';
import { Profile } from '@pages/profile/Profile';
import { RouteWatcher } from '@hooks/RouteWatcher';
import { AllCollections } from '@pages/profile/collections/AllCollections';
import { CollectionDetail } from '@pages/profile/collections/CollectionDetail';
import { HomeFallback } from '@pages/HomeFallback';
import { MostViewedFallback } from '@pages/MostViewedFallback';
import { FavoritesFallback } from '@pages/profile/FavoritesFallback';
import { MyLibraryFallback } from '@pages/profile/MyLibraryFallback';
import { EditProfileFallback } from '@pages/profile/account/EditProfileFallback';

const Layout = lazy(() => import('@pages/layout/Layout'));
const Home = lazy(() => import('@pages/Home'));
const PrivacyPolicies = lazy(() => import('@pages/PrivacyPolicies'));
const TermsConditions = lazy(() => import('@pages/TermsConditions'));
const MostViewed = lazy(() => import('@pages/MostViewed'));
const Book = lazy(() => import('@pages/Book'));
const FilteredData = lazy(() => import('@pages/FilteredData'));
const NewBook = lazy(() => import('@pages/NewBook'));
const BookReader = lazy(() => import('@pages/BookReader'));
const Favorites = lazy(() => import('@pages/profile/Favorites'));
const MyLibrary = lazy(() => import('@pages/profile/MyLibrary'));
const EditProfile = lazy(() => import('@pages/profile/account/EditProfile'));
const Notifications = lazy(() => import('@pages/Notifications'));

export const routes = createBrowserRouter([
  {
    path: '/book/read/:pathUrl',
    element: (
      <>
        <ScrollRestoration />
        <PrivateRoute>
          <React.Suspense fallback={<SkeletonReader />}>
            <BookReader />
          </React.Suspense>
        </PrivateRoute>
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <RouteWatcher />
        <Layout />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <CatchError skeletonLoad={<HomeFallback />}>
            <Home />
          </CatchError>
        ),
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/most-viewed',
        element: (
          <CatchError skeletonLoad={<MostViewedFallback />}>
            <MostViewed />
          </CatchError>
        ),
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
        path: '/terms',
        element: <TermsConditions />,
      },
      {
        path: '/login',
        element: <Navigate to='/' replace />,
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
        path: '/my-account/edit',
        element: (
          <PrivateRoute>
            <CatchError skeletonLoad={<EditProfileFallback />}>
              <EditProfile />
            </CatchError>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <CatchError skeletonLoad={<FavoritesFallback />}>
              <Favorites />
            </CatchError>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-library',
        element: (
          <PrivateRoute>
            <CatchError skeletonLoad={<MyLibraryFallback />}>
              <MyLibrary />
            </CatchError>
          </PrivateRoute>
        ),
      },
      {
        path: '/notifications',
        element: (
          <PrivateRoute>
            <Notifications />
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
