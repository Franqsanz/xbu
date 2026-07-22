import React, { useState, useEffect, useRef } from 'react';
import {
  useParams,
  useLocation,
  useSearchParams,
  ScrollRestoration,
} from 'react-router-dom';
import { CgOptions } from 'react-icons/cg';
import { useInView } from 'react-intersection-observer';
import {
  Button,
  Flex,
  Icon,
  useDisclosure,
  Box,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Text,
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
import { FilterAccordion } from '@components/filters/FilterAccordion';
import { FilterChips } from '@components/filters/FilterChips';
import { FilterSort, SortValue } from '@components/filters/FilterSort';
import { MobileResultBar } from '@components/ui/MobileResultBar';
// import { AsideFilter } from '@components/filters/AsideFilter';

export default function FilteredData() {
  const { ref, inView } = useInView();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [languages, setLanguages] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedMinPages, setSelectedMinPages] = useState('');
  const [selectedMaxPages, setSelectedMaxPages] = useState('');
  const [sortBy, setSortBy] = useState<SortValue>('');
  const isInitializedFromUrlRef = useRef(false);
  const { query, param } = useParams();
  let asideFilter;
  let aboutCategoriesUI;
  let buttonFilter;
  let fetchingNextPageUI;
  // Verificar si los radios estan activos o no.
  const isFiltering =
    selectedLanguages.length > 0 ||
    selectedYears.length > 0 ||
    !!selectedAuthor ||
    (selectedMinPages && selectedMaxPages) || // Solo cuando ambos están definidos
    !!selectedMinPages ||
    !!selectedMaxPages ||
    !!sortBy;
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

  const { data: dataFilter, isPending: isPendingFilter } = useFilter(query, param);

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

  // Leer los filtros desde la URL cuando cambia la ruta. Esto permite que
  // el link sea compartible y que el refresh no pierda el estado.
  useEffect(() => {
    const langs = searchParams.get('langs');
    const yrs = searchParams.get('years');
    const author = searchParams.get('author');
    const minP = searchParams.get('minPages');
    const maxP = searchParams.get('maxPages');
    const sort = searchParams.get('sort');
    setSelectedLanguages(langs ? langs.split(',') : []);
    setSelectedYears(yrs ? yrs.split(',') : []);
    setSelectedAuthor(author ?? '');
    setSelectedMinPages(minP ?? '');
    setSelectedMaxPages(maxP ?? '');
    setSortBy((sort ?? '') as SortValue);
    isInitializedFromUrlRef.current = true;
    // La ruta cambia -> re-inicializamos desde los searchParams del nuevo path.
  }, [location.pathname]);

  // Sincronizar el estado a la URL. Solo escribimos después del primer
  // effect que inicializa desde la URL, para no pisar los params originales.
  useEffect(() => {
    if (!isInitializedFromUrlRef.current) return;
    const next = new URLSearchParams();
    if (selectedLanguages.length) next.set('langs', selectedLanguages.join(','));
    if (selectedYears.length) next.set('years', selectedYears.join(','));
    if (selectedAuthor) next.set('author', selectedAuthor);
    if (selectedMinPages) next.set('minPages', selectedMinPages);
    if (selectedMaxPages) next.set('maxPages', selectedMaxPages);
    if (sortBy) next.set('sort', sortBy);
    const current = searchParams.toString();
    const target = next.toString();
    if (current !== target) {
      setSearchParams(next, { replace: true });
    }
  }, [
    selectedLanguages,
    selectedYears,
    selectedAuthor,
    selectedMinPages,
    selectedMaxPages,
    sortBy,
    searchParams,
    setSearchParams,
  ]);

  function sortResults<
    T extends { title?: string; year?: number; numberPages?: number },
  >(items: T[]): T[] {
    if (!sortBy) return items;
    const copy = [...items];
    switch (sortBy) {
      case 'title-asc':
        return copy.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
      case 'title-desc':
        return copy.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
      case 'year-desc':
        return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case 'year-asc':
        return copy.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
      case 'pages-desc':
        return copy.sort((a, b) => (b.numberPages ?? 0) - (a.numberPages ?? 0));
      case 'pages-asc':
        return copy.sort((a, b) => (a.numberPages ?? 0) - (b.numberPages ?? 0));
      default:
        return copy;
    }
  }

  // Filtrar por número de páginas
  function pagesMatch(numberPages) {
    const minPages = selectedMinPages ? Number(selectedMinPages) : null;
    const maxPages = selectedMaxPages ? Number(selectedMaxPages) : null;

    if (minPages !== null && maxPages !== null) {
      return numberPages >= minPages && numberPages <= maxPages;
    }

    if (minPages !== null) {
      return numberPages >= minPages;
    }

    if (maxPages !== null) {
      return numberPages <= maxPages;
    }

    return true;
  }

  // Esta función ejecuta la petición de paginación por defecto
  // y si se aplican los filtros ejecuta la petición "dataFilter".
  function getNormalizedResults() {
    if (isFiltering) {
      return (
        dataFilter?.results?.filter(({ language, year, authors, numberPages }) => {
          // Filtrar por idioma (multi-select: OR entre valores)
          const languageMatch =
            selectedLanguages.length === 0 || selectedLanguages.includes(language);

          // Filtrar por año (multi-select: OR entre valores)
          const yearMatch =
            selectedYears.length === 0 || selectedYears.includes(String(year));

          // Filtrar por autor
          const authorMatch = selectedAuthor
            ? authors[0].toLowerCase() === selectedAuthor
            : true;

          // Devuelve el resultado solo si cumple con todos los filtros
          return (
            languageMatch && yearMatch && authorMatch && pagesMatch(numberPages)
          );
        }) || []
      );
    }
    // Combina todos los resultados de las páginas
    return dataPaginated?.pages.flatMap((page) => page?.results) || [];
  }

  const results = sortResults(getNormalizedResults());

  function toggleLanguage(language: string) {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language],
    );
  }

  function toggleYear(year: string) {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
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

  function handleClearAll() {
    setSelectedLanguages([]);
    setSelectedYears([]);
    setSelectedAuthor('');
    setSelectedMinPages('');
    setSelectedMaxPages('');
    setSortBy('');
  }

  function handleRemovePages() {
    setSelectedMinPages('');
    setSelectedMaxPages('');
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
          overflowY='auto'
          pr='2'
          // p='0 1.25rem 0 0.90rem'
          // border='1px'
          // boxShadow='xl'
          // rounded='xl'
          // borderColor='gray.200'
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
          {isPendingFilter ? (
            <Box m='auto'>
              <Spinner thickness='2px' speed='0.40s' />
            </Box>
          ) : (
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
              onSortChange={setSortBy}
            />
          )}
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
      <MainHead title={`${param} | XBuReads`} />
      <ContainerTitle title={`${param}`} />
      <MySliderCategories />
      <MobileResultBar data={dataPaginated}>{buttonFilter}</MobileResultBar>
      <Box display={{ base: 'block', xl: 'none' }} px={{ base: 5, md: 10 }} pt='3'>
        <FilterChips
          selectedLanguages={selectedLanguages}
          selectedYears={selectedYears}
          selectedAuthor={selectedAuthor}
          selectedMinPages={selectedMinPages}
          selectedMaxPages={selectedMaxPages}
          onRemoveLanguage={toggleLanguage}
          onRemoveYear={toggleYear}
          onRemoveAuthor={() => setSelectedAuthor('')}
          onRemovePages={handleRemovePages}
          onClearAll={handleClearAll}
        />
      </Box>
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        languages={languages}
        years={years}
        authors={authors}
        selectedLanguages={selectedLanguages}
        selectedYears={selectedYears}
        selectedAuthor={selectedAuthor}
        toggleLanguage={toggleLanguage}
        toggleYear={toggleYear}
        handleAuthorChange={handleAuthorChange}
        selectedMinPages={selectedMinPages}
        selectedMaxPages={selectedMaxPages}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultsCount={
          isFiltering
            ? results.length
            : (dataPaginated?.pages[0]?.info?.totalBooks ?? results.length)
        }
      />
      {isPendingPaginated ? (
        <SkeletonAllBooks showTags={false} />
      ) : (
        <>
          <MyContainer>
            <Aside>
              <ResultLength data={dataPaginated?.pages[0].info.totalBooks} />
              <FilterChips
                selectedLanguages={selectedLanguages}
                selectedYears={selectedYears}
                selectedAuthor={selectedAuthor}
                selectedMinPages={selectedMinPages}
                selectedMaxPages={selectedMaxPages}
                onRemoveLanguage={toggleLanguage}
                onRemoveYear={toggleYear}
                onRemoveAuthor={() => setSelectedAuthor('')}
                onRemovePages={handleRemovePages}
                onClearAll={handleClearAll}
              />
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
