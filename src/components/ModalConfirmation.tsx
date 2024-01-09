import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Box,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';

import { ModalOptionsAndConfirType } from './types';

export function ModalConfirmation({
  isOpen,
  onClose,
  onDeleteBook,
  name,
  isPending,
}: ModalOptionsAndConfirType) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent>
          <ModalHeader>Eliminar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro que desea eliminar{' '}
            <Box as='span' fontWeight='bold'>
              "{name}"
            </Box>
            ?
            <Alert
              mt='6'
              status='warning'
              variant='left-accent'
              borderRightRadius='lg'
              fontSize='sm'
            >
              <AlertIcon />
              El libro será eliminado de manera permanente y no se podrá
              recuperar.
            </Alert>
          </ModalBody>
          <ModalFooter gap='3'>
            <Button
              w='full'
              onClick={onDeleteBook}
              fontWeight='normal'
              fontSize='sm'
              loadingText='Eliminando...'
              isLoading={isPending}
              _hover={{ color: 'none' }}
            >
              Eliminar
            </Button>
            <Button
              w='full'
              onClick={onClose}
              fontSize='sm'
              fontWeight='normal'
              _hover={{ color: 'none' }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
