import React from 'react';
import {
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';

import { FilterAccordion } from '@components/filters/FilterAccordion';
import { SortValue } from '@components/filters/FilterSort';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  languages: string[];
  years: string[];
  authors: string[];
  selectedLanguages: string[];
  selectedYears: string[];
  selectedAuthor: string;
  toggleLanguage: (value: string) => void;
  toggleYear: (value: string) => void;
  handleAuthorChange: (value: string) => void;
  selectedMinPages: string;
  selectedMaxPages: string;
  handleMinChange: React.ChangeEventHandler<HTMLInputElement>;
  handleMaxChange: React.ChangeEventHandler<HTMLInputElement>;
  sortBy: SortValue;
  onSortChange: (value: SortValue) => void;
  resultsCount: number;
};

export function FilterDrawer({
  isOpen,
  onClose,
  languages,
  years,
  authors,
  selectedLanguages,
  selectedYears,
  selectedAuthor,
  toggleLanguage,
  toggleYear,
  handleAuthorChange,
  selectedMinPages,
  selectedMaxPages,
  handleMinChange,
  handleMaxChange,
  sortBy,
  onSortChange,
  resultsCount,
}: Props) {
  const bgDrawer = useColorModeValue('white', '#121212e4');
  const bgButtonApply = useColorModeValue('green.500', 'green.700');

  return (
    <Drawer isOpen={isOpen} placement='bottom' onClose={onClose}>
      <DrawerOverlay bg='#1212126e' />
      <DrawerContent
        m='0 auto'
        w='96%'
        maxH='80vh'
        bg={bgDrawer}
        backdropFilter='auto'
        backdropBlur='12px'
        roundedTop='3xl'
        border='1px solid #A0AEC0'
        borderBottom='0'
      >
        <DrawerHeader>Filtrar por:</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <FilterAccordion
            selectedMinPages={selectedMinPages}
            selectedMaxPages={selectedMaxPages}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            selectedLanguages={selectedLanguages}
            toggleLanguage={toggleLanguage}
            languages={languages}
            selectedYears={selectedYears}
            toggleYear={toggleYear}
            years={years}
            selectedAuthor={selectedAuthor}
            handleAuthorChange={handleAuthorChange}
            authors={authors}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </DrawerBody>
        <DrawerFooter justifyContent='center' borderTopWidth='1px'>
          <Button
            w='full'
            onClick={onClose}
            bg={bgButtonApply}
            border='1px'
            size='lg'
            fontWeight='light'
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
          >
            {resultsCount === 0
              ? 'Sin resultados'
              : resultsCount === 1
                ? 'Mostrar 1 resultado'
                : `Mostrar ${resultsCount} resultados`}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
