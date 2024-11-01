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

import { useCreateCollections } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { DisclosureType } from '@components/types';

interface ModalCollectionType extends DisclosureType {
  refetch: () => void;
}

export function ModalCollection({ isOpen, onClose, refetch }: ModalCollectionType) {
  const [name, setName] = useState<string>('');
  const bgColorBox = useColorModeValue('white', 'gray.900');
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useCreateCollections(uid);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refetch();
      setName('');
      navigate('/my-collections');
    }
  }, [isSuccess, navigate, onClose]);

  function handleNameCollection(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setName(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPending) {
      mutate(name);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'md' }}>
        <ModalOverlay backdropFilter='blur(7px)' />
        <ModalContent overflow='hidden'>
          <ModalHeader bg={bgColorBox}>Crear nueva colección</ModalHeader>
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
                  loadingText='Creando...'
                  _hover={{ outline: 'none', bg: 'green.600' }}
                >
                  Crear
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
