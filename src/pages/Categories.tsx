import React from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  Spinner,
  Container,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { CardProps } from '../components/types';
import { Card } from '../components/card/Card';
import { getAllBooks } from '../services/api';

export function Categories() {
  const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data, isLoading, error } = useQuery(['Books'], getAllBooks);

  if (isLoading) {
    <Spinner size='xl' thickness='4px' speed='0.55s' />;
  }

  return (
    <>
      <Container maxW='full' p='0'>
        <Box py='40' bg={useColorModeValue('#ecfccb', 'green.900')}>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '4xl', md: '7xl' }}
            color={useColorModeValue('#4d7c0f', 'green.300')}
            fontWeight='normal'
          >
            {param?.toUpperCase().split('-').join(' ')}
          </Box>
        </Box>
      </Container>
      <Flex
        w='full'
        justify='center'
        py='10'
        m='auto'
        flexWrap='wrap'
        color={colorCard}
      >
        {data
          .filter(({ category }: CardProps) => {
            const cat = category
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .split(' ')
              .join('-');

            const regex = new RegExp(cat, 'gi');
            const compare = regex.test(param as string);
            return compare;
          })
          .map(
            ({
              id,
              title,
              description,
              author,
              category,
              publicationDate,
              numberPages,
            }: CardProps) => (
              <React.Fragment key={id}>
                <Card
                  category={category}
                  title={title}
                  author={author}
                  description={description}
                  numberPages={numberPages}
                  publicationDate={publicationDate}
                />
              </React.Fragment>
            ),
          )}
      </Flex>
      <Outlet />
    </>
  );
}
