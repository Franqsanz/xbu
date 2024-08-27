import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { ImEye } from 'react-icons/im';

export function Views({ views, bxSize, ...props }: any) {
  return (
    <>
      <Flex fontSize='sm' {...props}>
        <Icon as={ImEye} boxSize={bxSize} mr='2' />
        {views}
      </Flex>
    </>
  );
}
