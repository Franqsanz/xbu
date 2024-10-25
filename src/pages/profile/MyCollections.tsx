import React from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ScrollRestoration } from 'react-router-dom';
import { TbPlaylistAdd } from 'react-icons/tb';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';
import { collections } from '@assets/assets';
import { MyContainer } from '@components/ui/MyContainer';
import { ModalCollection } from '@components/modals/ModalCollection';
import { useCollections, useDeleteCollections } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { parseDate } from '@utils/utils';

export function MyCollections() {
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const grayColor = useColorModeValue('#E2E8F0', '#2D3748');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, refetch } = useCollections(uid);
  const { mutate, isSuccess } = useDeleteCollections();
  let collectionsUI;

  function deleteCollection(id: string) {
    mutate([uid, id]);
  }

  if (isSuccess) {
    refetch();
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
      <Flex gap='7' mt='14' flexWrap='wrap'>
        {data?.collections.map(({ id, name, createdAt }) => (
          <Flex
            key={id}
            w={{ base: 'full', sm: '200px' }}
            h={{ base: '120px', sm: '170px' }}
            boxShadow='2xl'
            border='1px solid #A0AEC0'
            rounded='lg'
            p='2'
            justify='center'
            position='relative'
          >
            <Flex
              direction='column'
              mb='3'
              position='absolute'
              bottom='0'
              textAlign='center'
            >
              <Box mb='3'>
                <Box mb='1'>{name}</Box>
                <Box fontSize='xs'>{parseDate(createdAt)}</Box>
              </Box>
              <Button
                w='full'
                h='30px'
                px='0'
                m='auto'
                fontSize='xs'
                onClick={() => deleteCollection(id)}
                fontWeight='normal'
                bg='red.500'
                color='white'
                // loadingText='Eliminando...'
                // isLoading={isPending}
                _hover={{ color: 'none' }}
              >
                Eliminar
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return (
    <>
      <MainHead title='Mis colecciones | XBuniverse' />
      <ContainerTitle title='Mis colecciones' />
      <ScrollRestoration />
      <ModalCollection isOpen={isOpen} onClose={onClose} refetch={refetch} />
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
          {data?.totalCollections} Colecciones
          <Button
            fontWeight='500'
            onClick={onOpen}
            size='sm'
            border='1px'
            bg={bgColorButton}
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
          >
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
