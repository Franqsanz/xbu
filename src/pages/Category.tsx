import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useCategory } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import { ResultLength } from '../components/ResultLength';

export function Category() {
  const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useCategory(param);

  return (
    <>
      <MainHead title={`${param} | Categorias`} />
      <ContainerTitle title={param} />
      <Flex
        w='full'
        justify='center'
        py='10'
        m='auto'
        flexWrap='wrap'
        color={colorCard}
      >
        <ResultLength data={data} />
        {data.map(
          ({
            id,
            title,
            synopsis,
            author,
            category,
            sourceLink,
          }: CardProps) => (
            <React.Fragment key={id}>
              <Card
                id={id}
                category={category}
                title={title}
                author={author}
                synopsis={synopsis}
                sourceLink={sourceLink}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
