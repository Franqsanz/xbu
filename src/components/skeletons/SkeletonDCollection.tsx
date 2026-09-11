import { Flex, Skeleton } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ContainerRow } from '@components/ui/ContainerRow';
import { SkeletonContainer } from './SkeletonContainer';

export function SkeletonDCollection() {
  return (
    <>
      {/* Acá el título es el nombre de la colección, que todavía no llegó: va la
          banda vacía. Usamos el componente real con un espacio duro para que
          reserve exactamente el mismo alto, sin simular texto. */}
      <ContainerTitle title={'\u00A0'} />
      <ContainerRow pb='4'>
        <Skeleton w='90px' h='32px' rounded='md' />
        <Flex display={{ base: 'none', sm: 'flex' }} gap='3'>
          <Skeleton w='140px' h='32px' rounded='md' />
          <Skeleton w='150px' h='32px' rounded='md' />
        </Flex>
        <Skeleton
          display={{ base: 'block', sm: 'none' }}
          w='32px'
          h='32px'
          rounded='md'
        />
      </ContainerRow>
      {/* El detalle de colección no tiene aside: su contenido es sólo el grid. */}
      <SkeletonContainer aside={false} />
    </>
  );
}
