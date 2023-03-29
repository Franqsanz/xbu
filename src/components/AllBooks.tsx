import React, { useEffect } from 'react';
import {
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { CardProps } from './types';
import { useBooksPaginate } from '../hooks/querys';
import { Card } from './card/Card';

export function AllBooks() {
  const { ref, inView } = useInView();
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useBooksPaginate();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isLoading) {
    return (
      <Flex justify='center' py={{ base: '25vh', md: '40vh' }}>
        <Spinner size='xl' thickness='4px' speed='0.40s' />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='500px'
      >
        <AlertIcon boxSize='50px' />
        <AlertTitle mt='5' fontSize='xl'>
          No se pudieron obtener los datos
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <SimpleGrid
        maxW='full'
        w='8xl'
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        justifyItems='center'
        m='auto'
        mt={{ base: '10', sm: '20' }}
        px={{ base: 5, md: 10 }}
        color={colorCard}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map(
              ({
                id,
                title,
                synopsis,
                author,
                category,
                sourceLink,
                image,
              }: CardProps) => (
                <React.Fragment key={id}>
                  <Card
                    id={id}
                    category={category}
                    title={title}
                    author={author}
                    synopsis={synopsis}
                    sourceLink={sourceLink}
                    image={image}
                  />
                </React.Fragment>
              ),
            )}
          </React.Fragment>
        ))}
      </SimpleGrid>
      <Box ref={ref}>
        {isFetchingNextPage ? (
          <Box p='10' textAlign='center'>
            <Spinner size='xl' thickness='4px' speed='0.40s' />
          </Box>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}
