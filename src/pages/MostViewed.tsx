import React from 'react';
import { Flex } from '@chakra-ui/react';

import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { useMostViewedBooks } from '@hooks/queries';
import { MySliderCategories } from '@components/ui/MySliderCategories';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';

export default function MostViewed() {
  const { data, isPending } = useMostViewedBooks('full');

  if (isPending) {
    return <SkeletonAllBooks showTags={true} />;
  }

  return (
    <>
      <MainHead title='Top 10 Más vistos | XBuniverse' />
      <ContainerTitle title='Top 10 Más vistos' />
      <MySliderCategories />
      <Flex
        maxW={{ base: '1070px', '2xl': '1280px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <MySimpleGrid>
          {data?.map(
            ({
              id,
              category,
              title,
              language,
              authors,
              pathUrl,
              image,
              views,
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
                  views={views}
                />
              </>
            ),
          )}
        </MySimpleGrid>
      </Flex>
    </>
  );
}
