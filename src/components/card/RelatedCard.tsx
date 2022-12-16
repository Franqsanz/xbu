import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { CardProps } from '../types';
import { TagComponent } from '../TagComponent';

export function RelatedCard({
  id,
  title,
  synopsis,
  author,
  category,
}: CardProps) {
  const borderCard = useColorModeValue('gray.200', '#81ec66');

  return (
    <>
      <Box
        w='full'
        h={{ base: 'auto', md: '190px' }}
        m='2'
        rounded='30'
        border='1px'
        borderColor={borderCard}
        boxShadow='lg'
        overflow='hidden'
        my='5'
        bg='transparent'
        position='relative'
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          {/* <Box>
            <Image src={imgUrl} alt='' />
          </Box> */}
          {/* <Box pt='3' px='4'>
            <Link
              as={NavLink}
              to={`/categories/${category}`}
              _hover={{ outline: 'none' }}
            >
              <TagComponent name={category} />
            </Link>
          </Box> */}
          <Flex direction='column'>
            <Box p='4'>
              <Box
                as='h1'
                fontSize='xl'
                lineHeight='8'
                fontWeight='800'
                mb='2'
                color='#1f9c00'
                textTransform='uppercase'
              >
                {title}
              </Box>
              <Box textTransform='uppercase'>{author}</Box>
              {/* <Box>
              <Text noOfLines={10} lineHeight='1.6'>
                {synopsis}
              </Text>
            </Box> */}
            </Box>
          </Flex>
          <Link
            as={NavLink}
            to={`/book/${id}`}
            w='full'
            bg='#28c900'
            py='4'
            px='7'
            position={{ base: 'initial', md: 'absolute' }}
            bottom='0'
            _hover={{ outline: 'none', bg: '#24b300' }}
          >
            <Flex align='center' color='black'>
              Ver libro
              <Icon as={FiArrowRight} ml='2' />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
