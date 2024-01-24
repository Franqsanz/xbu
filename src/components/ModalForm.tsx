import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { FormEdit } from '@components/forms/FormEdit';
import { ModalOptionsAndConfirType } from '@components/types';

export function ModalForm({
  isOpen,
  onClose,
  id,
  title,
  authors,
  synopsis,
  image,
  sourceLink,
  language,
  numberPages,
  year,
  category,
  format,
}: ModalOptionsAndConfirType) {
  const bgColorBox = useColorModeValue('white', 'gray.900');

  const img = {
    url: image?.url || [],
    public_id: image?.public_id || '',
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{ base: 'sm', md: '4xl' }}
      >
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent overflow='hidden'>
          <ModalHeader bg={bgColorBox}>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={bgColorBox}>
            <FormEdit
              id={id || ''}
              title={title || ''}
              authors={authors || []}
              synopsis={synopsis || ''}
              image={img}
              sourceLink={sourceLink || ''}
              language={language || ''}
              numberPages={numberPages || ''}
              year={year || ''}
              category={category || []}
              format={format || ''}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
