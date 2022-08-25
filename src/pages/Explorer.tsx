import React from 'react';
import { NavLink } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';
import {
  Box,
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { Helmet } from 'react-helmet';
// import { useQuery } from '@tanstack/react-query';

import { AllBooks } from '../components/AllBooks';
// import { Categories } from './Categories';
import { categoryLinks } from '../components/links';
import { ContainerTitle } from '../components/ContainerTitle';

export function Explorer() {
  return (
    <>
      <Helmet>
        <title>Explorar</title>
      </Helmet>
      {/* <ErrorBoundary FallbackComponent={AllBooks}> */}
      <ContainerTitle title='Explorar' />
      <Box
        display='flex'
        h='60px'
        overflow='auto'
        flexDirection='row'
        mt='10'
        mx={{ base: 5, md: 16 }}
      >
        {categoryLinks.map(({ name }) => (
          <Link
            key={name}
            as={NavLink}
            to={`/categories/${name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .split(' ')
              .join('-')}`}
            _hover={{ outline: 'none' }}
          >
            <Tag colorScheme='green' size='lg' variant='subtle' m='1'>
              <TagLeftIcon boxSize='16px' as={BsTag} />
              <TagLabel>{name}</TagLabel>
            </Tag>
          </Link>
        ))}
      </Box>
      <AllBooks />
      {/* </ErrorBoundary> */}
    </>
  );
}
