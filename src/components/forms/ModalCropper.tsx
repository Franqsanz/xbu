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
  Flex,
  Icon,
} from '@chakra-ui/react';
import { RiScissorsCutFill } from 'react-icons/ri';

import { ModalCroppType } from '@components/types';

export function ModalCropper({
  children,
  getCropData,
  isOpen,
  onClose,
}: ModalCroppType) {
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
              w={{ base: 'full', md: 'auto' }}
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
              <Flex align='center' justify='center'>
                <Icon as={RiScissorsCutFill} fontSize='20' mr='2' />
                Cortar Imagen
              </Flex>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
