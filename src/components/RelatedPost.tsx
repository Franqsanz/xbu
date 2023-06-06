import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/cards/RelatedCard';
import { CardProps, ReleatedBooksProps } from '../components/types';
import { useRelatedPost } from '../hooks/querys';

export default function RelatedPost({ currentBookId }: ReleatedBooksProps) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, refetch } = useRelatedPost();

  // Filtrar el ID que coincide con el libro que se esta viendo para evitar ver el mismo en los relacionados,
  // si eso pasa se hace un refetch() a la api para mostrar otros libros,
  // si no hay coincidencias no se hace una actualización.

  const relatedBooks = data.filter((book: any) => {
    if (book.id === currentBookId) {
      refetch();
    }

    return book.id !== currentBookId;
  });

  return (
    <>
      <Flex flexWrap={{ base: 'wrap', xl: 'nowrap' }} color={colorCard}>
        {relatedBooks.map(
          ({ id, title, synopsis, author, category }: CardProps) => (
            <React.Fragment key={id}>
              <RelatedCard
                id={id}
                category={category}
                title={title}
                author={author}
                synopsis={synopsis}
                refetchQueries={refetch}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
