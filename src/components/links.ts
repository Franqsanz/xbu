import { LinkProps, BooksCategory, BooksFormat } from './types';

const navLink: Array<LinkProps> = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Explorar',
    href: 'explore',
  },
  {
    name: 'Publicar',
    href: 'new-post',
  },
];

const accountLinks: Array<LinkProps> = [
  {
    name: 'Ingresar',
    href: 'login',
  },
  {
    name: 'Crear cuenta',
    href: 'register',
  },
];

const categories: Array<BooksCategory> = [
  {
    value: 'Ciencia Ficción',
    label: 'Ciencia Ficción',
  },
  {
    value: 'Terror',
    label: 'Terror',
  },
  {
    value: 'Suspenso',
    label: 'Suspenso',
  },
  {
    value: 'Economía',
    label: 'Economía',
  },
  {
    value: 'Románticos',
    label: 'Románticos',
  },
  {
    value: 'Fantasía',
    label: 'Fantasía',
  },
  {
    value: 'Poesía',
    label: 'Poesía',
  },
  {
    value: 'Politica',
    label: 'Politica',
  },
  {
    value: 'Psicoterapia',
    label: 'Psicoterapia',
  },
  {
    value: 'Medicina',
    label: 'Medicina',
  },
  {
    value: 'Policiales',
    label: 'Policiales',
  },
  {
    value: 'Ciencias',
    label: 'Ciencias',
  },
  {
    value: 'Programación',
    label: 'Programación',
  },
  {
    value: 'Tecnología',
    label: 'Tecnología',
  },
  {
    value: 'Física',
    label: 'Física',
  },
  {
    value: 'Ingenierías',
    label: 'Ingenierías',
  },
  {
    value: 'Cómics',
    label: 'Cómics',
  },
  {
    value: 'Literatura',
    label: 'Literatura',
  },
  {
    value: 'Literatura Infantil',
    label: 'Literatura Infantil',
  },
  {
    value: 'Deportes',
    label: 'Deportes',
  },
  {
    value: 'Novela Histórica',
    label: 'Novela Histórica',
  },
  {
    value: 'Novela contemporánea',
    label: 'Novela contemporánea',
  },
  {
    value: 'Música',
    label: 'Música',
  },
  {
    value: 'Historia',
    label: 'Historia',
  },
];

const format: Array<BooksFormat> = [
  {
    value: 'Físico',
    label: 'Físico',
  },
  {
    value: 'Electrónico',
    label: 'Electrónico',
  },
];

export { navLink, accountLinks, categories, format };
