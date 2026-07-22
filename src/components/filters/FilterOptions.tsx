import React from 'react';

import { FilterNumberPages } from '@components/filters/FilterNumberPages';
import { FilterCheckboxGroup } from '@components/filters/FilterCheckboxGroup';
import { FilterSearchableRadio } from '@components/filters/FilterSearchableRadio';
import { FilterSort, SortValue } from '@components/filters/FilterSort';
import { capitalizeWords } from '@utils/utils';

interface FilterAccordionTypes {
  selectedMinPages: string;
  selectedMaxPages: string;
  handleMinChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMaxChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedLanguages: string[];
  toggleLanguage: (value: string) => void;
  languages: string[];
  selectedYears: string[];
  toggleYear: (value: string) => void;
  years: string[];
  selectedAuthor: string;
  handleAuthorChange: (value: string) => void;
  authors: string[];
  sortBy?: SortValue;
  onSortChange?: (value: SortValue) => void;
}

export function getAccordionItems({
  selectedMinPages,
  selectedMaxPages,
  handleMinChange,
  handleMaxChange,
  selectedLanguages,
  toggleLanguage,
  languages,
  selectedYears,
  toggleYear,
  years,
  selectedAuthor,
  handleAuthorChange,
  authors,
  sortBy,
  onSortChange,
}: FilterAccordionTypes) {
  const items: { title: string; content: React.ReactNode }[] = [];
  if (onSortChange) {
    items.push({
      title: 'Ordenar por',
      content: <FilterSort value={sortBy ?? ''} onChange={onSortChange} />,
    });
  }
  items.push(
    {
      title: 'N° de páginas',
      content: (
        <FilterNumberPages
          min={selectedMinPages}
          max={selectedMaxPages}
          setMin={handleMinChange}
          setMax={handleMaxChange}
        />
      ),
    },
    {
      title: 'Idioma',
      content: (
        <FilterCheckboxGroup
          options={languages.map(({ language, count }: any) => ({
            value: language,
            label: language,
            count,
          }))}
          selectedValues={selectedLanguages}
          onToggle={toggleLanguage}
        />
      ),
    },
    {
      title: 'Año',
      content: (
        <FilterCheckboxGroup
          options={years.map(({ year, count }: any) => ({
            value: String(year),
            label: String(year),
            count,
          }))}
          selectedValues={selectedYears}
          onToggle={toggleYear}
        />
      ),
    },
    {
      title: 'Autor',
      content: (
        <FilterSearchableRadio
          options={authors.map(({ authors, count }: any) => ({
            value: authors,
            label: capitalizeWords(authors),
            count,
          }))}
          selectedValue={selectedAuthor}
          onChange={handleAuthorChange}
          allLabel='Todos'
          placeholder='Buscar autor'
        />
      ),
    },
  );
  return items;
}
