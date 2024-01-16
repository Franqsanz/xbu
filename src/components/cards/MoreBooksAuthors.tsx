import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType, RelatedBooksType } from '@components/types';
import { useMoreBooksAuthors } from '@hooks/querys';
import { useRefetchLocation } from '@hooks/useRefetchLocation';

export default function MoreBooksAuthors({
  currentBookId,
  id,
}: RelatedBooksType) {
  const { data, refetch } = useMoreBooksAuthors(id);
  const moreBooksAuthors = useRefetchLocation({ currentBookId, data, refetch });
  let uiCard;

  if (moreBooksAuthors.length > 0) {
    uiCard = moreBooksAuthors.map(
      ({ id, title, authors, pathUrl }: CardType) => (
        <React.Fragment key={id}>
          <RelatedCard
            title={title}
            authors={authors}
            pathUrl={pathUrl}
            refetchQueries={refetch}
          />
        </React.Fragment>
      ),
    );
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
