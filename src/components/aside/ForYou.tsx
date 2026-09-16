import { NavLink } from 'react-router-dom';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

import { useRecommendations } from '@hooks/queries';
import { SkeletonAsideBlock } from '@components/skeletons/SkeletonAside';
import { ASIDE_LIST_MAX_H, THIN_SCROLLBAR } from '@components/ui/layout';
import { cldImg } from '@utils/images';

type RecommendedBook = {
  id: string;
  title: string;
  pathUrl: string;
  image?: { url: string };
  category: string[];
};

/**
 * Es también el `limit` que pedimos al back, que topea en 10. Ojo que si con tu
 * perfil no hay tantos libros sin ver en tus categorías afines, van a llegar
 * menos: preferimos devolver de menos antes que rellenar con cosas sin relación.
 */
const MAX_ITEMS = 10;

export function ForYou() {
  const { data, isLoading } = useRecommendations(MAX_ITEMS);

  if (isLoading) {
    return (
      <SkeletonAsideBlock rows={MAX_ITEMS} media='cover' maxH={ASIDE_LIST_MAX_H} />
    );
  }

  const books: RecommendedBook[] = data?.books || [];

  // Sin señales suficientes el back devuelve vacío a propósito: preferimos no
  // mostrar nada antes que presentar "los más vistos" como algo personalizado.
  if (books.length === 0) return null;

  return (
    <Box>
      <Box fontSize='xl' fontWeight='bold'>
        Para vos
      </Box>
      <Flex
        as='ul'
        direction='column'
        mt='6'
        gap='4'
        maxH={ASIDE_LIST_MAX_H}
        overflowY='auto'
        pr='2'
        // Sin esto, al llegar al final el scroll sigue en el riel de atrás.
        overscrollBehavior='contain'
        sx={THIN_SCROLLBAR}
      >
        {books.map(({ id, title, pathUrl, image, category }) => (
          <Box as='li' key={id}>
            <Link
              as={NavLink}
              to={`/book/view/${pathUrl}`}
              display='flex'
              gap='3'
              alignItems='center'
              _hover={{ color: 'green.500', outline: 'none' }}
            >
              <Image
                src={cldImg(image?.url, { w: 48, h: 72 })}
                alt=''
                w='48px'
                h='72px'
                flexShrink={0}
                objectFit='cover'
                rounded='md'
              />
              <Flex direction='column' gap='1' minW='0' flex='1'>
                {category?.[0] && (
                  <Text
                    fontSize='xs'
                    color='green.500'
                    textTransform='uppercase'
                    noOfLines={1}
                  >
                    {category[0]}
                  </Text>
                )}
                <Text
                  fontSize='md'
                  lineHeight='1.4'
                  sx={{
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '-webkit-line-clamp': '2',
                  }}
                >
                  {title}
                </Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
