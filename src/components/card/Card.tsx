import React from 'react';
// import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Link,
  Tag,
  TagLeftIcon,
  TagLabel,
  Icon,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

import { CardProps } from '../types';

export function Card({ id, title, description, author, category }: CardProps) {
  const borderCard = useColorModeValue('gray.200', '#81ec66');

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
          {/* <Box>
            <Image src={imgUrl} alt='' />
          </Box> */}
          <Box p='7'>
            <Link
              as={NavLink}
              to={`/categories/${category}`}
              _hover={{ outline: 'none' }}
            >
              <Tag bg='#abf299' color='#0d4300' size='lg' variant='subtle'>
                <TagLeftIcon boxSize='16px' as={BsTag} />
                <TagLabel>{category}</TagLabel>
              </Tag>
            </Link>
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
              {description}
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
              Más información
              <Icon as={FiArrowRight} ml='2' />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
