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
} from '@chakra-ui/react';

import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { useFilter, useFilterPaginated } from '@hooks/queries';
// import { useScrollRestoration } from '@hooks/useScrollRestoration';
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
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';

export default function Search() {
  const { ref, inView } = useInView();
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
  let fetchingNextPageUI;
  const isFiltering = !!selectedLanguage || !!selectedYear; // Verificar si los radios estan activos o no.
  const hasMultipleLanguages = languages.length > 1;
  const hasMultipleYears = years.length > 1;

  const {
    data: dataPaginated,
    isPending: isPendingPaginated,
    error: errorPaginated,
    fetchNextPage,
    isFetchingNextPage,
  } = useFilterPaginated(query, param);

  const { data: dataFilter } = useFilter(query, param);

  // Esta función ejecuta la petición de paginación por defecto
  // y si se aplican los filtros ejecuta la petición "dataFilter".
  function getNormalizedResults() {
    if (isFiltering) {
      return (
        dataFilter?.results?.filter(({ language, year }) => {
          // Filtrar por idioma
          const languageMatch = selectedLanguage
            ? language === selectedLanguage
            : true;

          // Filtrar por año
          const yearMatch = selectedYear ? String(year) === selectedYear : true;

          return languageMatch && yearMatch;
        }) || []
      );
    }
    // Combina todos los resultados de las páginas
    return dataPaginated?.pages.flatMap((page) => page?.results) || [];
  }

  const results = getNormalizedResults();
  // useScrollRestoration(isPendingPaginated); // Restablece la posición del scroll al volver de la vista del libro

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

      setLanguages(Array.isArray(languageCounts) ? languageCounts : []);
      setYears(Array.isArray(yearCounts) ? yearCounts : []);
    }
  }, [dataFilter]);

  function handleLanguageChange(languages: string) {
    setSelectedLanguage(languages);
  }

  function handleYearChange(year: string) {
    setSelectedYear(year);
  }

  // Restablecer los valores de los radios(filtros) cuando cambie la ruta
  useEffect(() => {
    setSelectedLanguage('');
    setSelectedYear('');
  }, [location.pathname]);

  if (hasMultipleLanguages || hasMultipleYears) {
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
          <Box mb='4' borderBottom='1px'>
            Idioma
          </Box>
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
        <RadioGroup
          value={selectedYear}
          onChange={handleYearChange}
          colorScheme='green'
        >
          <Box my='4' borderBottom='1px'>
            Año
          </Box>
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

  if (isPendingPaginated) {
    return <SkeletonAllBooks showTags={true} />;
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
        <Spinner
          size={{ base: 'lg', md: 'xl' }}
          thickness='4px'
          speed='0.40s'
        />
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
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '1260px', '2xl': '1560px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
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
            <Box
              fontSize={{ base: '2xl', lg: '5xl' }}
              mt={{ base: 10, lg: 24 }}
            >
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
      {!isFiltering && <Box ref={ref}>{fetchingNextPageUI}</Box>}
    </>
  );
}
