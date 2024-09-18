import React, { useState, useEffect } from 'react';
import { useParams, useLocation, ScrollRestoration } from 'react-router-dom';
import { CgOptions } from 'react-icons/cg';
import { useInView } from 'react-intersection-observer';
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
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';

import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { useFilter, useFilterPaginated } from '@hooks/queries';
import { useScrollYRestoration } from '@hooks/useScrollYRestoration';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { MainHead } from '@components/layout/Head';
import { Aside } from '@components/aside/Aside';
import { MySliderCategories } from '@components/ui/MySliderCategories';
import { FilterDrawer } from '@components/filters/FilterDrawer';
import { ResultLength } from '@components/aside/ResultLength';
import { AboutCategories } from '@components/aside/AboutCategories';
import { Lost } from '@assets/assets';
import { aboutCategories } from '../constant/constants';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { MyContainer } from '@components/ui/MyContainer';
import { FilterNumberPages } from '@components/filters/FilterNumberPages';
import { capitalizeWords } from '@utils/utils';

export default function FilteredData() {
  const { ref, inView } = useInView();
  const location = useLocation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');
  const [languages, setLanguages] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedMinPages, setSelectedMinPages] = useState('');
  const [selectedMaxPages, setSelectedMaxPages] = useState('');
  const { query, param } = useParams();
  let asideFilter;
  let aboutCategoriesUI;
  let buttonFilter;
  let fetchingNextPageUI;
  // Verificar si los radios estan activos o no.
  const isFiltering =
    !!selectedLanguage ||
    !!selectedYear ||
    !!selectedAuthor ||
    (selectedMinPages && selectedMaxPages) || // Solo cuando ambos están definidos
    !!selectedMinPages ||
    !!selectedMaxPages;
  const hasMultipleLanguages = languages.length > 1;
  const hasMultipleYears = years.length > 1;
  const hasMultipleAuthors = authors.length > 1;

  const {
    data: dataPaginated,
    isPending: isPendingPaginated,
    error: errorPaginated,
    fetchNextPage,
    isFetchingNextPage,
  } = useFilterPaginated(query, param);

  const { data: dataFilter } = useFilter(query, param);

  useScrollYRestoration(isPendingPaginated); // Restablece la posición del scroll al volver de la vista del libro

  useEffect(() => {
    let isMounted = true;

    if (inView && isMounted && !isPendingPaginated) {
      fetchNextPage();
    }

    return () => {
      isMounted = false;
    };
  }, [inView, fetchNextPage, isPendingPaginated]);

  useEffect(() => {
    if (dataFilter) {
      const languageCounts = dataFilter?.languageCounts || [];
      const yearCounts = dataFilter?.yearCounts || [];
      const authorsCounts = dataFilter?.authorsCounts || [];

      setLanguages(Array.isArray(languageCounts) ? languageCounts : []);
      setYears(Array.isArray(yearCounts) ? yearCounts : []);
      setAuthors(Array.isArray(authorsCounts) ? authorsCounts : []);
    }
  }, [dataFilter]);

  // Restablecer los valores de los radios(filtros) cuando cambie la ruta
  useEffect(() => {
    setSelectedLanguage('');
    setSelectedYear('');
    setSelectedAuthor('');
    setSelectedMinPages('');
    setSelectedMaxPages('');
  }, [location.pathname]);

  // Esta función ejecuta la petición de paginación por defecto
  // y si se aplican los filtros ejecuta la petición "dataFilter".
  function getNormalizedResults() {
    if (isFiltering) {
      return (
        dataFilter?.results?.filter(({ language, year, authors, numberPages }) => {
          // Filtrar por idioma
          const languageMatch = selectedLanguage
            ? language === selectedLanguage
            : true;

          // Filtrar por año
          const yearMatch = selectedYear ? String(year) === selectedYear : true;

          // Filtrar por autor
          const authorMatch = selectedAuthor
            ? authors[0].toLowerCase() === selectedAuthor
            : true;

          // Filtrar por número de páginas
          const minPages = selectedMinPages ? Number(selectedMinPages) : null;
          const maxPages = selectedMaxPages ? Number(selectedMaxPages) : null;

          let pagesMatch = true;

          if (minPages !== null && maxPages !== null) {
            pagesMatch = numberPages >= minPages && numberPages <= maxPages;
          } else if (minPages !== null) {
            pagesMatch = numberPages >= minPages;
          } else if (maxPages !== null) {
            pagesMatch = numberPages <= maxPages;
          }

          // Devuelve el resultado solo si cumple con todos los filtros
          return languageMatch && yearMatch && authorMatch && pagesMatch;
        }) || []
      );
    }
    // Combina todos los resultados de las páginas
    return dataPaginated?.pages.flatMap((page) => page?.results) || [];
  }

  const results = getNormalizedResults();

  function handleLanguageChange(languages: string) {
    setSelectedLanguage(languages);
  }

  function handleYearChange(year: string) {
    setSelectedYear(year);
  }

  function handleAuthorChange(author: string) {
    setSelectedAuthor(author);
  }

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedMinPages(e.target.value);
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedMaxPages(e.target.value);
  }

  if (hasMultipleLanguages || hasMultipleYears || hasMultipleAuthors) {
    asideFilter = (
      <Flex
        display={{ base: 'none', md: 'flex' }}
        direction='column'
        mt='10'
        pb='10'
        position='sticky'
        top='16'
      >
        <Flex align='center' py='2' mb='2' fontSize='xl' fontWeight='bold'>
          <Icon as={CgOptions} boxSize='20px' mr='2' />
          Filtrar por:
        </Flex>
        <Flex
          display={{ base: 'none', md: 'flex' }}
          direction='column'
          h='450px'
          overflowY='scroll'
          pr='2'
          sx={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#a2aab3',
              borderRadius: '30px',
            },
          }}
        >
          <Accordion allowToggle mb='2'>
            <AccordionItem border='none'>
              <h2>
                <AccordionButton px='1' borderRadius='md'>
                  <Box as='span' pl='1' flex='1' textAlign='left'>
                    N° de páginas
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='3' p='3'>
                <FilterNumberPages
                  min={selectedMinPages}
                  max={selectedMaxPages}
                  setMin={handleMinChange}
                  setMax={handleMaxChange}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border='none'>
              <h2>
                <AccordionButton px='1' borderRadius='md'>
                  <Box as='span' pl='1' flex='1' textAlign='left'>
                    Idioma
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='3' p='3'>
                <RadioGroup
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  colorScheme='green'
                >
                  <Flex direction='column' gap='3'>
                    <Radio value=''>Todos los Idiomas</Radio>
                    {Array.isArray(languages) &&
                      languages.map(({ language, count }: any) => (
                        <Radio key={language} value={language}>
                          {language}
                          <Box as='span' ml='2' color='gray.500'>
                            ({count})
                          </Box>
                        </Radio>
                      ))}
                  </Flex>
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border='none'>
              <h2>
                <AccordionButton px='1' borderRadius='md'>
                  <Box as='span' pl='1' flex='1' textAlign='left'>
                    Año
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='3' p='3'>
                <RadioGroup
                  value={selectedYear}
                  onChange={handleYearChange}
                  colorScheme='green'
                >
                  <Flex direction='column' gap='3'>
                    <Radio value=''>Todos los Años</Radio>
                    {Array.isArray(years) &&
                      years.map(({ year, count }: any) => (
                        <Radio key={year} value={String(year)}>
                          {year}
                          <Box as='span' ml='2' color='gray.500'>
                            ({count})
                          </Box>
                        </Radio>
                      ))}
                  </Flex>
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border='none'>
              <h2>
                <AccordionButton px='1' borderRadius='md'>
                  <Box as='span' pl='1' flex='1' textAlign='left'>
                    Autor
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='3' p='3'>
                <RadioGroup
                  value={selectedAuthor}
                  onChange={handleAuthorChange}
                  colorScheme='green'
                >
                  <Flex direction='column' gap='3'>
                    <Radio value=''>Todos los Autores</Radio>
                    {Array.isArray(authors) &&
                      authors.map(({ authors, count }: any) => (
                        <Radio key={authors} value={authors}>
                          {capitalizeWords(authors)}
                          <Box as='span' ml='2' color='gray.500'>
                            ({count})
                          </Box>
                        </Radio>
                      ))}
                  </Flex>
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
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

  if (errorPaginated) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        minH='70vh'
      >
        <AlertIcon boxSize='50px' />
        <AlertTitle mt='5' fontSize='xl'>
          No se pudieron obtener los datos
        </AlertTitle>
      </Alert>
    );
  }

  if (isFetchingNextPage) {
    fetchingNextPageUI = (
      <Box p='10' textAlign='center'>
        <Spinner size={{ base: 'lg', md: 'xl' }} thickness='4px' speed='0.40s' />
      </Box>
    );
  }

  return (
    <>
      <ScrollRestoration />
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
        <ResultLength data={dataPaginated?.pages[0].info.totalBooks} />
        {buttonFilter}
      </Flex>
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        language={languages}
        year={years}
        handleLanguageChange={handleLanguageChange}
        handleYearChange={handleYearChange}
      />
      {isPendingPaginated ? (
        <SkeletonAllBooks showTags={false} />
      ) : (
        <>
          <MyContainer>
            <Aside>
              <ResultLength data={dataPaginated?.pages[0].info.totalBooks} />
              {aboutCategoriesUI}
              {asideFilter}
            </Aside>
            {results.length > 0 ? (
              <MySimpleGrid>
                {results.map(
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
                align='center'
                direction='column'
              >
                <Box fontSize={{ base: '2xl', lg: '5xl' }} mt={{ base: 10, lg: 24 }}>
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
          </MyContainer>
        </>
      )}
      {!isFiltering && <Box ref={ref}>{fetchingNextPageUI}</Box>}
    </>
  );
}
