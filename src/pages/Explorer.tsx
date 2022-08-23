import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Container,
  Box,
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

import { AllBooks } from '../components/AllBooks';

export function Explorer() {
  // const { data, isLoading, error } = useQuery(['Books'], async () => {
  //   const res = await fetch('https://xb-api.vercel.app/api');
  //   return res.json();
  // });

  return (
    <>
      <Helmet>
        <title>Explorar</title>
      </Helmet>
      <Container maxW='full' p='0'>
        <Box py='40' bg={useColorModeValue('#ecfccb', 'green.900')}>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '5xl', md: '7xl' }}
            color={useColorModeValue('#4d7c0f', 'green.300')}
            fontWeight='normal'
          >
            Explorar
          </Box>
        </Box>
      </Container>
      <Flex justify='center'>
        <Box mt='10' mx='16'>
          {/* {data.map(({ id, category }) => (
            <Tag colorScheme='green' size='lg' variant='subtle' m='1' key={id}>
              <TagLeftIcon boxSize='16px' as={BsTag} />
              <TagLabel>{category}</TagLabel>
            </Tag>
          ))} */}
        </Box>
      </Flex>
      <AllBooks />
      {/* <Outlet /> */}
    </>
  );
}
