import React from 'react';

import { MainHead } from '@components/Head';
import { ContainerTitle } from '@components/ContainerTitle';
import { MySimpleGrid } from '@components/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { useMostViewedBooks } from '@hooks/querys';
import { MySliderCategories } from '@components/MySliderCategories';

export default function MostViewed() {
  const { data } = useMostViewedBooks('full');

  return (
    <>
      <MainHead title='Top 10 Más Vistos | XBuniverse' />
      <ContainerTitle title='Top 10 Más Vistos' />
      <MySliderCategories />
      <MySimpleGrid width='6xl'>
        {data?.map(
          ({
            id,
            category,
            title,
            language,
            authors,
            pathUrl,
            image,
          }: CardType) => (
            <>
              <Card
                id={id}
                category={category}
                title={title}
                authors={authors}
                language={language}
                pathUrl={pathUrl}
                image={image}
              />
            </>
          ),
        )}
      </MySimpleGrid>
    </>
  );
}
