import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SkeletonMain } from '@components/skeletons/SkeletonMain';
import { Nav } from '@components/nav/Nav';
import { Footer } from '@components/layout/Footer';
import { LoginModal } from '@components/auth/LoginModal';

export default function Layout() {
  return (
    <>
      <Nav />
      <Suspense fallback={<SkeletonMain />}>
        <Outlet />
      </Suspense>
      <Footer />
      <LoginModal />
    </>
  );
}
