import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { ResultLength } from '@components/aside/ResultLength';

interface MobileResultBarType {
  data: any;
  children?: React.ReactNode;
}

export function MobileResultBar({ data, children }: MobileResultBarType) {
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');

  return (
    <>
      <Flex
        display={{ base: 'flex', xl: 'none' }}
        mt='4'
        pt='3'
        pb='3'
        px={{ base: '7', md: '20', sm: '10' }}
        justify={{ base: 'space-around', sm: 'space-between' }}
        align='stretch'
        borderY={`1px solid ${grayColor}`}
      >
        <ResultLength data={data?.pages[0]?.info?.totalBooks ?? 0} />
        {children}
      </Flex>
    </>
  );
}
