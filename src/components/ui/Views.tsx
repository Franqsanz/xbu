import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { ImEye } from 'react-icons/im';

export function Views({ views, ...props }: any) {
  return (
    <>
      <Flex {...props}>
        <Icon as={ImEye} boxSize='5' mr='2' />
        {views}
      </Flex>
    </>
  );
}
