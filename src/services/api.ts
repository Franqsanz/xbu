import { API_URL } from '../config';
import { fetchData } from '../utils/fetchData';

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

async function getAllFilterOptions() {
  const data = await fetchData(`${API_URL}/books/options`);

  return data;
}

async function deleteBook(id: any) {
  const data = await fetchData(`${API_URL}/book/delete/${id}`, {
    method: 'DELETE',
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
  postBook,
  deleteBook,
};
