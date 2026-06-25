import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type Props = {
  url: string;
  initialPage?: number;
  onProgress?: (page: number, total: number) => void;
};

export default function PdfViewer({ url, initialPage = 1, onProgress }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageWidth, setPageWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<number>(initialPage);
  const controlsBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.700');
  const docBg = useColorModeValue('gray.100', 'gray.900');

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const w = Math.min(containerRef.current.clientWidth - 24, 900);
      setPageWidth(Math.max(w, 280));
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!numPages || !onProgress) return;
    if (page === lastSavedRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastSavedRef.current = page;
      onProgress(page, numPages);
    }, 1500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [page, numPages, onProgress]);

  function onLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    // Si la página guardada quedó fuera de rango (ej. recargaron un PDF más corto),
    // la corregimos a 1.
    if (page > n) setPage(1);
  }

  return (
    <Box
      ref={containerRef}
      bg={docBg}
      minH='80vh'
      py='6'
      onCopy={(e) => e.preventDefault()}
      sx={{ userSelect: 'none' }}
    >
      <Flex justify='center'>
        <Document
          file={url}
          onLoadSuccess={onLoadSuccess}
          loading={
            <Skeleton
              w={`${pageWidth}px`}
              h={`${Math.round(pageWidth * 1.4)}px`}
              rounded='md'
            />
          }
          error={
            <Text py='10' color='red.400'>
              No se pudo cargar el libro.
            </Text>
          }
        >
          <Page
            pageNumber={page}
            width={pageWidth}
            renderAnnotationLayer={false}
            loading={
              <Skeleton
                w={`${pageWidth}px`}
                h={`${Math.round(pageWidth * 1.4)}px`}
                rounded='md'
              />
            }
          />
        </Document>
      </Flex>
      {numPages ? (
        <Flex
          position='fixed'
          bottom='6'
          left='50%'
          transform='translateX(-50%)'
          bg={controlsBg}
          rounded='full'
          px='4'
          py='2'
          align='center'
          gap='3'
          backdropFilter='blur(8px)'
          boxShadow='lg'
          zIndex={100}
          pointerEvents='auto'
        >
          <IconButton
            aria-label='Página anterior'
            icon={<Icon as={FiChevronLeft} />}
            size='sm'
            variant='ghost'
            isDisabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          <Text fontSize='sm' fontWeight='500'>
            {page} / {numPages}
          </Text>
          <IconButton
            aria-label='Página siguiente'
            icon={<Icon as={FiChevronRight} />}
            size='sm'
            variant='ghost'
            isDisabled={page >= numPages}
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
          />
        </Flex>
      ) : null}
    </Box>
  );
}
