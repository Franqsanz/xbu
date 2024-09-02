import React from 'react';
import { Flex } from '@chakra-ui/react';

import { useAllFavoriteByUser } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { Aside } from '@components/aside/Aside';
import { ResultLength } from '@components/aside/ResultLength';
import { MySliderCategories } from '@components/ui/MySliderCategories';

export default function Favorites() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, fetchNextPage, isFetchingNextPage } = useAllFavoriteByUser(uid);

  return (
    <>
      <MainHead title='Mis favoritos | XBuniverse' />
      <ContainerTitle title='Mis favoritos' />
      <MySliderCategories />
      <Flex
        as='article'
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '1260px', '2xl': '1560px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data?.pages[0].info.totalBooks} />
          {/* {aboutCategoriesUI}
          {asideFilter}  */}
        </Aside>
        <MySimpleGrid>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map(
                ({
                  id,
                  category,
                  language,
                  title,
                  authors,
                  synopsis,
                  sourceLink,
                  pathUrl,
                  image,
                }: CardType) => (
                  <React.Fragment key={id}>
                    <Card
                      id={id}
                      category={category}
                      language={language}
                      title={title}
                      authors={authors}
                      synopsis={synopsis}
                      sourceLink={sourceLink}
                      pathUrl={pathUrl}
                      image={image}
                    />
                  </React.Fragment>
                ),
              )}
            </React.Fragment>
          ))}
        </MySimpleGrid>
      </Flex>
    </>
  );
}
