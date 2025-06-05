import React, { useEffect, useMemo } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import {
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { CardType } from '@components/types';
import { useBooksPaginate } from '@hooks/queries';
import { useScrollYRestoration } from '@hooks/useScrollYRestoration';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/aside/Aside';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { ResultLength } from '@components/aside/ResultLength';
import { MostViewed } from '@components/aside/MostViewed';
import { MyContainer } from '@components/ui/MyContainer';
import { MobileResultBar } from '@components/ui/MobileResultBar';

export function AllBooks() {
  const { ref, inView } = useInView();
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useBooksPaginate();
  let fetchingNextPageUI;

  useScrollYRestoration(isLoading); // Restablece la posición del scroll al volver de la vista del libro

  const books = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <SkeletonAllBooks showTags={false} />;
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
        minH='70vh'
      >
        <AlertIcon boxSize='50px' />
        <AlertTitle mt='5' fontSize='xl'>
          No se pudieron obtener los datos
        </AlertTitle>
      </Alert>
    );
  }

  if (isFetchingNextPage) {
    fetchingNextPageUI = (
      <Box p='10' textAlign='center'>
        <Spinner size={{ base: 'lg', md: 'xl' }} thickness='4px' speed='0.40s' />
      </Box>
    );
  }

  return (
    <>
      <ScrollRestoration />
      <MobileResultBar data={data} />
      <MyContainer>
        <Aside>
          <ResultLength data={data?.pages[0].info.totalBooks} />
          <Box mt='5'>
            <Flex textAlign={{ base: 'center', lg: 'left' }} direction='column'>
              <Text>
                Explora todos los libros publicados y encuentra tu próxima lectura
                favorita.
              </Text>
              <Text mt='5'>
                "Un libro es un sueño que sostienes en tus manos" -{' '}
                <Box as='span' fontWeight='500'>
                  Neil Gaiman
                </Box>
                .
              </Text>
              <MostViewed />
            </Flex>
          </Box>
        </Aside>
        <MySimpleGrid>
          {books.map(
            ({
              id,
              title,
              language,
              synopsis,
              authors,
              category,
              sourceLink,
              image,
              pathUrl,
            }: CardType) => (
              <React.Fragment key={id}>
                <Card
                  id={id}
                  category={category}
                  language={language}
                  title={title}
                  authors={authors}
                  synopsis={synopsis}
                  sourceLink={sourceLink}
                  pathUrl={pathUrl}
                  image={image}
                />
              </React.Fragment>
            ),
          )}
        </MySimpleGrid>
      </MyContainer>
      <Box ref={ref}>{fetchingNextPageUI}</Box>
    </>
  );
}
