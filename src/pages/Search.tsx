import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CgOptions } from 'react-icons/cg';
import {
  Button,
  Flex,
  Icon,
  useDisclosure,
  Box,
  Radio,
  RadioGroup,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

import { Card } from '@components/cards/Card';
import { CardType, LanguageAndYearType } from '@components/types';
import { useFilter } from '@hooks/querys';
import { ContainerTitle } from '@components/ContainerTitle';
import { MySimpleGrid } from '@components/MySimpleGrid';
import { MainHead } from '@components/Head';
import { Aside } from '@components/Aside';
import { MySliderCategories } from '@components/MySliderCategories';
import { FilterDrawer } from '@components/FilterDrawer';
import { ResultLength } from '@components/ResultLength';
import { AboutCategories } from '@components/AboutCategories';
import { Lost } from '@assets/assets';
import { aboutCategories } from '../data/links';

export default function Search() {
  const location = useLocation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  const { query, param } = useParams();
  let asideFilter;
  let aboutCategoriesUI;
  let buttonFilter;

  const { data } = useFilter(query, param);

  function getLanguagesAndYears(
    data: Array<CardType>,
  ): LanguageAndYearType | null {
    const languagesMap = data.reduce((acc, book) => {
      const language = book.language;

      if (language) {
        acc[language] = (acc[language] || 0) + 1;
      }

      return acc;
    }, {});

    const yearsMap = data.reduce((acc, book) => {
      const year = book.year;

      if (year) {
        acc[year] = (acc[year] || 0) + 1;
      }

      return acc;
    }, {});

    const language = Object.keys(languagesMap);
    const year = Object.keys(yearsMap);

    if (language.length === 1 && year.length === 1) return null;

    return { language, languagesMap, year, yearsMap };
  }

  const languagesAndYearData = getLanguagesAndYears(data);

  const filteredBooks = data.filter(({ language, year }) => {
    return (
      (languages.length === 0 || languages.includes(language)) &&
      (years.length === 0 || years.includes(year))
    );
  });

  function handleLanguageChange(languages) {
    setLanguages(languages);
    setSelectedLanguage(languages);
  }

  function handleYearChange(year) {
    setYears(year);
    setSelectedYear(year);
  }

  // Restablecer los valores de los radios(filtros) cuando cambie la ruta
  useEffect(() => {
    setSelectedLanguage('');
    setLanguages([]);
    setSelectedYear('');
    setYears([]);
  }, [location.pathname]);

  if (languagesAndYearData) {
    const { language, languagesMap, year, yearsMap } = languagesAndYearData;

    asideFilter = (
      <Flex
        display={{ base: 'none', md: 'flex' }}
        direction='column'
        mt='10'
        pb='10'
      >
        <Flex align='center' py='2' mb='2' fontSize='xl' fontWeight='bold'>
          <Icon as={CgOptions} boxSize='20px' mr='2' />
          Filtrar por:
        </Flex>
        <RadioGroup
          value={selectedLanguage}
          onChange={handleLanguageChange}
          colorScheme='green'
        >
          <Flex direction='column-reverse' gap='3'>
            {language &&
              language.map((language) => (
                <Radio key={language} value={language}>
                  {language}
                  <Box as='span' ml='2' color='gray.500'>
                    ({languagesMap && languagesMap[language]})
                  </Box>
                </Radio>
              ))}
            <Radio value=''>Todos los Idiomas</Radio>
            <Box mb='2' borderBottom='1px'>
              Idioma
            </Box>
          </Flex>
        </RadioGroup>
        <RadioGroup
          value={selectedYear}
          onChange={handleYearChange}
          colorScheme='green'
        >
          <Flex direction='column-reverse' gap='3'>
            {year &&
              year.map((year) => (
                <Radio key={year} value={year}>
                  {year}
                  <Box as='span' ml='2' color='gray.500'>
                    ({yearsMap && yearsMap[year]})
                  </Box>
                </Radio>
              ))}
            <Radio value=''>Todos los Años</Radio>
            <Box mt='4' mb='2' borderBottom='1px'>
              Año
            </Box>
          </Flex>
        </RadioGroup>
      </Flex>
    );

    buttonFilter = (
      <Button
        display={{ base: 'flex', xl: 'none' }}
        onClick={onToggle}
        fontWeight='500'
        size='sm'
      >
        <Icon as={CgOptions} boxSize='4' mr='2' />
        Filtrar
      </Button>
    );
  }

  // Verifica si los 3 campos de aboutCategories esten con info o no
  const categoryCheck = aboutCategories.find((item) => {
    return item.category === param;
  });

  if (categoryCheck) {
    const isValid = categoryCheck.category && categoryCheck.description;

    if (isValid) {
      aboutCategoriesUI = <AboutCategories category={param} />;
    } else {
      aboutCategoriesUI = null;
    }
  }

  return (
    <>
      <MainHead title={`${param} | XBuniverse`} />
      <ContainerTitle title={`${param}`} />
      <MySliderCategories />
      <Flex
        display={{ base: 'flex', xl: 'none' }}
        mt='4'
        pt='3'
        pb='3'
        px={{ base: '7', md: '20', sm: '10' }}
        justify={{ base: 'space-around', sm: 'space-between' }}
        align='stretch'
        borderY={`1px solid ${grayColor}`}
      >
        <ResultLength data={data.length} />
        {buttonFilter}
      </Flex>
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        language={languagesAndYearData?.language}
        languagesMap={languagesAndYearData?.languagesMap}
        year={languagesAndYearData?.year}
        yearsMap={languagesAndYearData?.yearsMap}
        handleLanguageChange={handleLanguageChange}
        handleYearChange={handleYearChange}
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW='1700px'
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data.length} />
          {aboutCategoriesUI}
          {asideFilter}
        </Aside>
        {filteredBooks.length > 0 ? (
          <MySimpleGrid>
            {filteredBooks.map(
              ({
                id,
                title,
                synopsis,
                authors,
                category,
                language,
                sourceLink,
                image,
                pathUrl,
              }: CardType) => (
                <React.Fragment key={id}>
                  <Card
                    id={id}
                    category={category}
                    language={language}
                    title={title}
                    authors={authors}
                    synopsis={synopsis}
                    sourceLink={sourceLink}
                    pathUrl={pathUrl}
                    image={image}
                  />
                </React.Fragment>
              ),
            )}
          </MySimpleGrid>
        ) : (
          <Flex
            w='full'
            h={{ base: '50vh', md: 'auto' }}
            justify='center'
            align='center'
            direction='column'
          >
            <Box fontSize={{ base: '2xl', lg: '5xl' }} mt='10'>
              ¡Ups!
            </Box>
            <Image
              src={Lost}
              maxW='full'
              w={{ base: '200px', md: '400px' }}
              mt='5'
              decoding='async'
            />
            <Box
              mt='7'
              mb='10'
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              No se encontraron libros que cumplan con los filtros seleccionados
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
}
