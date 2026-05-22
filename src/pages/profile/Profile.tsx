import React, { useEffect, useMemo, useState } from 'react';
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
  Text,
  Button,
} from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';

import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/aside/Aside';
import { MainHead } from '@components/layout/Head';
import {
  useProfile,
  useCheckUser,
  useFollowUser,
  useUnfollowUser,
} from '@hooks/queries';
import { parseDate } from '@utils/utils';
import { CardType } from '@components/types';
import { ResultLength } from '@components/aside/ResultLength';
import { useAuth } from '@contexts/AuthContext';
import { NoData } from '@assets/assets';
// import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonProfile } from '@components/skeletons/SkeletonProfile';
import { MyContainer } from '@components/ui/MyContainer';
import { MobileResultBar } from '@components/ui/MobileResultBar';
import { FiArrowLeft } from 'react-icons/fi';
import { ModalFollowList } from '@components/modals/ModalFollowList';

export function Profile() {
  const bgCover = useColorModeValue('gray.100', 'gray.700');
  const { ref, inView } = useInView();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { username } = useParams();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [followModal, setFollowModal] = useState<{
    isOpen: boolean;
    initialTab: 'followers' | 'following';
  }>({ isOpen: false, initialTab: 'followers' });
  const {
    data: profileData,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProfile(username, uid);
  const { data: userData, refetch } = useCheckUser();

  const profileUser = profileData?.pages[0]?.user;
  const isOwnProfile = uid === profileUser?.uid;

  const { mutate: follow, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollow, isPending: isUnfollowing } = useUnfollowUser();
  const followersCount = profileData?.pages[0]?.followersCount ?? 0;
  const followingCount = profileData?.pages[0]?.followingCount ?? 0;

  const createdAt = profileUser?.createdAt ? parseDate(profileUser.createdAt) : '';
  let asideAndCardsUI;
  let fetchingNextPageUI;

  const profile = useMemo(() => {
    return profileData?.pages.flatMap((page) => page.results) || [];
  }, [profileData]);

  function handleFollow() {
    if (profileUser?.uid) {
      follow(profileUser.uid);
    }
  }

  function handleUnfollow() {
    if (profileUser?.uid) {
      unfollow(profileUser.uid);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => window.scrollTo(0, 0), 0);
    return () => window.clearTimeout(id);
  }, [username]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (error?.message === 'Error en la solicitud: 404') {
    return (
      <Flex
        direction='column'
        align='center'
        justify='center'
        textAlign='center'
        minH={{ base: '60vh', md: '50vh' }}
        gap='8'
      >
        <Box fontSize={{ base: 'xl', md: '3xl' }} px={{ base: '3', md: '0' }}>
          Este perfil no existe.
          <Text mt='2' fontSize='md'>
            Es posible que el enlace que seleccionaste esté roto o que se haya
            eliminado el perfil.
          </Text>
        </Box>
        <Link
          to='/'
          as={NavLink}
          border='1px'
          borderColor='green.500'
          borderRadius='lg'
          p='3'
          fontSize='xl'
          _hover={{
            outline: 'none',
            bg: 'green.500',
            color: 'black',
            borderColor: 'black',
          }}
        >
          <Flex align='center'>
            <Icon as={FiArrowLeft} mr='2' />
            Volver al inicio
          </Flex>
        </Link>
      </Flex>
    );
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
          {profile.map(
            ({
              id,
              title,
              language,
              synopsis,
              authors,
              category,
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
      </>
    );
  } else {
    if (isOwnProfile) {
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
            Bienvenido a XBuReads
          </Box>
          <Image
            src={NoData}
            maxW='full'
            w={{ base: '200px', md: '400px' }}
            mt='5'
          />
          <Box
            my='7'
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Aún no hay publicaciones
          </Box>
          <Link
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
          <Image
            src={NoData}
            maxW='full'
            w={{ base: '200px', md: '400px' }}
            mt='5'
          />
          <Box
            my='7'
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Este usuario no tiene publicaciones
          </Box>
        </Flex>
      );
    }
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
        title={`${profileUser?.name} | XBuReads`}
        urlImage={profileUser?.picture}
      />
      <Flex
        as='section'
        justify='center'
        align='center'
        direction='column'
        h={{ base: '330px', md: '400px' }}
        bg={bgCover}
      >
        <Image
          src={profileUser?.picture}
          alt={`Imagen de perfil de ${profileUser?.name}`}
          referrerPolicy='no-referrer'
          borderRadius='full'
          w={{ base: '80px', md: '120px' }}
          h={{ base: '80px', md: '120px' }}
        />
        <Box as='h1' fontSize={{ base: 'xl', md: '3xl' }} mt='3' textAlign='center'>
          {profileUser?.name}
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
          {createdAt}
        </Flex>
        <Flex direction='column' align='center' gap='2' mt='4'>
          <Flex gap='3' align='center'>
            <Flex
              as='button'
              gap='2'
              fontSize={{ base: 'xs', md: 'sm' }}
              cursor='pointer'
              _hover={{ textDecoration: 'underline' }}
              onClick={() =>
                setFollowModal({ isOpen: true, initialTab: 'followers' })
              }
            >
              <Box fontWeight='bold'>{followersCount}</Box>
              <Box>seguidores</Box>
            </Flex>
            <Box>•</Box>
            <Flex
              as='button'
              gap='2'
              fontSize={{ base: 'xs', md: 'sm' }}
              cursor='pointer'
              _hover={{ textDecoration: 'underline' }}
              onClick={() =>
                setFollowModal({ isOpen: true, initialTab: 'following' })
              }
            >
              <Box fontWeight='bold'>{followingCount}</Box>
              <Box>siguiendo</Box>
            </Flex>
          </Flex>
          {!isOwnProfile && (
            <Button
              size='sm'
              w={{ base: '85%', md: '250px' }}
              bg={
                !profileData?.pages[0]?.isFollowing
                  ? 'green.500'
                  : isButtonHovered
                    ? 'red.500'
                    : 'black'
              }
              color={!profileData?.pages[0]?.isFollowing ? 'black' : 'white'}
              _hover={{
                bg: profileData?.pages[0]?.isFollowing ? 'red.500' : 'green.600',
              }}
              onClick={
                profileData?.pages[0]?.isFollowing ? handleUnfollow : handleFollow
              }
              isLoading={isFollowing || isUnfollowing}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              fontWeight='normal'
            >
              {profileData?.pages[0]?.isFollowing && isButtonHovered
                ? 'Dejar de seguir'
                : profileData?.pages[0]?.isFollowing
                  ? 'Siguiendo'
                  : 'Seguir'}
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex justify='center'>
        <Box mt='3' mb='1' fontSize={{ base: 'md', md: 'lg' }}>
          PUBLICACIONES
        </Box>
      </Flex>
      <MobileResultBar data={profileData} />
      <MyContainer>{asideAndCardsUI}</MyContainer>
      <Box ref={ref}>{fetchingNextPageUI}</Box>
      <ModalFollowList
        isOpen={followModal.isOpen}
        onClose={() => setFollowModal((prev) => ({ ...prev, isOpen: false }))}
        userId={profileUser?.uid}
        initialTab={followModal.initialTab}
        followersCount={followersCount}
        followingCount={followingCount}
      />
    </>
  );
}
