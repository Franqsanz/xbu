import { Skeleton, useColorModeValue } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ContainerRow } from '@components/ui/ContainerRow';
import { MyContainer } from '@components/ui/MyContainer';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';

/** Cuántas tarjetas dibujamos mientras carga. */
const CARDS = 6;

export function SkeletonACollections() {
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');

  return (
    <>
      {/* El título es fijo: lo mostramos de verdad en vez de simularlo. */}
      <ContainerTitle title='Mis colecciones' />
      <ContainerRow pb='3' borderBottom={`1px solid ${grayColor}`}>
        <Skeleton h='24px' w='130px' />
        <Skeleton h='32px' w={{ base: '45px', md: '160px' }} rounded='md' />
      </ContainerRow>
      <MyContainer>
        <MySimpleGrid overflow='hidden' gap={{ base: 3, sm: 5 }}>
          {Array.from({ length: CARDS }, (_, index) => (
            <Skeleton
              key={index}
              w={{ base: 'full', xl: '250px' }}
              h={{ base: '200px', sm: '210px' }}
              rounded='lg'
            />
          ))}
        </MySimpleGrid>
      </MyContainer>
    </>
  );
}
