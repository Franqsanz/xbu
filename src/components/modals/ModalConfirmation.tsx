import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Alert,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { ModalOptionsAndConfirType } from '@components/types';

export function ModalConfirmation({
  isOpen,
  onClose,
  onDeleteBook,
  title,
  warningText,
  isPending,
  isStrong,
}: ModalOptionsAndConfirType) {
  const colorIconWar = useColorModeValue('yellow.700', 'yellow.300');

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent>
          <ModalHeader>Eliminar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro que desea eliminar{' '}
            {isStrong ? <strong>"{title}"</strong> : title}?
            <Alert
              mt='7'
              status='warning'
              rounded='lg'
              fontSize={{ base: 'xs', md: 'sm' }}
            >
              <Icon
                as={IoWarningOutline}
                boxSize='7'
                mr='3'
                color={colorIconWar}
              />
              {warningText}
            </Alert>
          </ModalBody>
          <ModalFooter gap='3'>
            <Button
              w='full'
              onClick={onDeleteBook}
              fontWeight='normal'
              fontSize='sm'
              bg='red.500'
              color='white'
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
