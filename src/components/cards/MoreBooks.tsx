import React from 'react';

import { RelatedCard } from '@components/cards/RelatedCard';
import { ContainerRCard } from '@components/cards/ContainerRCard';
import { CardType, RelatedBooksType } from '@components/types';
import { useMoreBooks } from '@hooks/queries';
import { useRefetchLocation } from '@hooks/useRefetchLocation';

export default function MoreBooks({ currentBookId }: RelatedBooksType) {
  const { data, refetch } = useMoreBooks();
  const moreBooks = useRefetchLocation({ currentBookId, data, refetch });

  return (
    <>
      <ContainerRCard>
        {moreBooks.map(({ id, title, authors, pathUrl }: CardType) => (
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
