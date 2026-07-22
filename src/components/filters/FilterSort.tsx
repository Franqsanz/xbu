import React from 'react';
import { Select } from '@chakra-ui/react';

export type SortValue =
  | ''
  | 'title-asc'
  | 'title-desc'
  | 'year-desc'
  | 'year-asc'
  | 'pages-desc'
  | 'pages-asc';

type Props = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export function FilterSort({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortValue)}
      size='sm'
      w={{ base: 'full', md: 'auto' }}
      maxW={{ base: 'full', md: '220px' }}
      fontSize='sm'
      borderRadius='md'
    >
      <option value=''>Elegir una opción</option>
      <option value='title-asc'>Título (A-Z)</option>
      <option value='title-desc'>Título (Z-A)</option>
      <option value='year-desc'>Año (más nuevo)</option>
      <option value='year-asc'>Año (más antiguo)</option>
      <option value='pages-desc'>Más páginas</option>
      <option value='pages-asc'>Menos páginas</option>
    </Select>
  );
}
