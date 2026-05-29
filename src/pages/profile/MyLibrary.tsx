import React, { useEffect } from 'react';
import { NavLink, ScrollRestoration } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { MdOutlineExplore } from 'react-icons/md';

import { useBooksByStatus } from '@hooks/queries';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { MyContainer } from '@components/ui/MyContainer';
import { Aside } from '@components/aside/Aside';
import { ResultLength } from '@components/aside/ResultLength';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { emptyFavorites } from '@assets/assets';

type BookStatus = 'reading' | 'read' | 'want_to_read';

const TABS: { key: BookStatus; label: string; emptyText: string }[] = [
  {
    key: 'reading',
    label: 'Leyendo',
    emptyText: 'No tenés libros marcados como "Leyendo".',
  },
  {
    key: 'read',
    label: 'Leídos',
    emptyText: 'Aún no marcaste ningún libro como leído.',
  },
  {
    key: 'want_to_read',
    label: 'Quiero leer',
    emptyText: 'Tu lista de pendientes está vacía.',
  },
];

function LibraryPanel({
  status,
  emptyText,
  enabled,
}: {
  status: BookStatus;
  emptyText: string;
  enabled: boolean;
}) {
  const { ref, inView } = useInView();
  const { data, isPending, fetchNextPage, isFetchingNextPage } = useBooksByStatus(
    status,
    enabled,
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!enabled) return null;
  if (isPending) return <SkeletonAllBooks showTags={false} />;

  const totalBooks = data?.pages[0]?.info?.totalBooks ?? 0;

  if (totalBooks === 0) {
    return (
      <Flex
        w='full'
        direction='column'
        justify='center'
        align='center'
        mt='10'
        mb='10'
      >
        <Image
          src={emptyFavorites}
          maxW='full'
          w={{ base: '200px', md: '300px' }}
          mt='5'
        />
        <Box my='7' fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} textAlign='center'>
          {emptyText}
        </Box>
        <Link
          as={NavLink}
          to='/explore'
          bg='green.500'
          color='black'
          p='3'
          border='1px'
          rounded='lg'
          textAlign='center'
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          <Flex align='center' justify='center'>
            <Icon as={MdOutlineExplore} fontSize='25' mr='2' />
            ¡Explora!
          </Flex>
        </Link>
      </Flex>
    );
  }

  return (
    <>
      <MyContainer>
        <Aside>
          <ResultLength data={totalBooks} />
        </Aside>
        <MySimpleGrid>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map(
                ({
                  id,
                  category,
                  language,
                  title,
                  authors,
                  synopsis,
                  sourceLink,
                  pathUrl,
                  image,
                }: CardType) => (
                  <Card
                    key={id}
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
                ),
              )}
            </React.Fragment>
          ))}
        </MySimpleGrid>
      </MyContainer>
      <Box ref={ref}>
        {isFetchingNextPage && (
          <Box p='10' textAlign='center'>
            <Spinner size={{ base: 'lg', md: 'xl' }} thickness='4px' speed='0.40s' />
          </Box>
        )}
      </Box>
    </>
  );
}

export default function MyLibrary() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <>
      <MainHead title='Mi biblioteca | XBuReads' />
      <ContainerTitle title='Mi biblioteca' />
      <ScrollRestoration />
      <Tabs
        index={tabIndex}
        onChange={setTabIndex}
        isFitted
        colorScheme='green'
        variant='line'
        isLazy
        mt={{ base: 2, md: 4 }}
      >
        <Box
          w='full'
          maxW={{ base: '1260px', '2xl': '1560px' }}
          m='0 auto'
          px={{ base: 5, md: 10, '2xl': 16 }}
        >
          <TabList>
            {TABS.map((t) => (
              <Tab key={t.key} fontSize='sm' fontWeight='normal'>
                {t.label}
              </Tab>
            ))}
          </TabList>
        </Box>
        <TabPanels>
          {TABS.map((t, i) => (
            <TabPanel key={t.key} px='0'>
              <LibraryPanel
                status={t.key}
                emptyText={t.emptyText}
                enabled={tabIndex === i}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}
