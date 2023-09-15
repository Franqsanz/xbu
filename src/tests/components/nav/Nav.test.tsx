import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';

import theme from '../../../../theme';
import { Nav } from '../../../components/nav/Nav';

test('Render Nav', () => {
  render(
    <ChakraProvider theme={theme}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </ChakraProvider>,
  );

  // expect(screen.getByText('Inicio'));
  // expect(screen.getByText('Explorar'));
  // expect(screen.getByText('Publicar'));
});
