import React from 'react';
// import { useParams } from 'react-router-dom';
import { Flex, useColorModeValue } from '@chakra-ui/react';

// import { Card } from '../components/card/Card';
import { RelatedCard } from '../components/card/RelatedCard';
import { CardProps } from '../components/types';
import { useCategory } from '../hooks/querys';

export function RelatedPost({ param }: any) {
  // const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  const { data } = useCategory(param);

  return (
    <>
      <Flex
        w={{ base: '', md: '2100px' }}
        flexWrap={{ base: 'wrap', md: 'initial' }}
        color={colorCard}
      >
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
