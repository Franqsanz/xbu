import React, { useState } from 'react';
import {
  RadioGroup,
  Radio,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Flex,
  Box,
  Button,
} from '@chakra-ui/react';

import { DrawerType } from '@components/types';
import { capitalizeWords } from '@utils/utils';
// import { FilterAccordion } from '@components/filters/FilterAccordion';

export function FilterDrawer({
  isOpen,
  onClose,
  handleLanguageChange,
  language,
  handleYearChange,
  year,
  authors,
  handleAuthorChange,
}: DrawerType) {
  const bgContentCheckbox = useColorModeValue('white', 'transparent');
  const bgDrawer = useColorModeValue('white', '#121212e4');
  const bgButtonApply = useColorModeValue('green.500', 'green.700');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  function handleRadioChange(type: string, value: string) {
    if (type === 'language') {
      setSelectedLanguage(value);
      return;
    }

    if (type === 'year') {
      setSelectedYear(value);
      return;
    }

    if (type === 'authors') {
      setSelectedAuthor(value);
    }
  }

  function handleAllRadioChange(type: string) {
    if (type === 'language') {
      setSelectedLanguage('');
      return;
    }

    if (type === 'year') {
      setSelectedYear('');
      return;
    }

    if (type === 'authors') {
      setSelectedAuthor('');
    }
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement='bottom' onClose={onClose}>
        <DrawerOverlay bg='#1212126e' />
        <DrawerContent
          m='0 auto'
          w='96%'
          maxH='450px'
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
            {/* <FilterAccordion
              selectedMinPages=''
              selectedMaxPages=''
              handleMinChange=''
              handleMaxChange=''
              selectedLanguage={selectedLanguage}
              handleLanguageChange={handleLanguageChange}
              languages=''
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              years=''
              selectedAuthor=''
              handleAuthorChange=''
              authors=''
            /> */}

            <Flex px='2' direction='column' mb='10'>
              <Box mb='4' borderBottom='1px'>
                Idioma
              </Box>
              <RadioGroup
                value={selectedLanguage}
                onChange={handleLanguageChange}
                colorScheme='green'
              >
                <Flex
                  mx='2'
                  bg={bgContentCheckbox}
                  rounded='lg'
                  direction='column-reverse'
                  gap='5'
                >
                  {Array.isArray(language) &&
                    language?.map(({ language, count }: any) => (
                      <Radio
                        key={language}
                        value={language}
                        onChange={() => handleRadioChange('language', language)}
                      >
                        {language}
                        <Box as='span' ml='2' color='gray.500'>
                          ({count})
                        </Box>
                      </Radio>
                    ))}
                  <Radio value='' onChange={() => handleAllRadioChange('language')}>
                    Todos
                  </Radio>
                </Flex>
              </RadioGroup>
              <Box mt='5' mb='4' borderBottom='1px'>
                Año
              </Box>
              <RadioGroup
                value={selectedYear}
                onChange={handleYearChange}
                colorScheme='green'
              >
                <Flex
                  mx='2'
                  bg={bgContentCheckbox}
                  rounded='lg'
                  direction='column-reverse'
                  gap='5'
                >
                  {Array.isArray(year) &&
                    year?.map(({ year, count }: any) => (
                      <Radio
                        key={year}
                        value={year}
                        onChange={() => handleRadioChange('year', year)}
                      >
                        {year}
                        <Box as='span' ml='2' color='gray.500'>
                          ({count})
                        </Box>
                      </Radio>
                    ))}
                  <Radio value='' onChange={() => handleAllRadioChange('year')}>
                    Todos
                  </Radio>
                </Flex>
              </RadioGroup>
              <Box mt='5' mb='4' borderBottom='1px'>
                Autor
              </Box>
              <RadioGroup
                value={selectedAuthor}
                onChange={handleAuthorChange}
                colorScheme='green'
              >
                <Flex
                  mx='2'
                  bg={bgContentCheckbox}
                  rounded='lg'
                  direction='column-reverse'
                  gap='5'
                >
                  {Array.isArray(authors) &&
                    authors?.map(({ authors, count }: any) => (
                      <Radio
                        key={authors}
                        value={authors}
                        onChange={() => handleRadioChange('authors', authors)}
                      >
                        {capitalizeWords(authors)}
                        <Box as='span' ml='2' color='gray.500'>
                          ({count})
                        </Box>
                      </Radio>
                    ))}
                  <Radio value='' onChange={() => handleAllRadioChange('authors')}>
                    Todos
                  </Radio>
                </Flex>
              </RadioGroup>
            </Flex>
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
              Mostrar Resultados
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
