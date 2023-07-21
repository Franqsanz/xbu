import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export function Nav() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return <>{isMobile ? <MobileNav /> : <DesktopNav />}</>;
}
