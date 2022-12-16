import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { RelatedCard } from '../components/card/RelatedCard';
import { CardProps } from '../components/types';
import { useCategory, useRelatedPost } from '../hooks/querys';

export function RelatedPost({ param }: any) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');
  // const { data } = useCategory(param);
  // const relatedRandom: any = [];
  const { data } = useRelatedPost();

  // let test = data[Math.floor(Math.random() * data.length)];
  // console.log(test);

  return (
    <>
      <Flex
        // w={{ base: '', md: '2400px' }}
        // flexWrap={{ base: 'wrap', md: 'initial' }}
        flexWrap='wrap'
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
