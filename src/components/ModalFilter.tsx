import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import Filter from './forms/Filter';
import { ModalProps } from './types';

export function ModalFilter({ isOpen, onClose }: ModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xs', md: 'sm' }}
        isCentered
      >
        <ModalOverlay backdropFilter='blur(5px)' />
        <ModalContent>
          <ModalHeader>Opciones de Búsqueda</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Filter />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
