import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

import { MobileNav } from '@components/nav/MobileNav';
import { DesktopNav } from '@components/nav/DesktopNav';

export function Nav() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return <>{isMobile ? <MobileNav /> : <DesktopNav />}</>;
}
