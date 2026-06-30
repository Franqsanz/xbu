import React from 'react';
import { Box, Flex, Skeleton, useColorModeValue } from '@chakra-ui/react';

// Skeleton del cuerpo del visor: el único elemento animado mientras carga
// la página. Va dentro del BookReader cuando este ya tiene el `book` (header
// y pill se renderizan reales con datos del libro, no como placeholders).
export function ReaderBodySkeleton() {
  const docBg = useColorModeValue('gray.100', 'gray.900');
  return (
    <Flex flex='1' h='100%' bg={docBg} py='6' justify='center'>
      <Skeleton
        h={{ base: '70vh', md: '80vh' }}
        w={{ base: '90%', md: '650px' }}
        maxW='900px'
        rounded='md'
      />
    </Flex>
  );
}

// Fallback completo del Suspense del lazy del BookReader: caso muy puntual
// (primer load del bundle). Mostramos header y pill como placeholders sin
// animación para no parpadear todo a la vez — sólo el rectángulo central
// pulsa, indicando dónde aparecerá el contenido.
export function SkeletonReader() {
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const placeholder = useColorModeValue('gray.200', 'gray.700');
  const pillBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.700');
  return (
    <Flex direction='column' minH='100vh'>
      <Flex
        as='header'
        bg={headerBg}
        borderBottom='1px'
        borderColor={borderColor}
        px={{ base: 3, md: 5 }}
        py='3'
        align='center'
        gap='3'
      >
        <Box w='32px' h='32px' rounded='md' bg={placeholder} />
        <Box
          h='18px'
          w={{ base: '160px', md: '280px' }}
          rounded='md'
          bg={placeholder}
        />
      </Flex>
      <ReaderBodySkeleton />
      <Box
        position='fixed'
        bottom='6'
        left='50%'
        transform='translateX(-50%)'
        bg={pillBg}
        rounded='full'
        px='4'
        py='2'
        boxShadow='lg'
      >
        <Flex align='center' gap='3'>
          <Box w='28px' h='28px' rounded='full' bg={placeholder} />
          <Box w='40px' h='14px' rounded='md' bg={placeholder} />
          <Box w='28px' h='28px' rounded='full' bg={placeholder} />
        </Flex>
      </Box>
    </Flex>
  );
}
