import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/card/RelatedCard';
import { CardProps } from '../components/types';
import { useRelatedPost } from '../hooks/querys';

export function RelatedPost() {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data } = useRelatedPost();

  return (
    <>
      <Flex flexWrap='wrap' color={colorCard}>
        {data.map(({ id, title, synopsis, author, category }: CardProps) => (
          <React.Fragment key={id}>
            <RelatedCard
              id={id}
              category={category}
              title={title}
              author={author}
              synopsis={synopsis}
            />
          </React.Fragment>
        ))}
      </Flex>
    </>
  );
}
