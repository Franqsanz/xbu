import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Skeleton,
  Text,
  keyframes,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { patchBookProgress } from '@services/api';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type Props = {
  url: string;
  bookId: string;
  initialPage?: number;
};

const PROGRESS_DEBOUNCE_MS = 400;
const SWIPE_THRESHOLD_PX = 60;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;

// "Page flip" simple: la página entra desde un costado con un pequeño tilt
// 3D — sin librerías, sin renderizar dos páginas en simultáneo.
const flipInForward = keyframes`
  from {
    transform: perspective(1200px) rotateY(35deg) translateX(40px);
    transform-origin: left center;
    opacity: 0;
  }
  to {
    transform: perspective(1200px) rotateY(0) translateX(0);
    opacity: 1;
  }
`;
const flipInBackward = keyframes`
  from {
    transform: perspective(1200px) rotateY(-35deg) translateX(-40px);
    transform-origin: right center;
    opacity: 0;
  }
  to {
    transform: perspective(1200px) rotateY(0) translateX(0);
    opacity: 1;
  }
`;

export default function PdfViewer({ url, bookId, initialPage = 1 }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [page, setPage] = useState(initialPage);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [basePageWidth, setBasePageWidth] = useState(640);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<number>(initialPage);
  const pendingPageRef = useRef<number>(initialPage);
  const totalPagesRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);
  const controlsBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.700');
  const docBg = useColorModeValue('gray.100', 'gray.900');

  async function sendProgress(pageNum: number, opts: { keepalive?: boolean } = {}) {
    if (!totalPagesRef.current) return;
    // Cancela el PATCH anterior si todavía estaba en vuelo: garantiza que
    // el último que disparamos sea el que gane en el servidor.
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const percentage = Math.round((pageNum / totalPagesRef.current) * 100);
    lastSavedRef.current = pageNum;
    try {
      await patchBookProgress(
        bookId,
        { position: pageNum, type: 'pdf', percentage },
        { signal: ctrl.signal, keepalive: opts.keepalive },
      );
    } catch {
      // Aborts y errores de red los ignoramos: si el guardado falló, el
      // próximo cambio de página intentará de nuevo.
    }
  }

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const w = Math.min(containerRef.current.clientWidth - 24, 640);
      setBasePageWidth(Math.max(w, 280));
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    pendingPageRef.current = page;
    if (!numPages) return;
    if (page === lastSavedRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      sendProgress(page);
    }, PROGRESS_DEBOUNCE_MS);
  }, [page, numPages]);

  // Flush al desmontar o cerrar pestaña: usa keepalive así llega aunque la
  // página esté navegando o el browser cierre.
  useEffect(() => {
    function flush() {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const last = pendingPageRef.current;
      if (last === lastSavedRef.current) return;
      sendProgress(last, { keepalive: true });
    }
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  function onLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    totalPagesRef.current = n;
    if (page > n) setPage(1);
  }

  function goPrev() {
    setDirection('backward');
    setPage((p) => Math.max(1, p - 1));
  }
  function goNext() {
    setDirection('forward');
    setPage((p) => (numPages ? Math.min(numPages, p + 1) : p + 1));
  }
  function zoomIn() {
    setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  }
  function zoomOut() {
    setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
  }

  function pinchDistance(touches: React.TouchList) {
    const a = touches[0];
    const b = touches[1];
    if (!a || !b) return 0;
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      // Pinch: bloqueamos el swipe y arrancamos a trackear el zoom interno.
      touchStartRef.current = null;
      pinchStartRef.current = { dist: pinchDistance(e.touches), zoom };
      return;
    }
    const t = e.touches[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY, t: e.timeStamp };
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStartRef.current) {
      const dist = pinchDistance(e.touches);
      const factor = dist / pinchStartRef.current.dist;
      const next = pinchStartRef.current.zoom * factor;
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
      setZoom(+clamped.toFixed(2));
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (e.touches.length < 2) {
      pinchStartRef.current = null;
    }
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    // Con zoom, el usuario está paneando dentro de la página — el browser
    // ya hace el pan nativo gracias a `overflow:auto + touch-action`. No
    // queremos disparar swipe de página encima.
    if (zoom > 1.05) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  }

  const pageWidth = Math.round(basePageWidth * zoom);

  return (
    <Box
      ref={containerRef}
      bg={docBg}
      h='100%'
      overflow='auto'
      py='6'
      onCopy={(e) => e.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // `pan-x pan-y` deja al browser manejar el scroll en ambos ejes (útil
      // cuando hicimos zoom y la página supera el ancho del viewport), pero
      // bloquea el pinch nativo. El pinch sigue manejado por JS.
      sx={{ userSelect: 'none', touchAction: 'pan-x pan-y' }}
    >
      <Flex justify='center' minW='min-content'>
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
          <Box
            key={page}
            animation={`${
              direction === 'forward' ? flipInForward : flipInBackward
            } 0.35s ease-out`}
            sx={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <Page
              pageNumber={page}
              width={pageWidth}
              renderAnnotationLayer={false}
              loading={
                <Box w={`${pageWidth}px`} h={`${Math.round(pageWidth * 1.4)}px`} />
              }
            />
          </Box>
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
          px={{ base: 2, md: 4 }}
          py='2'
          align='center'
          gap={{ base: 2, md: 3 }}
          backdropFilter='blur(8px)'
          boxShadow='lg'
          zIndex={100}
          pointerEvents='auto'
        >
          <IconButton
            aria-label='Alejar'
            icon={<Icon as={FiMinus} />}
            size='sm'
            variant='ghost'
            isDisabled={zoom <= MIN_ZOOM}
            onClick={zoomOut}
          />
          <Text fontSize='sm' fontWeight='500' minW='40px' textAlign='center'>
            {Math.round(zoom * 100)}%
          </Text>
          <IconButton
            aria-label='Acercar'
            icon={<Icon as={FiPlus} />}
            size='sm'
            variant='ghost'
            isDisabled={zoom >= MAX_ZOOM}
            onClick={zoomIn}
          />
          <Box w='1px' h='20px' bg='gray.400' opacity={0.4} />
          <IconButton
            aria-label='Página anterior'
            icon={<Icon as={FiChevronLeft} />}
            size='sm'
            variant='ghost'
            isDisabled={page <= 1}
            onClick={goPrev}
          />
          <Text fontSize='sm' fontWeight='500' minW='60px' textAlign='center'>
            {page} / {numPages}
          </Text>
          <IconButton
            aria-label='Página siguiente'
            icon={<Icon as={FiChevronRight} />}
            size='sm'
            variant='ghost'
            isDisabled={page >= numPages}
            onClick={goNext}
          />
        </Flex>
      ) : null}
    </Box>
  );
}
