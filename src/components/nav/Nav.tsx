import React from 'react';
import { Box } from '@chakra-ui/react';
import { MobileNav } from '@components/nav/MobileNav';
import { DesktopNav } from '@components/nav/DesktopNav';

export function Nav() {
  return (
    <>
      <Box display={{ base: 'block', lg: 'none' }}>
        <MobileNav />
      </Box>
      <Box display={{ base: 'none', lg: 'block' }}>
        <DesktopNav />
      </Box>
    </>
  );
}
