import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
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
import { cldAvatar } from '@utils/images';
import { CardType } from '@components/types';
import { useAuth } from '@contexts/AuthContext';
import { NoData } from '@assets/assets';
// import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';
import { SkeletonProfile } from '@components/skeletons/SkeletonProfile';
import { MyContainer } from '@components/ui/MyContainer';
import {
  FiArrowLeft,
  FiBookOpen,
  FiCheckCircle,
  FiEdit2,
  FiMessageSquare,
  FiStar,
} from 'react-icons/fi';
import { ModalFollowList } from '@components/modals/ModalFollowList';

export function Profile() {
  const bgCover = useColorModeValue('gray.100', 'gray.700');
  const subColor = useColorModeValue('gray.600', 'gray.300');
  const statBorderColor = useColorModeValue('gray.300', 'gray.600');
  const { ref, inView } = useInView();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { username } = useParams();
  const { pathname } = useLocation();
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
  const totalBooks = profileData?.pages[0]?.info?.totalBooks ?? 0;
  const readCount = profileData?.pages[0]?.readCount ?? 0;
  const commentsCount = profileData?.pages[0]?.commentsCount ?? 0;
  const topCategories: Array<{ name: string; count: number }> =
    profileData?.pages[0]?.topCategories ?? [];
  const booksStats: {
    totalViews: number;
    mostViewed: {
      id: string;
      title: string;
      pathUrl: string;
      views: number;
    } | null;
    averageRating: number;
    ratingsCount: number;
  } = profileData?.pages[0]?.booksStats ?? {
    totalViews: 0,
    mostViewed: null,
    averageRating: 0,
    ratingsCount: 0,
  };

  function formatCount(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return n.toString();
  }

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
          <Flex direction='column' gap='6' mt={{ base: '0', xl: '52px' }}>
            <Box fontSize='xl' fontWeight='bold'>
              Estadísticas
            </Box>
            <Box>
              <Text fontSize='xs' color={subColor}>
                Total de vistas
              </Text>
              <Box fontSize='2xl' fontWeight='bold'>
                {formatCount(booksStats.totalViews)}
              </Box>
            </Box>
            {booksStats.ratingsCount > 0 && (
              <Box>
                <Text fontSize='xs' color={subColor}>
                  Rating promedio
                </Text>
                <Flex align='center' gap='2'>
                  <Box fontSize='2xl' fontWeight='bold'>
                    {booksStats.averageRating}
                  </Box>
                  <Icon as={FiStar} color='yellow.400' />
                  <Text fontSize='sm' color={subColor}>
                    ({booksStats.ratingsCount})
                  </Text>
                </Flex>
              </Box>
            )}
            {booksStats.mostViewed && (
              <Box>
                <Text fontSize='xs' color={subColor}>
                  Más visto
                </Text>
                <Link
                  as={NavLink}
                  to={`/book/view/${booksStats.mostViewed.pathUrl}`}
                  fontWeight='bold'
                  _hover={{ textDecoration: 'underline' }}
                >
                  {booksStats.mostViewed.title}
                </Link>
              </Box>
            )}
          </Flex>
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
        minH={{ base: '330px', md: '320px' }}
        py={{ base: 8, md: 10 }}
        bg={bgCover}
      >
        <Flex
          w='full'
          maxW={{ base: '1260px', '2xl': '1560px' }}
          m='0 auto'
          px={{ base: 5, md: 10, '2xl': 16 }}
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'flex-start' }}
          gap={{ base: 4, md: 8 }}
        >
          <Box
            display={{ base: 'none', xl: 'block' }}
            w={{ xl: '220px', '2xl': '260px' }}
            flexShrink={0}
          />
          <Avatar
            src={cldAvatar(profileUser?.picture, 128)}
            name={profileUser?.name}
            referrerPolicy='no-referrer'
            w={{ base: '90px', md: '140px' }}
            h={{ base: '90px', md: '140px' }}
            flexShrink={0}
          />
          <Flex
            direction='column'
            align={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}
            gap='2'
            maxW={{ base: 'full', md: '400px', '2xl': '500px' }}
            minW={0}
          >
            <Box>
              <Box as='h1' fontSize={{ base: 'xl', md: '3xl' }} lineHeight='1.1'>
                {profileUser?.name}
              </Box>
              {profileUser?.username && (
                <Text fontSize={{ base: 'sm', md: 'md' }} color={subColor}>
                  @{profileUser.username}
                </Text>
              )}
            </Box>
            {profileUser?.bio && (
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                whiteSpace='pre-wrap'
                wordBreak='break-word'
                w='full'
              >
                {profileUser.bio}
              </Text>
            )}
            <Text fontSize={{ base: 'xs', md: 'sm' }} color={subColor}>
              Se unió el {createdAt}
            </Text>
            <Flex
              wrap='wrap'
              justify={{ base: 'center', md: 'flex-start' }}
              align='center'
              gap='2'
              fontSize={{ base: 'xs', md: 'sm' }}
              color={subColor}
            >
              <Flex
                as='button'
                gap='1'
                cursor='pointer'
                _hover={{ textDecoration: 'underline' }}
                onClick={() =>
                  setFollowModal({ isOpen: true, initialTab: 'followers' })
                }
              >
                <Box fontWeight='bold'>{followersCount}</Box>
                <Box>seguidores</Box>
              </Flex>
              <Box>·</Box>
              <Flex
                as='button'
                gap='1'
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
            <Box mt='2'>
              {isOwnProfile ? (
                <Button
                  as={NavLink}
                  to='/my-account/edit'
                  state={{ from: pathname }}
                  size='sm'
                  w={{ base: '220px', md: '220px' }}
                  leftIcon={<Icon as={FiEdit2} />}
                  fontWeight='normal'
                  bg='black'
                  color='white'
                  _hover={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                >
                  Editar perfil
                </Button>
              ) : (
                <Button
                  size='sm'
                  w={{ base: '220px', md: '220px' }}
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
                    profileData?.pages[0]?.isFollowing
                      ? handleUnfollow
                      : handleFollow
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
            </Box>
            <Flex
              display={{ base: 'flex', md: 'none' }}
              wrap='wrap'
              justify='center'
              align='center'
              gap='2'
              mt='2'
              fontSize='xs'
              color={subColor}
            >
              <Flex gap='1'>
                <Box fontWeight='bold'>{readCount}</Box>
                <Box>leídos</Box>
              </Flex>
              <Box>·</Box>
              <Flex gap='1'>
                <Box fontWeight='bold'>{commentsCount}</Box>
                <Box>comentarios</Box>
              </Flex>
            </Flex>
            {topCategories.length > 0 && (
              <Flex
                display={{ base: 'flex', md: 'none' }}
                wrap='wrap'
                justify='center'
                gap='2'
                mt='2'
              >
                {topCategories.map((c) => (
                  <Flex
                    key={c.name}
                    align='center'
                    gap='1'
                    px='2'
                    py='1'
                    borderRadius='full'
                    border='1px solid'
                    borderColor={statBorderColor}
                    fontSize='xs'
                  >
                    <Box fontWeight='bold'>{c.count}</Box>
                    <Text color={subColor}>{c.name}</Text>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml='auto'
            mr='10'
            gap={{ md: 8, '2xl': 16 }}
            alignSelf='stretch'
          >
            <Flex
              direction='column'
              gap='4'
              borderLeft='1px solid'
              borderColor={statBorderColor}
              pl='8'
              flexShrink={0}
              fontSize='md'
            >
              <Flex align='center' gap='2'>
                <Icon as={FiBookOpen} color={subColor} />
                <Box fontWeight='bold'>{totalBooks}</Box>
                <Text color={subColor}>publicados</Text>
              </Flex>
              <Flex align='center' gap='2'>
                <Icon as={FiCheckCircle} color={subColor} />
                <Box fontWeight='bold'>{readCount}</Box>
                <Text color={subColor}>leídos</Text>
              </Flex>
              <Flex align='center' gap='2'>
                <Icon as={FiMessageSquare} color={subColor} />
                <Box fontWeight='bold'>{commentsCount}</Box>
                <Text color={subColor}>comentarios</Text>
              </Flex>
            </Flex>
            {topCategories.length > 0 && (
              <Flex
                direction='column'
                gap='2'
                borderLeft='1px solid'
                borderColor={statBorderColor}
                pl='8'
                flexShrink={0}
                fontSize='sm'
              >
                <Text fontSize='sm' fontWeight='bold' mb='1'>
                  Géneros favoritos
                </Text>
                {topCategories.map((c) => (
                  <Flex key={c.name} align='center' gap='2'>
                    <Box fontWeight='bold'>{c.count}</Box>
                    <Text color={subColor}>{c.name}</Text>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex justify='center'>
        <Box mt='3' mb='1' fontSize={{ base: 'md', md: 'lg' }}>
          PUBLICACIONES
        </Box>
      </Flex>
      <Flex
        display={{ base: 'flex', xl: 'none' }}
        direction='column'
        mt='4'
        py='3'
        px={{ base: 5, md: 10 }}
        borderY='1px solid'
        borderColor={statBorderColor}
        gap='3'
      >
        <Flex justify='space-around' align='center' textAlign='center'>
          <Box>
            <Text fontSize='lg' fontWeight='bold'>
              {totalBooks}
            </Text>
            <Text fontSize='xs' color={subColor}>
              Libros
            </Text>
          </Box>
          <Box>
            <Text fontSize='lg' fontWeight='bold'>
              {formatCount(booksStats.totalViews)}
            </Text>
            <Text fontSize='xs' color={subColor}>
              Vistas
            </Text>
          </Box>
          {booksStats.ratingsCount > 0 && (
            <Box>
              <Flex align='center' justify='center' gap='1'>
                <Text fontSize='lg' fontWeight='bold'>
                  {booksStats.averageRating}
                </Text>
                <Icon as={FiStar} color='yellow.400' />
              </Flex>
              <Text fontSize='xs' color={subColor}>
                Rating ({booksStats.ratingsCount})
              </Text>
            </Box>
          )}
        </Flex>
        {booksStats.mostViewed && (
          <Flex justify='center' align='center' fontSize='xs' gap='1' wrap='wrap'>
            <Text color={subColor}>Más visto:</Text>
            <Link
              as={NavLink}
              to={`/book/view/${booksStats.mostViewed.pathUrl}`}
              fontWeight='bold'
              _hover={{ textDecoration: 'underline' }}
            >
              {booksStats.mostViewed.title}
            </Link>
          </Flex>
        )}
      </Flex>
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
