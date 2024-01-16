import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Skeleton, Stack } from '@chakra-ui/react';

import { Nav } from '@components/nav/Nav';
import { Footer } from '@components/Footer';
import { ScrollToTop } from '@utils/ScrollToTop';

export function Layout() {
  return (
    <>
      <ScrollToTop>
        <Nav />
        <Suspense
          fallback={
            <Stack spacing='4'>
              <Skeleton py={{ base: 16, md: 20 }} />
              <Skeleton h='100vh' />
            </Stack>
          }
        >
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </>
  );
}
