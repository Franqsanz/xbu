import React, { Suspense, lazy, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import { MainHead } from '@components/layout/Head';
import { SkeletonReader } from '@components/skeletons/SkeletonReader';
import { useBook, useBookReadUrl, useBookProgress } from '@hooks/queries';

const PdfViewer = lazy(() => import('@components/reader/PdfViewer'));
const EpubViewer = lazy(() => import('@components/reader/EpubViewer'));

export default function BookReader() {
  const { pathUrl } = useParams<{ pathUrl: string }>();
  const navigate = useNavigate();
  const { data: book } = useBook(pathUrl);
  const bg = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const enabled = book?.kind === 'original' && !!book?.id;
  const { data: readData, isLoading, isError } = useBookReadUrl(book?.id, enabled);
  const { data: progressData, isLoading: progressLoading } = useBookProgress(
    book?.id,
    enabled,
  );

  useEffect(() => {
    if (book && book.kind !== 'original') {
      navigate(`/book/view/${pathUrl}`, { replace: true });
    }
  }, [book, navigate, pathUrl]);

  useEffect(() => {
    function preventContextMenu(e: MouseEvent) {
      e.preventDefault();
    }
    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  const ready = readData && !progressLoading;
  const initialPosition = (progressData as any)?.progress?.position ?? null;

  return (
    <>
      <MainHead title={book?.title ? `Leer ${book.title}` : 'Lector'} />
      <Flex direction='column' bg={bg} h='100vh'>
        <Flex
          as='header'
          bg={headerBg}
          borderBottom='1px'
          borderColor={borderColor}
          px={{ base: 3, md: 5 }}
          py='3'
          align='center'
          gap='3'
          position='sticky'
          top='0'
          zIndex='5'
        >
          <IconButton
            aria-label='Volver'
            icon={<Icon as={FiArrowLeft} />}
            size='sm'
            onClick={() => navigate(`/book/view/${pathUrl}`)}
            variant='ghost'
          />
          <Text fontWeight='600' isTruncated>
            {book?.title}
          </Text>
        </Flex>
        <Box flex='1' position='relative' minH='0' overflow='hidden'>
          {(isLoading || progressLoading) && <SkeletonReader />}
          {isError && (
            <Flex
              h='80vh'
              align='center'
              justify='center'
              direction='column'
              gap='3'
            >
              <Text>No se pudo cargar el libro.</Text>
              <Button onClick={() => navigate(`/book/view/${pathUrl}`)}>
                Volver al detalle
              </Button>
            </Flex>
          )}
          {ready && book?.id && (
            <Suspense fallback={<SkeletonReader />}>
              {readData.type === 'pdf' ? (
                <PdfViewer
                  url={readData.url}
                  bookId={book.id}
                  initialPage={
                    typeof initialPosition === 'number' ? initialPosition : 1
                  }
                />
              ) : (
                <EpubViewer
                  url={readData.url}
                  bookId={book.id}
                  initialLocation={
                    typeof initialPosition === 'string' ? initialPosition : null
                  }
                />
              )}
            </Suspense>
          )}
        </Box>
      </Flex>
    </>
  );
}
