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

export function AllBooks() {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, isLoading, error } = useAllBooks();

  if (isLoading) {
    return (
      <Flex justify='center' py='20vh'>
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
            description,
            author,
            category,
            publicationDate,
            sourceLink,
            numberPages,
          }: CardProps) => (
            <React.Fragment key={id}>
              <Card
                id={id}
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
    </>
  );
}
