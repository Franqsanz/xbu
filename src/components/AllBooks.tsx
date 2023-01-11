import React from 'react';
import {
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

import { CardProps } from './types';
import { useAllBooks } from '../hooks/querys';
import { Card } from './card/Card';
import { ResultLength } from './ResultLength';

export function AllBooks() {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, isLoading, error } = useAllBooks();

  if (isLoading) {
    return (
      <Flex justify='center' py={{ base: '25vh', md: '40vh' }}>
        <Spinner size='xl' thickness='4px' speed='0.55s' />
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
        height='200px'
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
      <Flex direction='column'>
        <ResultLength data={data} />
        <Flex
          w='full'
          justify='center'
          py='5'
          m='auto'
          flexWrap='wrap'
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
            }: CardProps) => (
              <React.Fragment key={id}>
                <Card
                  id={id}
                  category={category}
                  title={title}
                  author={author}
                  synopsis={synopsis}
                  sourceLink={sourceLink}
                />
              </React.Fragment>
            ),
          )}
        </Flex>
      </Flex>
    </>
  );
}
