import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import { ModalCollectionSelectorType } from '@components/types';
import { useCollectionBooks } from '@hooks/queries';
import { useMyToast } from '@hooks/useMyToast';

export function ModalCollectionSelector({
  userId,
  bookId,
  data,
  isPending,
  isOpen,
  onClose,
}: ModalCollectionSelectorType) {
  const [selectedCollections, setSelectedCollections] = useState<{
    [key: string]: boolean;
  }>({});

  const bgColorBox = useColorModeValue('white', 'gray.900');
  const myToast = useMyToast();
  const { mutate, isPending: isPendingMutate } = useCollectionBooks();

  useEffect(() => {
    // Inicializa el estado de selección basado en la propiedad 'checked' de los datos
    const initialSelectedState =
      data?.reduce(
        (acc, collection) => {
          acc[collection.id] = collection.checked || false;
          return acc;
        },
        {} as { [key: string]: boolean },
      ) || {};

    setSelectedCollections(initialSelectedState);
  }, [bookId, data]);

  function handleCheckboxChange(collectionId: string) {
    setSelectedCollections((prev) => {
      const newSelectedState = {
        ...prev,
        [collectionId]: !prev[collectionId],
      };
      return newSelectedState;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPendingMutate) {
      // Preparar los datos para el mutate
      const collections = data?.map((collection) => ({
        collectionId: collection.id,
        collectionName: collection.name,
        isInCollection: selectedCollections[collection.id] || false,
      }));

      const mutateData = {
        userId,
        collections,
        bookId,
        checked: true,
      };

      mutate(mutateData, {
        onSuccess: () => {
          // Obtener nombres de colecciones seleccionadas
          const selectedCollectionNames = data
            ?.filter((collection) => selectedCollections[collection.id])
            .map((collection) => collection.name)
            .join(', ');

          myToast({
            title: `Se agregó a colección(es): ${selectedCollectionNames}`,
            icon: FaCheckCircle,
            iconColor: 'green.700',
            bgColor: 'black',
            width: '300px',
            color: 'whitesmoke',
            align: 'center',
            padding: '1',
            fntSize: 'md',
            bxSize: 5,
          });

          onClose();
        },
        onError: () => {
          myToast({
            title: 'Error al actualizar colecciones',
            description: 'Ocurrió un problema al modificar las colecciones',
            icon: FaExclamationCircle,
            iconColor: 'red.700',
            bgColor: 'black',
            width: '300px',
            color: 'whitesmoke',
            align: 'center',
            padding: '1',
            fntSize: 'md',
            bxSize: 5,
          });
        },
      });
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xs', sm: 'md' }}
        isCentered
      >
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent overflow='hidden'>
          <ModalHeader bg={bgColorBox}>Agregar a colección</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={bgColorBox} p='5'>
            <Box as='form' onSubmit={handleSubmit}>
              <VStack spacing='4' align='stretch' mb='7'>
                {isPending ? (
                  <Box m='auto' py='5'>
                    <Spinner size='lg' />
                  </Box>
                ) : (
                  data?.map((collection) => (
                    <Checkbox
                      key={collection.id}
                      isChecked={selectedCollections[collection.id] || false}
                      onChange={() => handleCheckboxChange(collection.id)}
                      colorScheme='green'
                    >
                      {collection.name}
                    </Checkbox>
                  ))
                )}
              </VStack>
              <Button
                w='full'
                type='submit'
                size='lg'
                bg='green.500'
                color='black'
                p='5'
                fontWeight='normal'
                border='1px'
                rounded='lg'
                isDisabled={
                  Object.values(selectedCollections).filter(Boolean).length === 0 ||
                  isPendingMutate
                }
                isLoading={isPendingMutate}
                _hover={{ outline: 'none', bg: 'green.600' }}
              >
                Confirmar
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
