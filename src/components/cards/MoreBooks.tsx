import React from 'react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType } from '@components/types';
import { useMoreBooks } from '@hooks/queries';

export default function MoreBooks({ id }) {
  const { data, refetch } = useMoreBooks(id);

  return (
    <>
      <ContainerRCard>
        {data.map(({ id, title, authors, pathUrl }: CardType) => (
          <React.Fragment key={id}>
            <RelatedCard
              title={title}
              authors={authors}
              pathUrl={pathUrl}
              refetchQueries={refetch}
            />
          </React.Fragment>
        ))}
      </ContainerRCard>
    </>
  );
}
