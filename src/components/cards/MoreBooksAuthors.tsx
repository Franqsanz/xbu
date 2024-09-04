import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType } from '@components/types';
import { useMoreBooksAuthors } from '@hooks/queries';

export default function MoreBooksAuthors({ id }) {
  const { data, refetch } = useMoreBooksAuthors(id);
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
        No se encontraron más libros de este autor.
      </Text>
    );
  }

  return (
    <>
      <ContainerRCard>{uiCard}</ContainerRCard>
    </>
  );
}
