import React from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { MainHead } from '@components/layout/Head';
import { useAccountActions } from '@hooks/useAccountActions';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';

export function MyAccount() {
  const { deleteAccount, isPending } = useAccountActions();
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
          isPending={isPending}
          onClose={onClose}
        />
      </Flex>
    </>
  );
}
