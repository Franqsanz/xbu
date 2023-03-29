import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Box, SimpleGrid, Spinner, useColorModeValue } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useFilter } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
const ResultLength = lazy(() => import('../components/ResultLength'));

export default function Search() {
  const { query, param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useFilter(query, param);

  return (
    <>
      <MainHead title={`Libros de ${param} | XBuniverse`} />
      <ContainerTitle title={`Libros de ${param}`} showSearch={true} />
      <Suspense
        fallback={
          <Box p='10' textAlign='center'>
            <Spinner />
          </Box>
        }
      >
        <ResultLength data={data} />
      </Suspense>
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
        {data.map(
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
      </SimpleGrid>
    </>
  );
}
