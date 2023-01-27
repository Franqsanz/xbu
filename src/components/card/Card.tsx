import React from 'react';
// import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
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

export function Card({
  id,
  title,
  image,
  synopsis,
  author,
  category,
}: CardProps) {
  const borderCard = useColorModeValue('gray.200', '#28c900');

  return (
    <>
      <Box
        w='400px'
        m='2'
        rounded='30'
        border='1px'
        borderColor={borderCard}
        overflow='hidden'
        boxShadow='lg'
        my='5'
        bg='transparent'
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
          <Box m='auto' mb='5'>
            <Image h='80' src={image} alt='' boxShadow='lg' />
          </Box>
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
