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
  headerText = 'Eliminar',
  bodyText,
  buttonText = 'Eliminar',
  loadingText = 'Eliminando...',
  buttonColor = 'red.500',
}: ModalOptionsAndConfirType) {
  const colorIconWar = useColorModeValue('yellow.700', 'yellow.300');

  // Generar el bodyText por defecto si no se proporciona
  const defaultBodyText = `¿Está seguro que desea ${headerText.toLowerCase()} ${isStrong ? `"${title}"` : title}?`;
  const finalBodyText = bodyText || defaultBodyText;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xs', md: 'md' }}
        isCentered
      >
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {finalBodyText}
            {warningText && (
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
            )}
          </ModalBody>
          <ModalFooter gap='3' flexDirection={{ base: 'column-reverse', md: 'row' }}>
            <Button
              w='full'
              onClick={onClose}
              fontSize='sm'
              fontWeight='normal'
              isDisabled={isPending}
              _hover={{ color: 'none' }}
            >
              Cancelar
            </Button>
            <Button
              w='full'
              onClick={onDeleteBook}
              fontWeight='normal'
              fontSize='sm'
              bg={buttonColor}
              color='white'
              loadingText={loadingText}
              isLoading={isPending}
              _hover={{ color: 'none' }}
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
