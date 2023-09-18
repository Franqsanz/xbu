import { FiHome } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { LinkType, SelectBooksType } from '../components/types';

const navLink: Array<LinkType> = [
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

const accountLinks: Array<LinkType> = [
  {
    name: 'Ingresar',
    href: 'login',
  },
  {
    name: 'Crear cuenta',
    href: 'register',
  },
];

const languages: Array<SelectBooksType> = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Francés', label: 'Francés' },
  { value: 'Alemán', label: 'Alemán' },
  { value: 'Italiano', label: 'Italiano' },
  { value: 'Portugués', label: 'Portugués' },
  { value: 'Holandés', label: 'Holandés' },
  { value: 'Sueco', label: 'Sueco' },
  { value: 'Noruego', label: 'Noruego' },
  { value: 'Danés', label: 'Danés' },
  { value: 'Finés', label: 'Finés' },
  { value: 'Ruso', label: 'Ruso' },
  { value: 'Polaco', label: 'Polaco' },
  { value: 'Checo', label: 'Checo' },
  { value: 'Húngaro', label: 'Húngaro' },
  { value: 'Griego', label: 'Griego' },
  { value: 'Turco', label: 'Turco' },
  { value: 'Árabe', label: 'Árabe' },
  { value: 'Hebreo', label: 'Hebreo' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Chino (Mandarín)', label: 'Chino (Mandarín)' },
  { value: 'Japonés', label: 'Japonés' },
  { value: 'Coreano', label: 'Coreano' },
  { value: 'Vietnamita', label: 'Vietnamita' },
  { value: 'Tailandés', label: 'Tailandés' },
  { value: 'Malayo', label: 'Malayo' },
  { value: 'Indonesio', label: 'Indonesio' },
  { value: 'Tagalo', label: 'Tagalo' },
  { value: 'Swahili', label: 'Swahili' },
  { value: 'Amárico', label: 'Amárico' },
  { value: 'Bengalí', label: 'Bengalí' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Persa (Farsi)', label: 'Persa (Farsi)' },
  { value: 'Ucraniano', label: 'Ucraniano' },
  { value: 'Rumano', label: 'Rumano' },
  { value: 'Búlgaro', label: 'Búlgaro' },
  { value: 'Serbio', label: 'Serbio' },
  { value: 'Croata', label: 'Croata' },
  { value: 'Esloveno', label: 'Esloveno' },
  { value: 'Eslovaco', label: 'Eslovaco' },
  { value: 'Lituano', label: 'Lituano' },
  { value: 'Letón', label: 'Letón' },
  { value: 'Estonio', label: 'Estonio' },
  { value: 'Islandés', label: 'Islandés' },
];

const categories: Array<SelectBooksType> = [
  {
    value: 'Aventura',
    label: 'Aventura',
  },
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
    value: 'Ciencia',
    label: 'Ciencia',
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
    value: 'Cocina',
    label: 'Cocina',
  },
  {
    value: 'Bebidas',
    label: 'Bebidas',
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
  {
    value: 'No Ficción',
    label: 'No Ficción',
  },
  {
    value: 'Prehistoria',
    label: 'Prehistoria',
  },
  {
    value: 'Enciclopedias',
    label: 'Enciclopedias',
  },
  {
    value: 'Ficción Histórica',
    label: 'Ficción Histórica',
  },
  {
    value: 'Histórico',
    label: 'Histórico',
  },
  {
    value: 'Humor',
    label: 'Humor',
  },
  {
    value: 'Horror',
    label: 'Horror',
  },
];

const format: Array<SelectBooksType> = [
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

export { navLink, accountLinks, languages, categories, format };
