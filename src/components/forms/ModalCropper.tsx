import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { ModalCropperProps } from '../types';

export function ModalCropper({
  children,
  getCropData,
  isOpen,
  onClose,
}: ModalCropperProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: 'xs', md: 'lg' }}
      >
        <ModalOverlay backdropFilter='blur(5px)' />
        <ModalContent>
          <ModalHeader fontSize='md'>Recortar nueva imagen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                getCropData();
              }}
              fontWeight='500'
              border='1px'
              bg={useColorModeValue('green.500', 'green.700')}
              color='black'
              _hover={{ bg: 'green.600' }}
              _active={{ bg: 'green.600' }}
            >
              Cortar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
