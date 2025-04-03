import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { useCreateCollections, useUpdateCollectionName } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { DisclosureType } from '@components/types';
import { useMyToast } from '@hooks/useMyToast';

interface ModalCollectionType extends DisclosureType {
  title: string;
  textButton: string;
  nameCollection?: string;
  collectionId?: string; // Añade el ID de la colección
  isEditing?: boolean; // Añade un flag para saber si estamos editando
  refetch: () => void;
}

export function ModalCollection({
  title,
  textButton,
  nameCollection,
  collectionId,
  isEditing = false,
  isOpen,
  onClose,
  refetch,
}: ModalCollectionType) {
  const [name, setName] = useState<string>('');
  const bgColorBox = useColorModeValue('white', 'gray.900');
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const navigate = useNavigate();
  const myToast = useMyToast();

  // Añade el mutation para actualizar
  const updateMutation = useUpdateCollectionName(uid, collectionId);
  const createMutation = useCreateCollections(uid);

  // Usa la mutation correspondiente según isEditing
  const { mutate, isPending, isSuccess, isError } = isEditing
    ? updateMutation
    : createMutation;

  // Carga el nombre inicial si estamos editando
  useEffect(() => {
    if (isEditing && nameCollection) {
      setName(nameCollection);
    }
  }, [isEditing, nameCollection]);

  useEffect(() => {
    if (isError) {
      myToast({
        title: 'Error al crear la colección',
        description: 'El nombre no debe superar los 25 caracteres.',
        icon: IoWarningSharp,
        iconColor: 'red.400',
        bgColor: 'black',
        width: '200px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 6,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refetch();
      setName('');

      // Solo navega a /my-collections si estamos creando
      if (!isEditing) {
        navigate('/my-collections');
      }

      myToast({
        title: isEditing
          ? 'Se actualizó la colección.'
          : 'Se creó una nueva colección.',
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '200px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }, [isSuccess, navigate, onClose, isEditing]);

  function handleNameCollection(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPending) {
      if (isEditing) {
        mutate(name);
      } else {
        mutate(name);
      }
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
          <ModalHeader bg={bgColorBox}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={bgColorBox}>
            <form onSubmit={handleSubmit}>
              <Flex direction='column' gap='5' pb='2'>
                <FormControl isRequired>
                  <FormLabel htmlFor='nameCollection'>Nombre</FormLabel>
                  <Input
                    value={name}
                    onChange={handleNameCollection}
                    size='lg'
                    fontSize='sm'
                    name='name'
                    maxLength={25}
                    bg={bgColorInput}
                  />
                </FormControl>
                <Button
                  type='submit'
                  size='lg'
                  bg='green.500'
                  color='black'
                  p='5'
                  fontWeight='normal'
                  border='1px'
                  rounded='lg'
                  isDisabled={!name || isPending}
                  isLoading={isPending}
                  loadingText={isEditing ? 'Actualizando...' : 'Creando...'}
                  _hover={{ outline: 'none', bg: 'green.600' }}
                >
                  {textButton}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
