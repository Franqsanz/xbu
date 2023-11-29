import React, { useRef } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import mediumZoom, { Zoom, ZoomOptions, ZoomSelector } from 'medium-zoom';

type ImageZoomProps = ImageProps & {
  options?: ZoomOptions;
};

export function ImageZoom({ options, ...props }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: '#000000d6',
        margin: 70,
      });
    }

    return zoomRef.current;
  }

  function attachZoom(node: ZoomSelector) {
    const zoom = getZoom();

    if (node) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }
  }

  return <Image {...props} ref={attachZoom} />;
}
