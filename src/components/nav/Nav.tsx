import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';

import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export function Nav() {
  const [isMobile] = useMediaQuery('(max-width: 820px)');

  return (
    <>
      {!isMobile && <DesktopNav />}
      {isMobile && <MobileNav />}
    </>
  );
}
