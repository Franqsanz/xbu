import { LinkProps } from './types';

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

export { navLink, accountLinks, categoryLinks };
