import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { CgOptions } from 'react-icons/cg';

export function AsideFilter() {
  return (
    <>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        direction='column'
        mt='10'
        pb='10'
        position='sticky'
        top='16'
      >
        <Flex align='center' py='2' mb='2' fontSize='xl' fontWeight='bold'>
          <Icon as={CgOptions} boxSize='20px' mr='2' />
          Filtrar por:
        </Flex>
        <Flex
          display={{ base: 'none', md: 'flex' }}
          direction='column'
          h='450px'
          overflowY='auto'
          pr='2'
          sx={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#a2aab3',
              borderRadius: '30px',
            },
          }}
        ></Flex>
      </Flex>
    </>
  );
}
