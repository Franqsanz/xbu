import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { ReactReader } from 'react-reader';

import { patchBookProgress } from '@services/api';

type Props = {
  url: string;
  bookId: string;
  initialLocation?: string | null;
};

const PROGRESS_DEBOUNCE_MS = 400;

export default function EpubViewer({ url, bookId, initialLocation }: Props) {
  const [location, setLocation] = useState<string | number>(initialLocation || 0);
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string | null>(
    typeof initialLocation === 'string' ? initialLocation : null,
  );
  const pendingRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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
    return (
      <Flex h='100%' align='center' justify='center'>
        <Spinner size='lg' />
      </Flex>
    );
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <ReactReader
        url={bookData as any}
        location={location}
        locationChanged={handleLocationChanged}
        epubOptions={{ flow: 'scrolled', manager: 'continuous' }}
      />
    </div>
  );
}
