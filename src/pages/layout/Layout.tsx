import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';

import { SkeletonMain } from '@components/skeletons/SkeletonMain';
import { Nav } from '@components/nav/Nav';
import { Footer } from '@components/layout/Footer';
import { LoginModal } from '@components/auth/LoginModal';
import { useUnreadTitleBadge } from '@hooks/useUnreadTitleBadge';

export default function Layout() {
  useUnreadTitleBadge();
  return (
    <Flex direction='column' minH='100vh'>
      <Nav />
      <Box as='main' flex='1'>
        <Suspense fallback={<SkeletonMain />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
      <LoginModal />
    </Flex>
  );
}
