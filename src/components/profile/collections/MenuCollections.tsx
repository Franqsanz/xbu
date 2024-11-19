import React, { useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

import { useDeleteCollections } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';

export function MenuCollections({ id, name, refetch }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const myToast = useMyToast();
  const { mutate, isSuccess, isPending } = useDeleteCollections();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      myToast({
        title: `Se elimino la colección ${name}.`,
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
  }, [isSuccess]);

  function deleteCollection(id: string) {
    mutate([uid, id]);
  }

  return (
    <>
      <ModalConfirmation
        isOpen={isOpen}
        title={name}
        isStrong={true}
        warningText='La colección será eliminada de manera permanente y no se podrá recuperar.'
        onDeleteBook={() => deleteCollection(id)}
        isPending={isPending}
        onClose={onClose}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<FiMoreVertical />}
          bg='transparent'
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        />
        <MenuList p='0' fontSize='sm'>
          <MenuItem p='2' onClick={onOpen}>
            Eliminar colección
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
