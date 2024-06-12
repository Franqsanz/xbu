import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SkeletonMain } from '@components/skeletons/SkeletonMain';
import { Nav } from '@components/nav/Nav';
import { Footer } from '@components/Footer';

export function Layout() {
  return (
    <>
      <Nav />
      <Suspense fallback={<SkeletonMain />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
