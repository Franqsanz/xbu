import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { AllBooks } from '../components/AllBooks';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import { TagComponent } from '../components/TagComponent';

export function Explore() {
  const bgArrows = useColorModeValue('white', 'black');
  const borderArrows = useColorModeValue('gray.200', '#28c900');

  function slideLeft() {
    let slider = document.getElementById('slider') as HTMLElement;
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  function slideRight() {
    let slider = document.getElementById('slider') as HTMLElement;
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  return (
    <>
      <MainHead title='Explorar' description='¡Explora cientos de libros!' />
      <ContainerTitle title='Explorar' />
      <Flex justify='center' align='center' mx='5'>
        <Box
          display={{ base: 'none', md: 'inline' }}
          bg={bgArrows}
          rounded='full'
          boxShadow='md'
          border='1px'
          borderColor={borderArrows}
          p='1'
          mt='3'
          cursor='pointer'
        >
          <MdChevronLeft onClick={slideLeft} size='30' />
        </Box>
        <Box
          id='slider'
          display='flex'
          w='5xl'
          overflowX={{ base: 'auto', md: 'hidden' }}
          scrollSnapType='x mandatory'
          scrollBehavior='smooth'
          flexDirection='row'
          flexWrap='nowrap'
          mt='4'
          mx={{ base: 1, md: 3 }}
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
        <Box
          display={{ base: 'none', md: 'inline' }}
          bg={bgArrows}
          rounded='full'
          boxShadow='md'
          border='1px'
          borderColor={borderArrows}
          p='1'
          mt='3'
          cursor='pointer'
        >
          <MdChevronRight onClick={slideRight} size='30' />
        </Box>
      </Flex>
      <AllBooks />
    </>
  );
}
