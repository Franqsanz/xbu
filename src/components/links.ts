import { LinkProps } from './types';

const navLink: Array<LinkProps> = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Explorar',
    href: 'explorer',
  },
  {
    name: 'Publicar un Libro',
    href: 'new-book',
  },
];

const categoryLinks: Array<LinkProps> = [
  {
    name: 'Ciencia Ficción',
  },
  {
    name: 'Terror',
  },
  {
    name: 'Suspenso',
  },
  {
    name: 'Economía',
  },
  {
    name: 'Románticos',
  },
  {
    name: 'Fantasía',
  },
  {
    name: 'Poesía',
  },
  {
    name: 'Politica',
  },
  {
    name: 'Medicina',
  },
  {
    name: 'Policiales',
  },
  {
    name: 'Ciencias',
  },
  {
    name: 'Programación',
  },
  {
    name: 'Tecnología',
  },
  {
    name: 'Física',
  },
  {
    name: 'Ingenierías',
  },
  {
    name: 'Cómics',
  },
];

export { navLink, categoryLinks };
