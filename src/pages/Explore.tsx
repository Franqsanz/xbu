import React from 'react';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { AllBooks } from '../components/AllBooks';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import CategoriesComp from '../components/CategoriesComp';

export default function Explore() {
  const bgArrows = useColorModeValue('white', 'black');
  const borderArrows = useColorModeValue('gray.200', '#28c900');
  const gradientColor = useColorModeValue('white', '#1A202C');

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
      <Flex justify='center' align='center' mx='4'>
        <Button
          display={{ base: 'none', md: 'inline' }}
          bg={bgArrows}
          rounded='full'
          boxShadow='md'
          border='1px'
          borderColor={borderArrows}
          p='1'
          mt='3'
          cursor='pointer'
          onClick={slideLeft}
        >
          <MdChevronLeft size='30' />
        </Button>
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
          mx={{ base: 0, md: 1 }}
          position='relative'
        >
          <Box
            position='sticky'
            p='2'
            left='-1px'
            bgGradient={`linear(270deg, #ffffff00 0%, ${gradientColor} 60%)`}
          ></Box>
          <CategoriesComp />
          <Box
            position='sticky'
            p='2'
            right='-2px'
            bgGradient={`linear(88deg, #ffffff00 0%, ${gradientColor} 60%)`}
          ></Box>
        </Box>
        <Button
          display={{ base: 'none', md: 'inline' }}
          bg={bgArrows}
          rounded='full'
          boxShadow='md'
          border='1px'
          borderColor={borderArrows}
          p='1'
          mt='3'
          cursor='pointer'
          onClick={slideRight}
        >
          <MdChevronRight size='30' />
        </Button>
      </Flex>
      <AllBooks />
    </>
  );
}
