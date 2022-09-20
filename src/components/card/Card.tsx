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
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

import { CardProps } from '../types';

export function Card({
  id,
  title,
  description,
  author,
  category,
  publicationDate,
  sourceLink,
  numberPages,
}: CardProps) {
  const borderCard = useColorModeValue('gray.200', '#8bd07a');
  const bgCard = useColorModeValue('white', 'black');

  return (
    <>
      <Box
        w='400px'
        h='640px'
        m='2'
        rounded='30'
        border='1px'
        borderColor={borderCard}
        overflow='hidden'
        boxShadow='lg'
        my='5'
        bg={bgCard}
        transition='.1s'
        _active={{ transform: 'scale(.97)' }}
      >
        <Link
          as={NavLink}
          to={`/book/${id}`}
          _hover={{
            outline: 'none',
          }}
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
                <Tag colorScheme='green' size='lg' variant='subtle'>
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
              color='#1e9800'
              textTransform='uppercase'
            >
              {title}
            </Box>
            <Box px='7' textTransform='uppercase'>
              {author}
            </Box>
            <Box mb='2' p='7'>
              <Text noOfLines={10} lineHeight='1.6'>
                {description}
              </Text>
              <Box mt='5'>Fecha de lanzamiento: {publicationDate}</Box>
              <Box>N° de páginas: {numberPages}</Box>
              {/* <Box w='100px' mt='3'>
              <Link
                href={sourceLink}
                isExternal
                color='blue.600'
                fontWeight='bold'
              >
                <Flex align='center'>
                  Ver aquí
                  <FiExternalLink style={{ marginLeft: '6px' }} />
                </Flex>
              </Link>
            </Box> */}
            </Box>
          </Flex>
        </Link>
      </Box>
    </>
  );
}
