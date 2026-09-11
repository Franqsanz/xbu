import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

/** Qué acompaña a cada fila: nada, una portada o un avatar. */
type RowMedia = 'none' | 'cover' | 'avatar';

/**
 * Bloque genérico de los rieles del home. Las medidas siguen a los componentes
 * reales: título `xl` (20px), lista con `mt='6'` y portadas de 48x72.
 */
export function SkeletonAsideBlock({
  rows = 4,
  media = 'none',
}: {
  rows?: number;
  media?: RowMedia;
}) {
  return (
    <Box>
      <Skeleton h='5' w='55%' />
      <Flex direction='column' mt='6' gap={media === 'none' ? '3' : '4'}>
        {Array.from({ length: rows }, (_, index) => (
          <Flex key={index} align='center' gap='3'>
            {media === 'cover' && (
              <Skeleton w='48px' h='72px' rounded='md' flexShrink={0} />
            )}
            {media === 'avatar' && <SkeletonCircle size='8' flexShrink={0} />}
            <Flex direction='column' gap='2' flex='1' minW='0'>
              <Skeleton h='4' w='85%' />
              {media !== 'none' && <Skeleton h='3' w='50%' />}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
