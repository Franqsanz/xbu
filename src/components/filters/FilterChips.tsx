import React from 'react';
import { Button, Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { capitalizeWords } from '@utils/utils';

type FilterChipsProps = {
  selectedLanguages: string[];
  selectedYears: string[];
  selectedAuthor: string;
  selectedMinPages: string;
  selectedMaxPages: string;
  onRemoveLanguage: (value: string) => void;
  onRemoveYear: (value: string) => void;
  onRemoveAuthor: () => void;
  onRemovePages: () => void;
  onClearAll: () => void;
};

export function FilterChips({
  selectedLanguages,
  selectedYears,
  selectedAuthor,
  selectedMinPages,
  selectedMaxPages,
  onRemoveLanguage,
  onRemoveYear,
  onRemoveAuthor,
  onRemovePages,
  onClearAll,
}: FilterChipsProps) {
  const hasPages = !!selectedMinPages || !!selectedMaxPages;
  const active =
    selectedLanguages.length > 0 ||
    selectedYears.length > 0 ||
    !!selectedAuthor ||
    hasPages;
  if (!active) return null;

  const pagesLabel = `${selectedMinPages || '0'} – ${selectedMaxPages || '∞'} pág.`;

  return (
    <Flex wrap='wrap' gap='2' mt='4' mb='4' align='center'>
      {selectedLanguages.map((lang) => (
        <Tag
          key={`lang-${lang}`}
          size='md'
          bg='green.50'
          color='green.900'
          borderRadius='full'
        >
          <TagLabel>{lang}</TagLabel>
          <TagCloseButton onClick={() => onRemoveLanguage(lang)} />
        </Tag>
      ))}
      {selectedYears.map((year) => (
        <Tag
          key={`year-${year}`}
          size='md'
          bg='green.50'
          color='green.900'
          borderRadius='full'
        >
          <TagLabel>{year}</TagLabel>
          <TagCloseButton onClick={() => onRemoveYear(year)} />
        </Tag>
      ))}
      {selectedAuthor && (
        <Tag size='md' bg='green.50' color='green.900' borderRadius='full'>
          <TagLabel>{capitalizeWords(selectedAuthor)}</TagLabel>
          <TagCloseButton onClick={onRemoveAuthor} />
        </Tag>
      )}
      {hasPages && (
        <Tag size='md' bg='green.50' color='green.900' borderRadius='full'>
          <TagLabel>{pagesLabel}</TagLabel>
          <TagCloseButton onClick={onRemovePages} />
        </Tag>
      )}
      <Button size='xs' fontWeight='500' onClick={onClearAll}>
        Limpiar todo
      </Button>
    </Flex>
  );
}
