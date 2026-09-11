import React from 'react';
import { Box } from '@chakra-ui/react';

import { Aside } from '@components/aside/Aside';
import { MyContainer } from '@components/ui/MyContainer';

/** Ambos rieles miden lo mismo para que el feed quede centrado en la página. */
const RAIL_WIDTH = '262px'; // 250 de contenido + 12 del `pr` contra el scroll
const RAIL_SPACING = '10';
const RAIL_TOP = { base: 6, md: 10 };

/**
 * Las tres columnas del home. Vive acá y no en `Home` porque el skeleton usa
 * exactamente la misma estructura: si las medidas viven en un solo lugar, el
 * fallback no puede quedar desalineado del render real.
 */
export function HomeLayout({
  leftRail,
  rightRail,
  children,
}: {
  leftRail: React.ReactNode;
  rightRail: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <MyContainer>
      <Aside
        side='left'
        w={RAIL_WIDTH}
        spacing={RAIL_SPACING}
        mt={RAIL_TOP}
        flexShrink={0}
        sticky
      >
        {leftRail}
      </Aside>
      {/* Sin `maxW` desde xl: con los dos rieles el ancho ya queda acotado, y
          un maxW acá dejaba aire muerto entre el feed y los costados. */}
      <Box
        w='full'
        maxW={{ base: '4xl', xl: 'none' }}
        flex={{ xl: '1' }}
        minW='0'
        m='auto'
        py={{ base: 6, md: 10 }}
      >
        {children}
      </Box>
      <Aside
        side='right'
        w={RAIL_WIDTH}
        spacing={RAIL_SPACING}
        mt={RAIL_TOP}
        flexShrink={0}
        sticky
      >
        {rightRail}
      </Aside>
    </MyContainer>
  );
}
