import { NavLink } from 'react-router-dom';
import { Box, Flex, Link, Spinner } from '@chakra-ui/react';

import { useMostViewedBooks } from '@hooks/queries';
import { SkeletonAsideBlock } from '@components/skeletons/SkeletonAside';

export function MostViewed({ compact = false }: { compact?: boolean }) {
  const { data, isLoading } = useMostViewedBooks('summary');

  if (isLoading) {
    // En el riel del home va skeleton para que no salte el layout; el resto de
    // las páginas que usan este bloque conservan el spinner de siempre.
    if (compact) return <SkeletonAsideBlock rows={10} />;

    return (
      <>
        <Box mt='10' fontSize='2xl' fontWeight='bold'>
          Más Vistos
        </Box>
        <Flex align='center' justify='center' h='25vh' direction='column' mt='3'>
          <Spinner size='lg' thickness='3px' />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Box
        mt={compact ? '0' : '10'}
        fontSize={compact ? 'xl' : '2xl'}
        fontWeight='bold'
      >
        Más Vistos
      </Box>
      <Flex as='ul' direction='column' mt='6'>
        {data?.map(
          (
            { id, title, pathUrl }: { id: string; title: string; pathUrl: string },
            index: number,
          ) => (
            <Flex as='li' key={id} gap='2' align='center'>
              <Box
                w={compact ? '26px' : '30px'}
                fontSize={compact ? 'md' : '25px'}
                color='green.600'
                flexShrink={0}
              >
                {index + 1}.
              </Box>
              <Link
                as={NavLink}
                to={`/book/view/${pathUrl}`}
                w={compact ? 'auto' : '185px'}
                flex={compact ? '1' : undefined}
                minW='0'
                textTransform='uppercase'
                my='1'
                fontSize='sm'
                _hover={{ color: 'green.500', outline: 'none' }}
                sx={{
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '-webkit-line-clamp': '2',
                  lineHeight: 1.5,
                  maxHeight: 'calc(1.5em * 2)',
                }}
              >
                {title}
              </Link>
            </Flex>
          ),
        )}
      </Flex>
    </>
  );
}
