import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';

import { AllBooks } from '../components/AllBooks';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';
import { Title } from '../components/Title';
import { TagComponent } from '../components/TagComponent';

export function Explorer() {
  return (
    <>
      <Title title='Explorar' />
      <ContainerTitle title='Explorar' />
      <Flex justify='center'>
        <Box
          display='flex'
          w='8xl'
          overflow='auto'
          flexDirection='row'
          flexWrap={{ base: 'nowrap', md: 'wrap' }}
          mt='10'
          mx={{ base: 1, md: 16 }}
          scrollSnapType='x mandatory'
          sx={{
            '&::-webkit-scrollbar': {
              height: '7px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('gray.300', 'gray.600'),
              borderRadius: '30px',
            },
          }}
        >
          {categoryLinks.map(({ name }) => (
            <Link
              key={name}
              as={NavLink}
              to={`/categories/${name}`}
              _hover={{ outline: 'none' }}
            >
              <TagComponent name={name} m='1' />
            </Link>
          ))}
        </Box>
      </Flex>
      <AllBooks />
    </>
  );
}
