import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';

import { AllBooks } from '../components/AllBooks';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import { TagComponent } from '../components/TagComponent';

export function Explorer() {
  return (
    <>
      <MainHead title='Explorar' description='¡Explora cientos de libros!' />
      <ContainerTitle title='Explorar' />
      <Flex justify='center'>
        <Box
          display='flex'
          w='8xl'
          overflowX='auto'
          flexDirection='row'
          flexWrap={{ base: 'nowrap', md: 'wrap' }}
          mt='4'
          mx={{ base: 1, md: 16 }}
          scrollSnapType='x mandatory'
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
