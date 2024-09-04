import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType } from '@components/types';
import { useRelatedBooks } from '@hooks/queries';

export default function RelatedBooks({ id }) {
  const { data, refetch } = useRelatedBooks(id);
  let uiCard;

  if (data.length > 0) {
    uiCard = data.map(({ id, title, authors, pathUrl }: CardType) => (
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
