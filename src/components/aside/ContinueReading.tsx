import { NavLink } from 'react-router-dom';
import { Box, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';

import { useBooksByStatus } from '@hooks/queries';
import { SkeletonAsideBlock } from '@components/skeletons/SkeletonAside';
import { cldImg } from '@utils/images';

type ShelfBook = {
  id: string;
  title: string;
  pathUrl: string;
  image?: { url: string };
  kind?: 'reference' | 'original';
  /** Sólo lo escribe el visor de PDF: en EPUB guardamos el CFI sin porcentaje. */
  percentage?: number;
};

/** Cuántos libros entran en el rail antes de mandar a la biblioteca. */
const MAX_ITEMS = 3;

function pickBooks(data: any): ShelfBook[] {
  return (data?.pages[0]?.results || []).slice(0, MAX_ITEMS);
}

export function ContinueReading() {
  const trackBg = useColorModeValue('gray.200', 'whiteAlpha.300');
  const { data: readingData, isLoading: readingLoading } =
    useBooksByStatus('reading');
  const readingBooks = pickBooks(readingData);

  // Si no hay nada en curso el bloque quedaría vacío, así que caemos en los
  // pendientes: casi siempre hay algo ahí y sigue siendo la estantería propia.
  const useFallback = !readingLoading && readingBooks.length === 0;
  const { data: wantData, isLoading: wantLoading } = useBooksByStatus(
    'want_to_read',
    useFallback,
  );

  if (readingLoading || (useFallback && wantLoading)) {
    return <SkeletonAsideBlock rows={MAX_ITEMS} media='cover' />;
  }

  const books = useFallback ? pickBooks(wantData) : readingBooks;

  // Ni libros en curso ni pendientes: no dejamos un título huérfano.
  if (books.length === 0) return null;

  return (
    <Box>
      <Box fontSize='xl' fontWeight='bold'>
        {useFallback ? 'En tu lista' : 'Seguí leyendo'}
      </Box>
      <Flex as='ul' direction='column' mt='6' gap='4'>
        {books.map(({ id, title, pathUrl, image, kind, percentage }) => {
          // Los libros de referencia no se leen en la app, van a la ficha.
          const to =
            kind === 'original' ? `/book/read/${pathUrl}` : `/book/view/${pathUrl}`;
          const progress =
            typeof percentage === 'number'
              ? Math.min(100, Math.max(0, Math.round(percentage)))
              : null;
          return (
            <Box as='li' key={id}>
              <Link
                as={NavLink}
                to={to}
                display='flex'
                gap='3'
                alignItems='center'
                _hover={{ color: 'green.500', outline: 'none' }}
              >
                <Image
                  src={cldImg(image?.url, { w: 48, h: 72 })}
                  alt=''
                  w='48px'
                  h='72px'
                  flexShrink={0}
                  objectFit='cover'
                  rounded='md'
                />
                <Flex direction='column' gap='2' minW='0' flex='1'>
                  <Text
                    fontSize='md'
                    lineHeight='1.4'
                    sx={{
                      display: '-webkit-box',
                      '-webkit-box-orient': 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '-webkit-line-clamp': '2',
                    }}
                  >
                    {title}
                  </Text>
                  {progress !== null && (
                    <Flex align='center' gap='2'>
                      <Box flex='1' h='4px' rounded='full' bg={trackBg}>
                        <Box
                          w={`${progress}%`}
                          h='full'
                          rounded='full'
                          bg='green.500'
                        />
                      </Box>
                      <Text fontSize='sm' color='gray.500'>
                        {progress}%
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Flex>
      <Link
        as={NavLink}
        to='/my-library'
        display='inline-block'
        mt='3'
        fontSize='sm'
        color='gray.500'
        _hover={{ color: 'green.500', outline: 'none' }}
      >
        Ver mi biblioteca
      </Link>
    </Box>
  );
}
