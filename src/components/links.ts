import { FiHome } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { LinkProps, SelectBooksprops } from './types';

const navLink: Array<LinkProps> = [
  {
    name: 'Inicio',
    href: '/',
    icon: FiHome,
  },
  {
    name: 'Explorar',
    href: 'explore',
    icon: MdOutlineExplore,
  },
  {
    name: 'Publicar',
    href: 'new-post',
    icon: AiOutlineCloudUpload,
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

const categories: Array<SelectBooksprops> = [
  {
    value: 'Ciencia Ficción',
    label: 'Ciencia Ficción',
  },
  {
    value: 'Clásicos',
    label: 'Clásicos',
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
    value: 'Romance',
    label: 'Romance',
  },
  {
    value: 'Fantasía',
    label: 'Fantasía',
  },
  {
    value: 'Filosofía',
    label: 'Filosofía',
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
    value: 'Novela',
    label: 'Novela',
  },
  {
    value: 'Música',
    label: 'Música',
  },
  {
    value: 'Historia',
    label: 'Historia',
  },
  {
    value: 'Misterio',
    label: 'Misterio',
  },
  {
    value: 'Thriller',
    label: 'Thriller',
  },
  {
    value: 'Adulto',
    label: 'Adulto',
  },
  {
    value: 'Ficción',
    label: 'Ficción',
  },
];

const format: Array<SelectBooksprops> = [
  {
    value: 'Físico',
    label: 'Físico',
  },
  {
    value: 'Electrónico',
    label: 'Electrónico',
  },
  {
    value: 'AudioLibro',
    label: 'AudioLibro',
  },
];

export { navLink, accountLinks, categories, format };
