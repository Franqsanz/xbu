import React, { useCallback, useEffect, useRef } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom';

type ImageZoomProps = ImageProps & {
  options?: ZoomOptions;
};

export function ImageZoom({ options, ...props }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mouseDownTimeRef = useRef(0);
  const mouseDownInsideRef = useRef(false);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: '#000000d6',
        margin: 24,
        ...options,
      });
    }
    return zoomRef.current;
  }

  const setRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    const zoom = getZoom();
    if (node) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }
  }, []);

  useEffect(() => {
    function isInsideImage(x: number, y: number): boolean {
      if (!imgRef.current) return false;
      const rect = imgRef.current.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    function handleMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      if (!isInsideImage(e.clientX, e.clientY)) {
        mouseDownInsideRef.current = false;
        return;
      }
      mouseDownInsideRef.current = true;
      mouseDownTimeRef.current = Date.now();
    }

    function handleMouseUp(e: MouseEvent) {
      if (e.button !== 0) return;
      if (!mouseDownInsideRef.current) return;
      mouseDownInsideRef.current = false;
      // Si el cursor sigue dentro y fue un click "rápido" (<300ms),
      // disparamos el zoom. Esto evita que un drag intencional (ej. el
      // efecto 3D de Atropos) abra el zoom por error.
      if (!isInsideImage(e.clientX, e.clientY)) return;
      if (Date.now() - mouseDownTimeRef.current > 300) return;
      const zoom = getZoom();
      if (imgRef.current) {
        zoom.open({ target: imgRef.current });
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      zoomRef.current?.detach();
    };
  }, []);

  return (
    <Image {...props} ref={setRef} cursor='zoom-in' position='relative' zIndex='2' />
  );
}
