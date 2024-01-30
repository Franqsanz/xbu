import { API_URL } from '../config';
import { fetchData } from '@utils/fetchData';

async function getAllBooks() {
  const data = await fetchData(API_URL);

  return data;
}

async function getAllSearchBooks(book: string) {
  const data = await fetchData(`${API_URL}/books/search?q=${book}`);

  return data;
}

async function getBooksPaginate(page: number | undefined) {
  const data = await fetchData(`${API_URL}/books?limit=10&page=${page}`);

  return data;
}

async function getBook(pathUrl: string | undefined) {
  const data = await fetchData(`${API_URL}/book/path/${pathUrl}`);

  return data;
}

async function postBook(books: any) {
  const post = await fetchData(`${API_URL}/book/post`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });

  return post;
}

async function getBooksFilter(
  query: string | undefined,
  param: string | undefined,
) {
  const data = await fetchData(`${API_URL}/books?${query}=${param}`);

  return data;
}

async function getMoreBooks() {
  const data = await fetchData(`${API_URL}/books/more-books`);

  return data;
}

async function getRelatedBooks(id: string | undefined) {
  const data = await fetchData(`${API_URL}/books/related-books/${id}`);

  return data;
}

async function getMoreBooksAuthors(id: string | undefined) {
  const data = await fetchData(`${API_URL}/books/more-books-authors/${id}`);

  return data;
}

async function getAllFilterOptions() {
  const data = await fetchData(`${API_URL}/books/options`);

  return data;
}

async function updateBook(id: string | undefined, books: any) {
  const data = await fetchData(`${API_URL}/book/update/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });

  return data;
}

async function deleteBook(id: string | undefined) {
  const data = await fetchData(`${API_URL}/book/delete/${id}`, {
    method: 'DELETE',
  });

  return data;
}

// Usuarios

async function postRegister(token: string) {
  const data = await fetchData(`${API_URL}/auth/register`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

async function getUserAndBooks(id: string | undefined, token: string | null) {
  const data = await fetchData(`${API_URL}/user/my-books/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export {
  getAllBooks,
  getAllSearchBooks,
  getBooksPaginate,
  getBook,
  getBooksFilter,
  getAllFilterOptions,
  getMoreBooks,
  getRelatedBooks,
  getMoreBooksAuthors,
  postBook,
  deleteBook,
  updateBook,
  // Usuarios
  postRegister,
  getUserAndBooks,
};
