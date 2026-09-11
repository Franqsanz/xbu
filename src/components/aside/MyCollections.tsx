import { NavLink } from 'react-router-dom';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { FiFolder } from 'react-icons/fi';

import { useCollections } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { SkeletonAsideBlock } from '@components/skeletons/SkeletonAside';

type Collection = {
  id: string;
  name: string;
};

/** Cuántas colecciones entran en el rail antes de mandar al listado completo. */
const MAX_ITEMS = 4;

export function MyCollections() {
  const { currentUser } = useAuth();
  const { data, isPending } = useCollections(currentUser?.uid);

  if (isPending) {
    return <SkeletonAsideBlock rows={MAX_ITEMS} />;
  }

  const collections: Collection[] = (data?.collections || []).slice(0, MAX_ITEMS);

  // Sin colecciones creadas el bloque no aporta nada.
  if (collections.length === 0) return null;

  return (
    <Box>
      <Box fontSize='xl' fontWeight='bold'>
        Tus colecciones
      </Box>
      <Flex as='ul' direction='column' mt='6' gap='2'>
        {collections.map(({ id, name }) => (
          <Flex as='li' key={id} align='center' gap='2'>
            <Icon as={FiFolder} color='green.600' fontSize='lg' flexShrink={0} />
            <Link
              as={NavLink}
              to={`/my-collections/collection/${id}`}
              fontSize='md'
              minW='0'
              flex='1'
              noOfLines={1}
              _hover={{ color: 'green.500', outline: 'none' }}
            >
              {name}
            </Link>
          </Flex>
        ))}
      </Flex>
      <Link
        as={NavLink}
        to='/my-collections'
        display='inline-block'
        mt='3'
        fontSize='sm'
        color='gray.500'
        _hover={{ color: 'green.500', outline: 'none' }}
      >
        Ver todas
      </Link>
    </Box>
  );
}
