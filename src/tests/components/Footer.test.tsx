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
  const text = screen.getByText('Hecho con ❤ por Franqsanz');
  expect(text).toBeInTheDocument();

  const privacyLink = screen.getByText(/política de privacidad/i);
  expect(privacyLink).toBeInTheDocument();

  // Simular el click en el enlace
  fireEvent.click(privacyLink, new MouseEvent('click'));
});
