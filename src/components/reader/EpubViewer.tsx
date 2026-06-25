import React, { useEffect, useRef, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { ReactReader } from 'react-reader';

type Props = {
  url: string;
  initialLocation?: string | null;
  onProgress?: (cfi: string) => void;
};

export default function EpubViewer({ url, initialLocation, onProgress }: Props) {
  const [location, setLocation] = useState<string | number>(initialLocation || 0);
  const { colorMode } = useColorMode();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!onProgress) return;
    if (typeof location !== 'string') return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onProgress(location);
    }, 1500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [location, onProgress]);

  return (
    <Box
      position='relative'
      h='calc(100vh - 60px)'
      sx={{ userSelect: 'none' }}
      onCopy={(e) => e.preventDefault()}
    >
      <ReactReader
        url={url}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
        epubOptions={{ allowPopups: false, allowScriptedContent: false }}
        readerStyles={
          colorMode === 'dark'
            ? ({
                arrow: { background: 'transparent', color: '#fff' },
                arrowHover: { color: '#2de000' },
                reader: { background: '#1a202c', color: '#fff' },
                container: { background: '#1a202c' },
                titleArea: { color: '#fff' },
                tocArea: { background: '#2d3748', color: '#fff' },
                tocAreaButton: { color: '#fff' },
                tocButton: { color: '#fff' },
                tocButtonExpanded: { background: '#2d3748' },
                tocButtonBar: { background: '#fff' },
                tocButtonBarTop: { background: '#fff' },
                tocButtonBottom: { background: '#fff' },
                swipeWrapper: { background: '#1a202c' },
              } as any)
            : undefined
        }
      />
    </Box>
  );
}
