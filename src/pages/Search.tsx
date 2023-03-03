import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useFilter } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import { ResultLength } from '../components/ResultLength';

export function Search() {
  const { query, param } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useFilter(query, param);

  return (
    <>
      <MainHead title={`Libros de ${param} | XBuniverse`} />
      <ContainerTitle title={`Libros de ${param}`} />
      <ResultLength data={data} />
      <Flex
        w='full'
        justify='center'
        py='5'
        m='auto'
        px='1'
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
            sourceLink,
            image,
          }: CardProps) => (
            <React.Fragment key={id}>
              <Card
                id={id}
                category={category}
                title={title}
                author={author}
                synopsis={synopsis}
                sourceLink={sourceLink}
                image={image}
              />
            </React.Fragment>
          ),
        )}
      </Flex>
    </>
  );
}
