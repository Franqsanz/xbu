import { API_URL } from '../config';
import { fetchData } from '@utils/fetchData';

async function getAllBooks() {
  return await fetchData(API_URL);
}

async function getAllSearchBooks(book: string) {
  return await fetchData(`${API_URL}/books/search?q=${book}`);
}

async function getBooksPaginate(page: number | undefined) {
  return await fetchData(`${API_URL}/books?limit=10&page=${page}`, {
    credentials: 'include',
  });
}

async function getBook(pathUrl: string | undefined) {
  return await fetchData(`${API_URL}/books/path/${pathUrl}`, {
    method: 'GET',
  });
}

async function getBooksFilterPaginated(
  query: string | undefined,
  param: string | undefined,
  page: number | undefined,
) {
  return await fetchData(`${API_URL}/books?${query}=${param}&limit=10&page=${page}`);
}

async function getBooksFilter(query: string | undefined, param: string | undefined) {
  return await fetchData(`${API_URL}/books?${query}=${param}`);
}

async function getMostViewedBooks(query: string) {
  return await fetchData(`${API_URL}/books/most-viewed-books?detail=${query}`);
}

async function getMoreBooks(id: string | undefined) {
  return await fetchData(`${API_URL}/books/more-books/${id}`);
}

async function getRelatedBooks(id: string | undefined) {
  return await fetchData(`${API_URL}/books/related-books/${id}`);
}

async function getMoreBooksAuthors(id: string | undefined) {
  return await fetchData(`${API_URL}/books/more-books-authors/${id}`);
}

async function getAllFilterOptions() {
  return await fetchData(`${API_URL}/books/options`, {
    credentials: 'include',
  });
}

async function patchToggleFavorite(
  userId: string | undefined,
  body: any,
  isFavorite: boolean,
) {
  return await fetchData(`${API_URL}/users/favorites`, {
    method: 'PATCH',
    body: JSON.stringify({ userId, id: body, isFavorite }),
  });
}

async function getFindAllCollections(userId: string | undefined) {
  return await fetchData(`${API_URL}/users/collections/${userId}`, {
    credentials: 'include',
  });
}

async function getCollectionsForUser(userId: string | undefined, bookId: string) {
  return await fetchData(
    `${API_URL}/users/collections/${userId}/summary/${bookId}`,
    {
      credentials: 'include',
    },
  );
}

async function postCollections(userId: string | undefined, body: any) {
  return await fetchData(`${API_URL}/users/collections/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ name: body }),
  });
}

async function patchToggleBookInCollection(
  userId: string | undefined,
  collections: Array<{
    collectionId: string;
    collectionName: string;
    isInCollection: boolean;
  }>,
  bookId: string,
  checked: boolean,
) {
  return await fetchData(`${API_URL}/users/collections/books/toggle`, {
    method: 'PATCH',
    body: JSON.stringify({
      userId,
      collections,
      bookId,
      checked,
    }),
  });
}

async function patchCollectionsName(
  userId: string | undefined,
  collectionId: string | undefined,
  name: string,
) {
  return await fetchData(`${API_URL}/users/collections/collection/${collectionId}`, {
    method: 'PATCH',
    body: JSON.stringify({ userId, name }),
  });
}

async function deleteCollections(
  id: string | undefined,
  collectionId: string | undefined,
) {
  return await fetchData(
    `${API_URL}/users/collections/${id}/collection/${collectionId}`,
    {
      method: 'DELETE',
    },
  );
}

async function getFindOneCollection(collectionsId: string | undefined) {
  return await fetchData(`${API_URL}/users/collections/collection/${collectionsId}`);
}

async function patchRemoveBookFromCollection(
  userId: string | undefined,
  collectionId: string,
  bookId: string,
) {
  return await fetchData(`${API_URL}/users/collections/remove`, {
    method: 'PATCH',
    body: JSON.stringify({
      userId,
      collectionId,
      bookId,
    }),
  });
}

async function postBook(books: any) {
  const formData = new FormData();

  if (books.image.blob instanceof Blob) {
    formData.append('image', books.image.blob, 'image.webp');
  }

  const bookData = {
    title: books.title,
    authors: books.authors,
    synopsis: books.synopsis,
    year: books.year,
    category: books.category,
    numberPages: books.numberPages,
    sourceLink: books.sourceLink,
    language: books.language,
    format: books.format,
    pathUrl: books.pathUrl,
    userId: books.userId,
    rating: books.rating,
    image: {
      public_id: '',
    },
  };

  formData.append('bookData', JSON.stringify(bookData));

  return await fetchData(`${API_URL}/books`, {
    method: 'POST',
    body: formData,
  });
}

async function updateBook(id: string | undefined, books: any) {
  const formData = new FormData();

  if (books.image.blob instanceof Blob) {
    formData.append('image', books.image.blob, 'image.webp');
  }

  const bookData = {
    title: books.title,
    authors: books.authors,
    synopsis: books.synopsis,
    year: books.year,
    category: books.category,
    numberPages: books.numberPages,
    sourceLink: books.sourceLink,
    language: books.language,
    format: books.format,
    pathUrl: books.pathUrl,
    userId: books.userId,
    rating: books.rating,
    image: {
      url: books.image.url,
      public_id: books.image.public_id || '',
    },
  };

  formData.append('bookData', JSON.stringify(bookData));

  return await fetchData(`${API_URL}/books/${id}`, {
    method: 'PATCH',
    body: formData,
  });
}

async function deleteBook(id: string | undefined) {
  return await fetchData(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  });
}

// Usuarios

async function postLogin(token: string) {
  return await fetchData(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ idToken: token }),
  });
}

async function postRegister(body: any) {
  return await fetchData(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ username: body }),
  });
}

async function postLogout() {
  return await fetchData(`${API_URL}/auth/logout`, {
    method: 'POST',
  });
}

async function getCheckUser() {
  try {
    return await fetchData(`${API_URL}/users/check-user`, {
      credentials: 'include',
    });
  } catch (error) {
    // Si el usuario es nuevo (404), retorna objeto vacío en lugar de error
    if (error instanceof Error && error.message.includes('404')) {
      return { uid: null, username: null };
    }
    throw error;
  }
}

async function getUserAndBooks(
  username: string | undefined,
  userId: string | undefined,
  page: number | undefined,
) {
  return await fetchData(
    `${API_URL}/users/${userId}/${username}/books?limit=10&page=${page}`,
    {
      method: 'GET',
    },
  );
}

async function getFindAllBookFavorite(userId: string | undefined, page: number) {
  return await fetchData(
    `${API_URL}/users/favorites/${userId}?limit=10&page=${page}`,
  );
}

async function getFindAllComments(bookId: string, page: number) {
  return await fetchData(
    `${API_URL}/users/comments/book-comments/${bookId}?limit=5&page=${page}`,
  );
}

async function postComment(
  text: string,
  author: {
    userId: string | undefined;
    username: string | null | undefined;
  },
  bookId: string,
) {
  return await fetchData(`${API_URL}/users/comments/comment`, {
    method: 'POST',
    body: JSON.stringify({
      text,
      author,
      bookId,
    }),
  });
}

async function updateComment(
  commentId: string,
  userId: string | undefined,
  text: string,
) {
  return await fetchData(
    `${API_URL}/users/comments/comment/${commentId}/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ text }),
    },
  );
}

async function postReactions(
  commentId: string,
  userId: string | undefined,
  type: string,
) {
  return await fetchData(
    `${API_URL}/users/comments/comment/${commentId}/${userId}/reaction`,
    {
      method: 'POST',
      body: JSON.stringify({ type }),
    },
  );
}

async function deleteComment(commentId: string, userId: string | undefined) {
  return await fetchData(
    `${API_URL}/users/comments/comment/${commentId}/${userId}`,
    {
      method: 'DELETE',
    },
  );
}

async function deleteAccount(id: string | undefined) {
  return await fetchData(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
}

export {
  getAllBooks,
  getAllSearchBooks,
  getBooksPaginate,
  getBook,
  getBooksFilterPaginated,
  getBooksFilter,
  getAllFilterOptions,
  getMoreBooks,
  getMostViewedBooks,
  getRelatedBooks,
  getMoreBooksAuthors,
  patchToggleFavorite,
  getCollectionsForUser,
  getFindAllCollections,
  postCollections,
  patchToggleBookInCollection,
  patchCollectionsName,
  patchRemoveBookFromCollection,
  deleteCollections,
  getFindOneCollection,
  postBook,
  deleteBook,
  updateBook,
  getFindAllComments,
  postComment,
  postReactions,
  updateComment,
  deleteComment,

  // Usuarios
  postLogin,
  postRegister,
  postLogout,
  getCheckUser,
  getUserAndBooks,
  getFindAllBookFavorite,
  deleteAccount,
};
