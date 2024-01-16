import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType, RelatedBooksType } from '@components/types';
import { useRelatedBooks } from '@hooks/querys';
import { useRefetchLocation } from '@hooks/useRefetchLocation';

export default function RelatedBooks({ currentBookId, id }: RelatedBooksType) {
  const { data, refetch } = useRelatedBooks(id);
  const relatedBooks = useRefetchLocation({ currentBookId, data, refetch });
  let uiCard;

  if (relatedBooks.length > 0) {
    uiCard = relatedBooks.map(({ id, title, authors, pathUrl }: CardType) => (
      <React.Fragment key={id}>
        <RelatedCard
          title={title}
          authors={authors}
          pathUrl={pathUrl}
          refetchQueries={refetch}
        />
      </React.Fragment>
    ));
  } else {
    uiCard = (
      <Text ml='4' fontStyle='italic' textAlign='center'>
        <Box as='span' fontStyle='normal'>
          🔍 📚
        </Box>{' '}
        No se encontraron libros relacionados.
      </Text>
    );
  }

  return (
    <>
      <ContainerRCard>{uiCard}</ContainerRCard>
    </>
  );
}
