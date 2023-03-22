import React, { useEffect } from 'react';
import {
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { CardProps } from './types';
import { useBooksPaginate } from '../hooks/querys';
import { Card } from './card/Card';
import { Filter } from './forms/Filter';

export function AllBooks() {
  const { ref, inView } = useInView();
  // const [totalBooks, setTotalBooks] = useState<number[]>([]);
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useBooksPaginate();

  // useEffect(() => {
  //   const newBooks = data?.pages.map((page) => page.info.totalBooks) ?? [];

  //   // crea un conjunto a partir de los libros existentes
  //   const existingBooks = new Set(totalBooks);

  //   // agrega solo los libros que no existen en el conjunto
  //   const uniqueBooks = newBooks?.filter((book) => !existingBooks.has(book));

  //   // agrega los nuevos libros al estado
  //   setTotalBooks([...totalBooks, ...uniqueBooks]);
  // }, [data]);

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
      <Filter />
      {/* <Box w='78%' m='auto' mt='7'>
        <Flex
          fontSize='lg'
          textAlign={{ base: 'center', lg: 'left' }}
          direction='column'
        >
          <Box as='span' fontSize='3xl' fontWeight='bold'>
            Libros
          </Box>
          {totalBooks} Resultados
        </Flex>
      </Box> */}
      <Flex
        w='full'
        justify='center'
        py='5'
        m='auto'
        px='1'
        flexWrap='wrap'
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
      </Flex>
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
