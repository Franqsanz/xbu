import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { ModalOptionsAndConfirType } from '@components/types';

export function ModalOptions({
  isOpen,
  onClose,
  onDeleteBook,
  onEditBook,
}: ModalOptionsAndConfirType) {
  const bgColorButton = useColorModeValue('green.500', 'green.700');

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xs'>
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent>
          <ModalBody py='5'>
            <Flex direction='column' gap='2'>
              <Button
                bg='red.500'
                color='white'
                fontWeight='normal'
                fontSize='sm'
                onClick={onDeleteBook}
                _hover={{ color: 'none' }}
              >
                Eliminar
              </Button>
              <Button
                fontWeight='normal'
                fontSize='sm'
                onClick={onEditBook}
                _hover={{ color: 'none' }}
              >
                Editar
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent='center'>
            <Button
              w='full'
              onClick={onClose}
              fontSize='sm'
              border='1px'
              bg={bgColorButton}
              color='black'
              _hover={{ bg: 'green.600' }}
              _active={{ bg: 'green.600' }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
