import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, test, expect } from 'vitest';

import { Footer } from '../../components/Footer';

test('Render Footer', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

  expect(screen.getByText('Hecho con ❤ por Franqsanz'));

  const privacyLink = screen.getByText(/políticas de privacidad/i);
  expect(privacyLink);

  // Simular el click en el enlace
  fireEvent.click(privacyLink, new MouseEvent('click'));
});
