import { Flex, FlexProps } from '@chakra-ui/react';

import { CONTAINER_MAX_W, CONTAINER_PX } from '@components/ui/layout';

/**
 * Fila a ancho completo alineada con `MyContainer`. Existe porque las barras de
 * acciones y sus skeletons tenían el ancho y el padding copiados a mano, y cada
 * copia había quedado con números distintos (1260, 1300 y 1315px).
 */
export function ContainerRow({ children, ...rest }: FlexProps) {
  return (
    <Flex
      w='full'
      maxW={CONTAINER_MAX_W}
      m='0 auto'
      mt='4'
      px={CONTAINER_PX}
      justify='space-between'
      align='center'
      {...rest}
    >
      {children}
    </Flex>
  );
}
