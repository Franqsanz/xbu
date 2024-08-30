import React from 'react';

import { useAllFavoriteByUser } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';

export default function Favorites() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, fetchNextPage, isFetchingNextPage } = useAllFavoriteByUser(uid);

  return (
    <>
      <MainHead title='Mis Favoritos | XBuniverse' />
      <ContainerTitle title='Mis Favoritos' />
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
    </>
  );
}
