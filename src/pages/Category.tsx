import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useCategory } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { Title } from '../components/Title';

export function Category() {
  const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useCategory(param);

  return (
    <>
      <Title title={`${param} | Categorias`} />
      <ContainerTitle title={param} />
      <Flex
        w='full'
        justify='center'
        py='10'
        m='auto'
        flexWrap='wrap'
        color={colorCard}
      >
        {data.map(
          ({
            id,
            title,
            synopsis,
            author,
            category,
            year,
            language,
            sourceLink,
            numberPages,
          }: CardProps) => (
            <React.Fragment key={id}>
              <Card
                category={category}
                title={title}
                author={author}
                synopsis={synopsis}
                numberPages={numberPages}
                sourceLink={sourceLink}
                year={year}
                language={language}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
