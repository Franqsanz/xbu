import React from 'react';
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

type Props = ModalOptionsAndConfirType & {
  onReportBook?: () => void;
};

export function ModalOptions({
  isOpen,
  onClose,
  onDeleteBook,
  onEditBook,
  onReportBook,
}: Props) {
  const bgColorButton = useColorModeValue('green.500', 'green.700');

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xs', md: 'sm' }}
        isCentered
      >
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent>
          <ModalBody py='5'>
            <Flex direction='column' gap='2'>
              {onEditBook && (
                <Button
                  fontWeight='normal'
                  fontSize='sm'
                  onClick={onEditBook}
                  _hover={{ color: 'none' }}
                >
                  Editar
                </Button>
              )}
              {onDeleteBook && (
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
              )}
              {onReportBook && (
                <Button
                  fontWeight='normal'
                  fontSize='sm'
                  onClick={onReportBook}
                  _hover={{ color: 'none' }}
                >
                  Reportar
                </Button>
              )}
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
