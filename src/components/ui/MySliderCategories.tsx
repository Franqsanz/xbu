import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { SkeletonTags } from '@components/skeletons/SkeletonTags';
const Categories = lazy(() => import('@components/Categories'));

export function MySliderCategories() {
  const bgArrows = useColorModeValue('white', 'black');
  const borderArrows = useColorModeValue('gray.200', 'green.600');
  const gradientColor = useColorModeValue('white', '#1A202C');
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current as any;
    let isHovered = false;

    function handleScroll(event) {
      if (isHovered) {
        container.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    }

    function handleMouseEnter() {
      isHovered = true;
    }

    function handleMouseLeave() {
      isHovered = false;
    }

    container.addEventListener('wheel', handleScroll);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('wheel', handleScroll);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
          w={{ base: '68rem', '2xl': '84rem' }}
          overflowX={{ base: 'auto', md: 'hidden' }}
          scrollBehavior='smooth'
          flexDirection='row'
          flexWrap='nowrap'
          mt='4'
          mx={{ base: 0, md: 1 }}
          position='relative'
          ref={containerRef}
        >
          <Box
            position='sticky'
            p='2'
            left='-1px'
            bgGradient={`linear(270deg, #ffffff00 0%, ${gradientColor} 60%)`}
          ></Box>
          <Suspense fallback={<SkeletonTags />}>
            <Categories />
          </Suspense>
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
    </>
  );
}
