import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SkeletonMain } from '@components/skeletons/SkeletonMain';
import { Nav } from '@components/nav/Nav';
import { Footer } from '@components/Footer';
import { ScrollToTop } from '@utils/ScrollToTop';

export function Layout() {
  return (
    <>
      <ScrollToTop>
        <Nav />
        <Suspense fallback={<SkeletonMain />}>
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </>
  );
}
