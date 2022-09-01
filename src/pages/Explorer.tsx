import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { Helmet } from 'react-helmet';

import { AllBooks } from '../components/AllBooks';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';

export function Explorer() {
  return (
    <>
      <Helmet>
        <title>Explorar</title>
      </Helmet>
      <ContainerTitle title='Explorar' />
      <Flex justify='center'>
        <Box
          display='flex'
          w='8xl'
          h='60px'
          overflow='auto'
          flexDirection='row'
          mt='10'
          mx={{ base: 5, md: 16 }}
          scrollSnapType='x mandatory'
          sx={{
            '&::-webkit-scrollbar': {
              height: '0px',
            },
            '&:hover::-webkit-scrollbar': {
              height: '7px',
              opacity: 0.3,
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('gray.300', 'gray.600'),
              borderRadius: '30px',
            },
          }}
        >
          {categoryLinks.map(({ name }) => (
            <Link
              key={name}
              as={NavLink}
              // to={`/categories/${name
              //   .toLowerCase()
              //   .normalize('NFD')
              //   .replace(/[\u0300-\u036f]/g, '')
              //   .split(' ')
              //   .join('-')}`}
              to={`/categories/${name}`}
              _hover={{ outline: 'none' }}
            >
              <Tag colorScheme='green' size='lg' variant='subtle' m='1'>
                <TagLeftIcon boxSize='16px' as={BsTag} />
                <TagLabel>{name}</TagLabel>
              </Tag>
            </Link>
          ))}
        </Box>
      </Flex>
      <AllBooks />
    </>
  );
}
