import React from 'react';

import { FilterNumberPages } from '@components/filters/FilterNumberPages';
import { FilterRadioGroup } from '@components/filters/FilterRadioGroup';
import { capitalizeWords } from '@utils/utils';

interface FilterAccordionTypes {
  selectedMinPages: string;
  selectedMaxPages: string;
  handleMinChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMaxChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedLanguage: string;
  handleLanguageChange: (value: string) => void;
  languages: string[];
  selectedYear: string;
  handleYearChange: (value: string) => void;
  years: string[];
  selectedAuthor: string;
  handleAuthorChange: (value: string) => void;
  authors: string[];
}

export function getAccordionItems({
  selectedMinPages,
  selectedMaxPages,
  handleMinChange,
  handleMaxChange,
  selectedLanguage,
  handleLanguageChange,
  languages,
  selectedYear,
  handleYearChange,
  years,
  selectedAuthor,
  handleAuthorChange,
  authors,
}: FilterAccordionTypes) {
  return [
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
        <FilterRadioGroup
          options={languages.map(({ language, count }: any) => ({
            value: language,
            label: language,
            count,
          }))}
          selectedValue={selectedLanguage}
          onChange={handleLanguageChange}
          allLabel='Todos'
        />
      ),
    },
    {
      title: 'Año',
      content: (
        <FilterRadioGroup
          options={years.map(({ year, count }: any) => ({
            value: String(year),
            label: String(year),
            count,
          }))}
          selectedValue={selectedYear}
          onChange={handleYearChange}
          allLabel='Todos'
        />
      ),
    },
    {
      title: 'Autor',
      content: (
        <FilterRadioGroup
          options={authors.map(({ authors, count }: any) => ({
            value: authors,
            label: capitalizeWords(authors),
            count,
          }))}
          selectedValue={selectedAuthor}
          onChange={handleAuthorChange}
          allLabel='Todos'
        />
      ),
    },
  ];
}
