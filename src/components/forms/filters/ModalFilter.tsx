import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import Filter from '@components/forms/filters/Filter';
import { ModalType } from '@components/types';

export function ModalFilter({ isOpen, onClose }: ModalType) {
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
          <ModalHeader>Opciones de Búsqueda</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Filter onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
