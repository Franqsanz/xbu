import React, { useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

// import { MySimpleGrid } from '@components/MySimpleGrid';
// import { Card } from '@components/cards/Card';
// import { Aside } from '@components/Aside';
import { MainHead } from '@components/layout/Head';
// import { useProfile } from '@hooks/queries';
// import { parseDate } from '@utils/utils';
// import { CardType } from '@components/types';
// import ResultLength from '@components/ResultLength';
// import { useAuth } from '@contexts/AuthContext';
import { useAccountActions } from '@hooks/useAccountActions';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
// import { logOut } from '../../services/firebase/auth';

export function MyAccount() {
  // const getToken = window.localStorage.getItem('app_tk');
  const { deleteAccount } = useAccountActions();
  // const { currentUser } = useAuth();
  // const uid = currentUser?.uid;
  // const { username } = useParams();
  // const { data } = useProfile(username, uid, getToken);
  // const bgCover = useColorModeValue('gray.100', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MainHead title={`Mi Cuenta | XBuniverse`} />
      <ContainerTitle title='Mi Cuenta' />
      <Flex justify='center' h='230px' mt='70px'>
        <Button
          fontWeight='normal'
          bg='red.500'
          color='white'
          onClick={onOpen}
          _hover={{ color: 'none' }}
          _active={{ bg: 'red.500' }}
        >
          Eliminar cuenta
        </Button>
        <ModalConfirmation
          isOpen={isOpen}
          title='su cuenta'
          isStrong={false}
          warningText='La eliminación de su cuenta, incluyendo las publicaciones, es irreversible.'
          onDeleteBook={deleteAccount}
          // isPending={ }
          onClose={onClose}
        />
      </Flex>
    </>
  );
}
