import React, { useEffect } from 'react';
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
import { useScrollRestoration } from '@hooks/useScrollRestoration';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/aside/Aside';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { ResultLength } from '@components/aside/ResultLength';
import { MostViewed } from '@components/aside/MostViewed';

export function AllBooks() {
  const { ref, inView } = useInView();
  const { data, isPending, error, fetchNextPage, isFetchingNextPage } =
    useBooksPaginate();
  let fetchingNextPageUI;

  useScrollRestoration(isPending); // Restablece la posición del scroll al volver de la vista del libro

  useEffect(() => {
    let isMounted = true;

    if (inView && isMounted) {
      fetchNextPage();
    }

    return () => {
      isMounted = false;
    };
  }, [inView, fetchNextPage]);

  if (isPending) {
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
        <Spinner
          size={{ base: 'lg', md: 'xl' }}
          thickness='4px'
          speed='0.40s'
        />
      </Box>
    );
  }

  return (
    <>
      <ScrollRestoration />
      <Flex
        as='article'
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '1260px', '2xl': '1560px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data.pages[0].info.totalBooks} />
          <Box mt='5'>
            <Flex textAlign={{ base: 'center', lg: 'left' }} direction='column'>
              <Text>
                Explora todos los libros publicados y encuentra tu próxima
                lectura favorita.
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
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map(
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
            </React.Fragment>
          ))}
        </MySimpleGrid>
      </Flex>
      <Box ref={ref}>{fetchingNextPageUI}</Box>
    </>
  );
}
