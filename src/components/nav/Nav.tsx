import React from 'react';
import { MobileNav } from '@components/nav/MobileNav';
import { DesktopNav } from '@components/nav/DesktopNav';

export function Nav() {
  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
}
