import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Image,
  Link,
  Icon,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';

import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/aside/Aside';
import { MainHead } from '@components/layout/Head';
import { useProfile, useCheckUser } from '@hooks/queries';
import { parseDate } from '@utils/utils';
import { CardType } from '@components/types';
import { ResultLength } from '@components/aside/ResultLength';
import { useAuth } from '@contexts/AuthContext';
import { NoData } from '@assets/assets';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
// import { logOut } from '../../services/firebase/auth';

export function Profile() {
  const bgCover = useColorModeValue('gray.100', 'gray.700');
  const { ref, inView } = useInView();
  const getToken = window.localStorage.getItem('app_tk');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { username } = useParams();
  const {
    data: profileData,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useProfile(username, uid, getToken);
  const { data: userData, refetch } = useCheckUser(uid);
  const createdAt = userData?.createdAt;
  let asideAndCardsUI;
  let fetchingNextPageUI;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isPending) {
    return <SkeletonAllBooks showTags={true} />;
  }

  if (error) {
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

  if (profileData?.pages[0].info.totalBooks > 0) {
    asideAndCardsUI = (
      <>
        <Aside>
          <ResultLength data={profileData?.pages[0].info.totalBooks} />
          {/* {aboutCategoriesUI}
          {asideFilter}  */}
        </Aside>
        <MySimpleGrid>
          {profileData?.pages.map((page, index) => (
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
        mt='5'
        mb='20'
      >
        <Box
          my={{ base: 2, md: 7 }}
          fontSize={{ base: 'lg', lg: '3xl' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Bienvenido a XBuniverse
        </Box>
        <Image src={NoData} maxW='full' w={{ base: '200px', md: '400px' }} mt='5' />
        <Box
          my='7'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Aún no hay publicaciones
        </Box>
        <Link
          w={{ base: '85%', md: '230px' }}
          display='block'
          as={NavLink}
          to='/new-post'
          bg='green.500'
          color='black'
          p='3'
          border='1px'
          rounded='lg'
          textAlign='center'
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          <Flex align='center' justify='center'>
            <Icon as={AiOutlineCloudUpload} fontSize='25' mr='2' />
            Crear publicación
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
      <MainHead
        title={`${userData?.name} | XBuniverse`}
        urlImage={userData?.picture}
      />
      <Flex
        as='section'
        justify='center'
        align='center'
        direction='column'
        h={{ base: '230px', md: '260px' }}
        bg={bgCover}
      >
        <Image
          src={userData?.picture}
          alt={`Imagen de perfil de ${userData?.name}`}
          referrerPolicy='no-referrer'
          borderRadius='full'
        />
        <Box as='h1' fontSize={{ base: 'xl', md: '3xl' }} mt='3' textAlign='center'>
          {userData?.name}
        </Box>
        <Flex
          direction='column'
          fontSize={{ base: 'xs', md: 'sm' }}
          mt='2'
          textAlign='center'
        >
          <Box as='span' fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold'>
            Se unió el
          </Box>{' '}
          {parseDate(createdAt)}
        </Flex>
      </Flex>
      <Flex justify='center' borderBottom='1px solid #A0AEC0'>
        <Box mt='3' mb='1' fontSize={{ base: 'md', md: 'lg' }}>
          PUBLICACIONES
        </Box>
      </Flex>
      <Flex
        as='article'
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '1260px', '2xl': '1560px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        {asideAndCardsUI}
      </Flex>
      <Box ref={ref}>{fetchingNextPageUI}</Box>
    </>
  );
}
