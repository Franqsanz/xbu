import { API_URL } from '../config';
import { fetchData } from '../utils/fetchData';

async function getAllBooks() {
  const data = await fetchData(API_URL);

  return data;
}

async function getAllSearchBooks() {
  const data = await fetchData(`${API_URL}/search`);

  return data;
}

async function getBooksPaginate(page: number | undefined) {
  const data = await fetchData(`${API_URL}?limit=10&page=${page}`);

  return data;
}

async function getBook(pathUrl: string | undefined) {
  const data = await fetchData(`${API_URL}/path/${pathUrl}`);

  return data;
}

async function postBook(books: any) {
  const post = await fetchData(API_URL, {
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
  const data = await fetchData(`${API_URL}?${query}=${param}`);

  return data;
}

async function getRelatedPost() {
  const data = await fetchData(`${API_URL}/related-post`);

  return data;
}

async function getAllFilterOptions() {
  const data = await fetchData(`${API_URL}/options`);

  return data;
}

async function deleteBook(id: any) {
  const data = await fetchData(`${API_URL}/${id}`, {
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
  getRelatedPost,
  postBook,
  deleteBook,
};
