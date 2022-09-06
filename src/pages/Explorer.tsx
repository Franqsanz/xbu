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

import { AllBooks } from '../components/AllBooks';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';
import { Title } from '../components/Title';

export function Explorer() {
  return (
    <>
      <Title title='Explorar' />
      <ContainerTitle title='Explorar' />
      <Flex justify='center'>
        <Box
          display='flex'
          w='8xl'
          overflow='auto'
          flexDirection='row'
          flexWrap={{ base: 'nowrap', md: 'wrap' }}
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
