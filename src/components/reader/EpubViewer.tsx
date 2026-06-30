import React, { useEffect, useRef, useState } from 'react';
import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { ReactReader } from 'react-reader';
import type { Rendition } from 'epubjs';

import { patchBookProgress } from '@services/api';
import { ReaderBodySkeleton } from '@components/skeletons/SkeletonReader';

type Props = {
  url: string;
  bookId: string;
  initialLocation?: string | null;
};

const PROGRESS_DEBOUNCE_MS = 400;

export default function EpubViewer({ url, bookId, initialLocation }: Props) {
  const [location, setLocation] = useState<string | number>(initialLocation || 0);
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [renditionReady, setRenditionReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string | null>(
    typeof initialLocation === 'string' ? initialLocation : null,
  );
  const pendingRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  // El endpoint de Cloudinary devuelve la URL de download, no de delivery,
  // así que epub.js no la entiende como un .epub. La descargamos como
  // ArrayBuffer y se lo pasamos al reader.
  useEffect(() => {
    let cancelled = false;
    setBookData(null);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buf) => {
        if (!cancelled) setBookData(buf);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo descargar el libro.');
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  async function sendProgress(cfi: string, opts: { keepalive?: boolean } = {}) {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    lastSavedRef.current = cfi;
    try {
      await patchBookProgress(
        bookId,
        { position: cfi, type: 'epub' },
        { signal: ctrl.signal, keepalive: opts.keepalive },
      );
    } catch {
      // ignore aborts / network errors
    }
  }

  function handleLocationChanged(cfi: string) {
    setLocation(cfi);
    pendingRef.current = cfi;
    if (cfi === lastSavedRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      sendProgress(cfi);
    }, PROGRESS_DEBOUNCE_MS);
  }

  function handleGetRendition(rendition: Rendition) {
    renditionRef.current = rendition;
    // Tipografía más cómoda para lectura — más padding lateral y line-height
    // mayor en mobile, donde el contenido por defecto queda muy apretado.
    rendition.themes.register('xbu', {
      body: {
        padding: isMobile ? '0 12px' : '0 24px',
        'font-size': isMobile ? '105%' : '100%',
        'line-height': '1.65',
      },
      p: {
        'margin-bottom': '0.8em',
      },
    });
    rendition.themes.select('xbu');
    // El rendition existe pero la primera página aún no se pintó. Cuando
    // dispare `rendered` quitamos el skeleton overlay.
    rendition.once('rendered', () => setRenditionReady(true));
  }

  useEffect(() => {
    function flush() {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const last = pendingRef.current;
      if (!last || last === lastSavedRef.current) return;
      sendProgress(last, { keepalive: true });
    }
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  if (error) {
    return (
      <Flex h='100%' align='center' justify='center'>
        <Text color='red.400'>{error}</Text>
      </Flex>
    );
  }

  if (!bookData) {
    return <ReaderBodySkeleton />;
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <ReactReader
        url={bookData as any}
        location={location}
        locationChanged={handleLocationChanged}
        getRendition={handleGetRendition}
        epubOptions={{ flow: 'scrolled', manager: 'continuous' }}
      />
      {!renditionReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <ReaderBodySkeleton />
        </div>
      )}
    </div>
  );
}
