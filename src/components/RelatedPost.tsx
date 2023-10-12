import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/cards/RelatedCard';
import { CardType, ReleatedBooksType } from '../components/types';
import { useMoreBooks } from '../hooks/querys';

export default function RelatedPost({ currentBookId }: ReleatedBooksType) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, refetch } = useMoreBooks();

  // Filtrar el ID que coincide con el libro que se esta viendo para evitar ver el mismo en los relacionados,
  // si eso pasa se hace un refetch() a la api para mostrar otros libros,
  // si no hay coincidencias no se hace una actualización.

  const relatedBooks = data.filter((book: any) => {
    if (book.pathUrl === currentBookId) {
      refetch();
    }

    return book.pathUrl !== currentBookId;
  });

  return (
    <>
      <Flex flexWrap={{ base: 'wrap', xl: 'nowrap' }} color={colorCard}>
        {relatedBooks.map(
          ({ id, title, synopsis, authors, category, pathUrl }: CardType) => (
            <React.Fragment key={id}>
              <RelatedCard
                id={id}
                category={category}
                title={title}
                authors={authors}
                synopsis={synopsis}
                pathUrl={pathUrl}
                refetchQueries={refetch}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
