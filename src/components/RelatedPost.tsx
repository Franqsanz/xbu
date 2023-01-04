import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/card/RelatedCard';
import { CardProps } from '../components/types';
import { useRelatedPost } from '../hooks/querys';

export default function RelatedPost() {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data, refetch } = useRelatedPost();

  return (
    <>
      <Flex flexWrap={{ base: 'wrap', xl: 'nowrap' }} color={colorCard}>
        {data.map(({ id, title, synopsis, author, category }: CardProps) => (
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
        ))}
      </Flex>
    </>
  );
}
