import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/card/RelatedCard';
import { CardProps, ReleatedBooksProps } from '../components/types';
import { useRelatedPost } from '../hooks/querys';

export default function RelatedPost({ currentBookId }: ReleatedBooksProps) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, refetch } = useRelatedPost();

  const relatedBooks = data.filter((book: any) => book.id !== currentBookId);

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
