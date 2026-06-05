import type { FeedActivity, FeedActor, FeedBook } from '@components/types';

export const mockBook = {
  id: '64da097a85df016d471dad12',
  title: 'El Hobbit',
  authors: ['J.R.R. Tolkien'],
  category: ['Fantasía', 'Aventura'],
  synopsis: 'Bilbo Bolsón se embarca en una aventura inesperada con trece enanos.',
  language: 'Español',
  pathUrl: 'el-hobbit-AaBb',
  image: {
    url: 'https://example.com/hobbit.webp',
    public_id: 'xbu/hobbit',
  },
  views: 120,
};

export const mockActor: FeedActor = {
  uid: 'user-123',
  username: 'franqsanz',
  name: 'Franco Sánchez',
  picture: 'https://example.com/avatar.png',
};

export const mockFeedBook: FeedBook = {
  id: mockBook.id,
  title: mockBook.title,
  pathUrl: mockBook.pathUrl,
  image: { url: mockBook.image.url },
  authors: mockBook.authors,
  category: mockBook.category,
  synopsis: mockBook.synopsis,
};

export const mockBookActivity: FeedActivity = {
  type: 'book',
  createdAt: '2026-06-05T14:00:00.000Z',
  actor: mockActor,
  book: mockFeedBook,
};

export const mockRatingActivity: FeedActivity = {
  type: 'rating',
  createdAt: '2026-06-05T15:00:00.000Z',
  actor: mockActor,
  book: mockFeedBook,
  rating: 5,
};

export const mockCommentActivity: FeedActivity = {
  type: 'comment',
  createdAt: '2026-06-05T16:00:00.000Z',
  actor: mockActor,
  book: mockFeedBook,
  comment: { id: 'c1', text: 'Una joya de Tolkien.' },
};

export const mockGroupActivity: FeedActivity = {
  type: 'group',
  createdAt: '2026-06-05T16:00:00.000Z',
  actor: mockActor,
  book: mockFeedBook,
  activities: [
    {
      type: 'status',
      createdAt: '2026-06-05T14:00:00.000Z',
      actor: mockActor,
      book: mockFeedBook,
      status: 'want_to_read',
    },
    {
      type: 'rating',
      createdAt: '2026-06-05T15:00:00.000Z',
      actor: mockActor,
      book: mockFeedBook,
      rating: 5,
    },
    {
      type: 'comment',
      createdAt: '2026-06-05T16:00:00.000Z',
      actor: mockActor,
      book: mockFeedBook,
      comment: { id: 'c1', text: 'Una joya de Tolkien.' },
    },
  ],
};
