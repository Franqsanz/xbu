import React, { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from 'react-error-boundary';
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
  Button,
} from '@chakra-ui/react';
import { useQuery, QueryErrorResetBoundary } from '@tanstack/react-query';

import { Card } from '../components/card/Card';
import { AllBooks } from '../components/AllBooks';
import { Category } from './Category';
import { CardProps } from '../components/types';
import { getAllBooks } from '../services/api';

export function Categories() {
  const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const bgContainer = useColorModeValue('#ecfccb', 'green.900');
  const colorTitle = useColorModeValue('#4d7c0f', 'green.300');

  const { data, isLoading } = useQuery(['Books'], getAllBooks, {
    suspense: true,
  });

  if (isLoading) {
    <Spinner size='xl' thickness='4px' speed='0.55s' />;
  }

  return (
    <>
      <Helmet>
        <title>
          {
            ((param?.charAt(0).toUpperCase() as string) +
              param?.slice(1).split('-').join(' ')) as string
          }{' '}
          | Categorias
        </title>
      </Helmet>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Container maxW='full' p='0'>
              <Box py={{ base: 40, md: 20 }} bg={bgContainer}>
                <Box
                  textAlign='center'
                  as='h1'
                  fontSize={{ base: '4xl', md: '7xl' }}
                  color={colorTitle}
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
                    sourceLink,
                    numberPages,
                  }: CardProps) => (
                    <React.Fragment key={id}>
                      <Card
                        category={category}
                        title={title}
                        author={author}
                        description={description}
                        numberPages={numberPages}
                        sourceLink={sourceLink}
                        publicationDate={publicationDate}
                      />
                    </React.Fragment>
                  ),
                )}
            </Flex>
            <Outlet />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}
