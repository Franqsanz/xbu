import React from 'react';
import { NavLink, ScrollRestoration } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { TbPlaylistAdd } from 'react-icons/tb';
import { FiArrowRight } from 'react-icons/fi';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';
import { collections } from '@assets/assets';
import { MyContainer } from '@components/ui/MyContainer';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { ModalCollection } from '@components/modals/ModalCollection';
import { SkeletonACollections } from '@components/skeletons/SkeletonACollections';
import { useCollections } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { parseDate } from '@utils/utils';
import { MenuCollections } from '@components/profile/collections/MenuCollections';

export function AllCollections() {
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const bgRandomBookCardLink = useColorModeValue('green.50', 'green.900');
  const colorLink = useColorModeValue('green.900', 'green.50');
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, refetch, isPending } = useCollections(uid);
  let collectionsUI;

  if (isPending) {
    return <SkeletonACollections />;
  }

  if (!data || !data?.collections || data?.collections.length === 0) {
    collectionsUI = (
      <Flex
        w='full'
        direction='column'
        justify='center'
        align='center'
        mt='20'
        mb='10'
      >
        <Image
          src={collections}
          maxW='full'
          w={{ base: '250px', md: '350px' }}
          mt='5'
        />
        <Box
          my='7'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Aún no tienes colecciones creadas
        </Box>
      </Flex>
    );
  } else {
    collectionsUI = (
      <MySimpleGrid gap={5}>
        {data?.collections.map(({ id, name, createdAt }) => (
          <>
            <Flex
              w={{ base: 'full', md: '250px' }}
              h={{ base: '200px', sm: '210px' }}
              boxShadow='xl'
              border='1px solid #A0AEC0'
              rounded='lg'
              direction='column'
              justifyContent={{ base: 'space-between', md: 'flex-start' }}
              justify='center'
              position='relative'
            >
              <Flex w='full' justify='flex-end'>
                <MenuCollections id={id} name={name} refetch={refetch} />
              </Flex>
              <Flex w='full' direction='column' textAlign='center' gap='3'>
                <Box mb='4'>
                  <Box mb='1' fontSize={{ base: 'sm', md: 'lg' }}>
                    {name}
                  </Box>
                  <Box fontSize={{ base: '9px', sm: '10px' }}>
                    {parseDate(createdAt)}
                  </Box>
                </Box>
                <Link
                  as={NavLink}
                  to={`/my-collections/collection/${id}`}
                  w='full'
                  bg={bgRandomBookCardLink}
                  py='4'
                  px='7'
                  color={colorLink}
                  position={{ base: 'initial', md: 'absolute' }}
                  bottom='0'
                  roundedBottom='lg'
                  tabIndex={-1}
                  _hover={{ outline: 'none' }}
                >
                  <Flex
                    align='center'
                    justify={{ base: 'center', md: 'flex-start' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    Abrir
                    <Icon as={FiArrowRight} ml='2' />
                  </Flex>
                </Link>
              </Flex>
            </Flex>
          </>
        ))}
      </MySimpleGrid>
    );
  }

  return (
    <>
      <MainHead title='Mis colecciones | XBuniverse' />
      <ContainerTitle title='Mis colecciones' />
      <ScrollRestoration />
      <ModalCollection
        title='Crear colección'
        textButton='Crear'
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
      />
      <Flex m='0 auto'>
        <Flex
          w={{ base: '1315px', '2xl': '1580px' }}
          mt='4'
          pb='3'
          px={{ base: '6', md: '20', sm: '10' }}
          borderBottom={`1px solid ${grayColor}`}
          justify='space-between'
          align='center'
          fontSize='lg'
        >
          {data?.totalCollections ?? 0}{' '}
          {data?.totalCollections === 1 ? 'Colección' : 'Colecciones'}
          <Button fontWeight='500' onClick={onOpen} size='sm'>
            <Flex align='center' justify='center'>
              <Icon as={TbPlaylistAdd} fontSize='25' mr='1' />
              <Box as='span' display={{ base: 'none', md: 'block' }}>
                Nueva colección
              </Box>
            </Flex>
          </Button>
        </Flex>
      </Flex>
      <MyContainer>{collectionsUI}</MyContainer>
    </>
  );
}
