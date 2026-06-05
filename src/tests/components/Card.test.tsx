import { describe, expect, test } from 'vitest';

import { Card } from '@components/cards/Card';
import { renderWithProviders, screen } from '@tests/utils/renderWithProviders';
import { mockBook } from '@tests/utils/fixtures';

describe('Card', () => {
  test('renders the book title', () => {
    renderWithProviders(<Card {...mockBook} />);
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
  });

  test('renders the author', () => {
    renderWithProviders(<Card {...mockBook} />);
    expect(screen.getByText(mockBook.authors[0]!)).toBeInTheDocument();
  });

  test('renders the first category as tag', () => {
    renderWithProviders(<Card {...mockBook} />);
    expect(screen.getByText(mockBook.category[0]!)).toBeInTheDocument();
  });

  test('renders the cover image with the book title as alt', () => {
    renderWithProviders(<Card {...mockBook} />);
    expect(screen.getByAltText(`Imagen de "${mockBook.title}"`)).toBeInTheDocument();
  });

  test('links to the book detail page', () => {
    renderWithProviders(<Card {...mockBook} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/book/view/${mockBook.pathUrl}`);
  });
});
