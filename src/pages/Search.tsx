import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useFilter } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MySimpleGrid } from '../components/MySimpleGrid';
import { MainHead } from '../components/Head';
const ResultLength = lazy(() => import('../components/ResultLength'));

export default function Search() {
  const { query, param } = useParams();

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
      <MySimpleGrid>
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
      </MySimpleGrid>
    </>
  );
}
