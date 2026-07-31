import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';

import { MainHead } from '@components/layout/Head';
import { useAccountActions } from '@hooks/useAccountActions';
import { useCheckUser } from '@hooks/queries';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
import { cldAvatar } from '@utils/images';

export function MyAccount() {
  const { deleteAccount, isPending } = useAccountActions();
  const { data: me } = useCheckUser();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  return (
    <>
      <MainHead title='Mi Cuenta | XBuReads' />
      <ContainerTitle title='Mi Cuenta' />

      <Flex
        direction='column'
        maxW={{ base: 'full', md: '720px' }}
        m='0 auto'
        px={{ base: 5, md: 10 }}
        py={{ base: 6, md: 10 }}
        gap='8'
      >
        <Flex
          direction='column'
          border='1px'
          borderColor={borderColor}
          rounded='lg'
          p={{ base: 4, md: 6 }}
          gap='4'
        >
          <Flex justify='space-between' align='center'>
            <Heading fontSize={{ base: 'md', md: 'lg' }}>Perfil</Heading>
            <Button
              as={NavLink}
              to='/my-account/edit'
              state={{ from: '/my-account' }}
              size='sm'
              leftIcon={<Icon as={FiEdit2} />}
              fontWeight='normal'
            >
              Editar
            </Button>
          </Flex>

          <Flex gap='4' align='center'>
            <Avatar
              size={{ base: 'lg', md: 'xl' }}
              src={cldAvatar(me?.picture, 96)}
              name={me?.name}
              referrerPolicy='no-referrer'
            />
            <Flex direction='column' overflow='hidden'>
              <Text
                fontWeight='semibold'
                fontSize={{ base: 'md', md: 'lg' }}
                noOfLines={1}
              >
                {me?.name ?? '...'}
              </Text>
              <Text fontSize='sm' color={subColor} noOfLines={1}>
                @{me?.username ?? '...'}
              </Text>
              <Text fontSize='xs' color={subColor} noOfLines={1} mt='1'>
                {me?.email ?? ''}
              </Text>
            </Flex>
          </Flex>

          {me?.bio ? (
            <Box>
              <Text fontSize='sm' color={subColor} mb='1'>
                Bio
              </Text>
              <Text fontSize='sm' whiteSpace='pre-wrap'>
                {me.bio}
              </Text>
            </Box>
          ) : (
            <Text fontSize='sm' color={subColor} fontStyle='italic'>
              Aún no agregaste una bio.
            </Text>
          )}
        </Flex>

        <Divider />

        <Flex
          direction='column'
          border='1px'
          borderColor={borderColor}
          rounded='lg'
          p={{ base: 4, md: 6 }}
          gap='3'
        >
          <Heading fontSize={{ base: 'md', md: 'lg' }} color='red.500'>
            Zona peligrosa
          </Heading>
          <Text fontSize='sm' color={subColor}>
            La eliminación de tu cuenta, incluyendo tus publicaciones, comentarios y
            datos relacionados, es irreversible.
          </Text>
          <Button
            alignSelf='flex-start'
            size='sm'
            fontWeight='normal'
            bg='red.500'
            color='white'
            onClick={onOpenDelete}
            _hover={{ bg: 'red.600' }}
            _active={{ bg: 'red.600' }}
          >
            Eliminar cuenta
          </Button>
        </Flex>
      </Flex>

      <ModalConfirmation
        isOpen={isOpenDelete}
        title='su cuenta'
        isStrong={false}
        warningText='La eliminación de su cuenta, incluyendo las publicaciones, es irreversible.'
        onDeleteBook={deleteAccount}
        isPending={isPending}
        onClose={onCloseDelete}
      />
    </>
  );
}
