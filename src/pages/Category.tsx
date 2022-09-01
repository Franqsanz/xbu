import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useCategory } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';

export function Category() {
  const { param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useCategory(param);

  return (
    <>
      <Helmet>
        <title>{param} | Categorias</title>
      </Helmet>
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
            description,
            author,
            category,
            publicationDate,
            sourceLink,
            numberPages,
          }: CardProps) => (
            <React.Fragment key={id}>
              <Card
                category={category}
                title={title}
                author={author}
                description={description}
                numberPages={numberPages}
                sourceLink={sourceLink}
                publicationDate={publicationDate}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
