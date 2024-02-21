import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';

// import { MySimpleGrid } from '@components/MySimpleGrid';
// import { Card } from '@components/cards/Card';
// import { Aside } from '@components/Aside';
import { MainHead } from '@components/Head';
// import { useProfile } from '@hooks/querys';
// import { parseDate } from '@utils/utils';
// import { CardType } from '@components/types';
// import ResultLength from '@components/ResultLength';
// import { useAuth } from '@contexts/AuthContext';
import { useAccountActions } from '@hooks/useAccountActions';
import { ContainerTitle } from '@components/ContainerTitle';
// import { logOut } from '../../services/firebase/auth';

export function MyAccount() {
  // const getToken = window.localStorage.getItem('app_tk');
  const { deleteAccount } = useAccountActions();
  // const { currentUser } = useAuth();
  // const uid = currentUser?.uid;
  // const { username } = useParams();
  const navigate = useNavigate();
  // const { data } = useProfile(username, uid, getToken);
  // const bgCover = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <MainHead title={`Mi Cuenta | XBuniverse`} />
      <ContainerTitle title='Mi Cuenta' />
      <Flex justify='center' h='230px' mt='70px'>
        <Button
          bgColor='red.300'
          onClick={() => {
            deleteAccount();
            navigate('/');
          }}
        >
          Eliminar cuenta
        </Button>
      </Flex>
    </>
  );
}
