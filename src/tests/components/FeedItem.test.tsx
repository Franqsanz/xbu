import { describe, expect, test } from 'vitest';

import { FeedItem } from '@components/feed/FeedItem';
import { renderWithProviders, screen } from '@tests/utils/renderWithProviders';
import {
  mockActor,
  mockBookActivity,
  mockCommentActivity,
  mockFeedBook,
  mockGroupActivity,
  mockRatingActivity,
} from '@tests/utils/fixtures';
import type { FeedActivity } from '@components/types';

describe('FeedItem — individual activity types', () => {
  test('renders a "book" activity with title and synopsis', () => {
    renderWithProviders(<FeedItem activity={mockBookActivity} />);
    expect(screen.getByText('publicó un libro')).toBeInTheDocument();
    expect(screen.getByText(mockFeedBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockFeedBook.synopsis)).toBeInTheDocument();
  });

  test('renders a "rating" activity with rating badge and stars', () => {
    renderWithProviders(<FeedItem activity={mockRatingActivity} />);
    expect(screen.getByText('calificó')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  test('renders a "comment" activity with the comment text', () => {
    renderWithProviders(<FeedItem activity={mockCommentActivity} />);
    expect(screen.getByText('comentó en')).toBeInTheDocument();
    expect(screen.getByText('Una joya de Tolkien.')).toBeInTheDocument();
  });

  test('renders a "status" activity with the correct label', () => {
    const statusActivity: FeedActivity = {
      type: 'status',
      createdAt: '2026-06-05T14:00:00.000Z',
      actor: mockActor,
      book: mockFeedBook,
      status: 'reading',
    };
    renderWithProviders(<FeedItem activity={statusActivity} />);
    expect(screen.getByText('Leyendo')).toBeInTheDocument();
    expect(screen.getByText(mockFeedBook.title)).toBeInTheDocument();
  });

  test('renders a "follow" activity with target name and "Ver perfil" link', () => {
    const target = {
      uid: 'user-456',
      username: 'otraperson',
      name: 'Otra Persona',
      picture: 'https://example.com/other.png',
    };
    const followActivity: FeedActivity = {
      type: 'follow',
      createdAt: '2026-06-05T14:00:00.000Z',
      actor: mockActor,
      target,
    };
    renderWithProviders(<FeedItem activity={followActivity} />);
    expect(screen.getByText('siguió a')).toBeInTheDocument();
    expect(screen.getAllByText(target.name).length).toBeGreaterThan(0);
    expect(screen.getByText('Ver perfil')).toBeInTheDocument();
  });

  test('actor name links to the actor profile', () => {
    renderWithProviders(<FeedItem activity={mockBookActivity} />);
    const actorLinks = screen.getAllByRole('link', { name: mockActor.name });
    expect(actorLinks[0]).toHaveAttribute('href', `/profile/${mockActor.username}`);
  });
});

describe('FeedItem — grouped activity', () => {
  test('renders the "interactuó con" header and the book once', () => {
    renderWithProviders(<FeedItem activity={mockGroupActivity} />);
    expect(screen.getByText('interactuó con')).toBeInTheDocument();
    expect(screen.getByText(mockFeedBook.title)).toBeInTheDocument();
  });

  test('renders all grouped actions as timeline rows', () => {
    renderWithProviders(<FeedItem activity={mockGroupActivity} />);
    expect(screen.getByText('Lo agregó a "Quiere leer"')).toBeInTheDocument();
    expect(screen.getByText('Lo calificó con 5/5')).toBeInTheDocument();
    expect(screen.getByText('Comentó')).toBeInTheDocument();
    expect(screen.getByText(/Una joya de Tolkien\./)).toBeInTheDocument();
  });

  test('caps comments at 3 and shows "+N comentarios más" for extras', () => {
    const manyComments: FeedActivity = {
      ...mockGroupActivity,
      activities: Array.from({ length: 6 }, (_, i) => ({
        type: 'comment' as const,
        createdAt: `2026-06-05T1${i}:00:00.000Z`,
        actor: mockActor,
        book: mockFeedBook,
        comment: { id: `c${i}`, text: `Comentario número ${i + 1}` },
      })),
    };
    renderWithProviders(<FeedItem activity={manyComments} />);
    expect(screen.getByText(/Comentario número 1\b/)).toBeInTheDocument();
    expect(screen.getByText(/Comentario número 2\b/)).toBeInTheDocument();
    expect(screen.getByText(/Comentario número 3\b/)).toBeInTheDocument();
    expect(screen.queryByText(/Comentario número 4\b/)).not.toBeInTheDocument();
    expect(screen.getByText(/3 comentarios más/i)).toBeInTheDocument();
  });
});
