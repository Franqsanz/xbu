import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Link,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { CardProps } from '../types';
import { TagComponent } from '../TagComponent';
import { handleImageLoad } from '../../utils/utils';

export function Card({
  id,
  title,
  image,
  synopsis,
  author,
  category,
}: CardProps) {
  // const borderCard = useColorModeValue('gray.200', '#28c900');
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
      <Box
        w='400px'
        m='2'
        rounded='30'
        // border='1px'
        // borderColor={borderCard}
        overflow='hidden'
        // boxShadow='lg'
        my='5'
        position='relative'
      >
        <Flex direction='column'>
          <Box p='7'>
            <Link
              as={NavLink}
              to={`/categories/${category}`}
              _hover={{ outline: 'none' }}
            >
              <TagComponent name={category} />
            </Link>
          </Box>
          {imgUI}
          <Box
            as='h1'
            fontSize='2xl'
            lineHeight='8'
            fontWeight='800'
            px='7'
            mb='2'
            color='#1f9c00'
            textTransform='uppercase'
          >
            {title}
          </Box>
          <Box px='7' textTransform='uppercase'>
            {author}
          </Box>
          <Box p='7' h='310px' mb='14'>
            <Text noOfLines={10} lineHeight='1.6'>
              {synopsis}
            </Text>
          </Box>
          <Link
            as={NavLink}
            to={`/book/${id}`}
            w='full'
            bg='#28c900'
            py='4'
            px='7'
            position='absolute'
            bottom='0'
            _hover={{ outline: 'none', bg: '#24b300' }}
          >
            <Flex align='center' color='black'>
              Más sobre el libro
              <Icon as={FiArrowRight} ml='2' />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
