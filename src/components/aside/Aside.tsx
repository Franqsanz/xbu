import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

/** Alto del header sticky (DesktopNav) + un respiro, para no quedar tapados. */
const STICKY_TOP = '72px';

export function Aside({
  children,
  side = 'left',
  w = { base: '250px', lg: '300px' },
  mt,
  spacing = '8',
  flexShrink,
  sticky = false,
}: {
  children: React.ReactNode;
  side?: 'left' | 'right';
  w?: FlexProps['w'];
  /** Va como margen y no como padding: el padding de un sticky viaja con él. */
  mt?: FlexProps['mt'];
  /** Separación contra el contenido principal. */
  spacing?: FlexProps['mr'];
  /**
   * Por defecto el aside cede ancho como cualquier item flex: las páginas con
   * grilla de tarjetas dependen de eso para no apretarlas. Los rieles del home
   * pasan 0 porque ahí el que tiene que ceder es el feed.
   */
  flexShrink?: FlexProps['flexShrink'];
  sticky?: boolean;
}) {
  // `alignSelf` es obligatorio: los items de un flex se estiran por defecto y
  // un item que ocupa todo el alto nunca llega a pegarse al hacer scroll.
  const stickyProps: FlexProps = sticky
    ? {
        position: 'sticky',
        top: STICKY_TOP,
        alignSelf: 'flex-start',
        maxH: `calc(100vh - ${STICKY_TOP} - 1rem)`,
        overflowY: 'auto',
        // Aire contra la barra de scroll propia: sin esto el contenido queda
        // pegado a ella. El ancho del riel ya lo compensa.
        pr: '3',
        sx: {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#a2aab3',
            borderRadius: '30px',
          },
        },
      }
    : {};

  return (
    <Flex
      as='aside'
      display={{ base: 'none', xl: 'flex' }}
      w={w}
      flexShrink={flexShrink}
      mt={mt}
      mr={side === 'left' ? spacing : '0'}
      ml={side === 'right' ? spacing : '0'}
      direction='column'
      {...stickyProps}
    >
      {children}
    </Flex>
  );
}
