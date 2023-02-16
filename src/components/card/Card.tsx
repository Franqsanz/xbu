import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import {
  Flex,
  Box,
  useColorModeValue,
  Link,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';

import { CardProps } from '../types';
import { TagComponent } from '../TagComponent';
import { handleImageLoad } from '../../utils/utils';

export function Card({ id, title, image, author, category }: CardProps) {
  const borderCard = useColorModeValue('gray.200', 'gray.600');
  const outlineCard = useColorModeValue('black', 'white');
  let imgUI;

  if (typeof image === 'undefined') {
    imgUI = <Box></Box>;
  } else {
    imgUI = (
      <Box m='auto' mb='7'>
        <LazyLoad width={234} height={360} offset={0} threshold={0.99}>
          <Image
            w='234px'
            h='360px'
            src={image.url}
            alt={`Imagen de "${title}"`}
            rounded='lg'
            border='1px solid #A0AEC0'
            boxShadow='xl'
            decoding='async'
            loading='lazy'
            filter='blur(20px)'
            transition='filter 0.6s ease-in-out'
            onLoad={handleImageLoad}
          />
        </LazyLoad>
      </Box>
    );
  }

  return (
    <>
      <LinkBox
        w='300px'
        m='2'
        rounded='lg'
        border='1px'
        borderColor={borderCard}
        overflow='hidden'
        boxShadow='lg'
        my='5'
        pb='4'
        tabIndex={0}
        _focus={{ outline: `3px solid ${outlineCard}` }}
        _hover={{
          borderColor: 'transparent',
          outline: `2px solid ${outlineCard}`,
        }}
      >
        <LinkOverlay
          as={NavLink}
          to={`/book/${id}`}
          tabIndex={-1}
          _hover={{ outline: 'none' }}
        >
          <Flex direction='column'>
            <Box p='4' ml='4' zIndex='0'>
              <Link
                as={NavLink}
                to={`/categories/${category}`}
                _focus={{ outline: `2px solid ${outlineCard}` }}
                _hover={{ outline: 'none' }}
              >
                <TagComponent name={category} />
              </Link>
            </Box>
            {imgUI}
            <Flex direction='column' alignItems='center'>
              <Box
                as='h1'
                fontSize='lg'
                lineHeight='8'
                fontWeight='800'
                mx='1'
                textAlign='center'
                mb='2'
                color='#1f9c00'
                textTransform='uppercase'
              >
                {title}
              </Box>
              <Box px='7' fontSize='sm' textTransform='uppercase'>
                {author}
              </Box>
            </Flex>
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </>
  );
}
