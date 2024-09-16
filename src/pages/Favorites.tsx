import React, { useEffect } from 'react';
import { NavLink, ScrollRestoration } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { MdOutlineExplore } from 'react-icons/md';

import { useAllFavoriteByUser } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { CardType } from '@components/types';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { Aside } from '@components/aside/Aside';
import { ResultLength } from '@components/aside/ResultLength';
import { MySliderCategories } from '@components/ui/MySliderCategories';
import { MyContainer } from '@components/ui/MyContainer';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { emptyFavorites } from '@assets/assets';

export default function Favorites() {
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');
  const { ref, inView } = useInView();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useAllFavoriteByUser(uid);
  let fetchingNextPageUI;
  let asideAndCardsUI;

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isPending) {
    return <SkeletonAllBooks showTags={true} />;
  }

  if (data?.pages[0].info.totalBooks > 0) {
    asideAndCardsUI = (
      <>
        <Aside>
          <ResultLength data={data?.pages[0].info.totalBooks} />
          {/* {asideFilter} */}
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
            </React.Fragment>
          ))}
        </MySimpleGrid>
      </>
    );
  } else {
    asideAndCardsUI = (
      <Flex
        w='full'
        direction='column'
        justify='center'
        align='center'
        mt='20'
        mb='10'
      >
        <Image
          src={emptyFavorites}
          maxW='full'
          w={{ base: '200px', md: '300px' }}
          mt='5'
        />
        <Box
          my='7'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Todavía no has añadido libros a tus favoritos.
        </Box>
        <Link
          w='auto'
          display='block'
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

  if (isFetchingNextPage) {
    fetchingNextPageUI = (
      <Box p='10' textAlign='center'>
        <Spinner size={{ base: 'lg', md: 'xl' }} thickness='4px' speed='0.40s' />
      </Box>
    );
  }

  return (
    <>
      <MainHead title='Mis favoritos | XBuniverse' />
      <ContainerTitle title='Mis favoritos' />
      <ScrollRestoration />
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
        <ResultLength data={data?.pages[0].info.totalBooks} />
      </Flex>
      <MyContainer>{asideAndCardsUI}</MyContainer>
      <Box ref={ref}>{fetchingNextPageUI}</Box>
    </>
  );
}
