import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Tag,
  useDisclosure,
} from '@chakra-ui/react';

import { useAccountActions } from '@hooks/useAccountActions';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
import { MenuType } from '@components/types';
import { cldAvatar } from '@utils/images';

export function MenuProfile({ displayName, photoURL, username }: MenuType) {
  const { logOut, isLoggingOut } = useAccountActions();
  const colorBorder = useColorModeValue('black', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleLogout() {
    await logOut();
  }

  return (
    <Menu isLazy>
      {/* El MenuButton era un `Box` (div) dentro de un `Button`: dejaba los
          aria-haspopup/expanded sobre un div sin rol y anidaba dos elementos
          interactivos. Ahora el trigger es un único botón real con nombre. */}
      <MenuButton
        aria-label='Menú de perfil'
        display='block'
        background='none'
        p='0'
        borderRadius='full'
        ml={{ base: '2px', md: 4 }}
        mr={{ base: 2, md: 0 }}
        _hover={{ border: `2px solid  ${colorBorder}` }}
      >
        <Avatar
          name={displayName as string}
          src={cldAvatar(photoURL as string, 32)}
          size={{ base: 'xs', md: 'sm' }}
          referrerPolicy='no-referrer'
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title={displayName as string} fontSize='md' textAlign='center'>
          <MenuDivider />
          <MenuItem
            as={NavLink}
            to={`/profile/${username}`}
            _hover={{ textDecoration: 'none' }}
          >
            Perfil
          </MenuItem>
          <MenuItem as={NavLink} to='/new-post' _hover={{ textDecoration: 'none' }}>
            Publicar
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/my-library'
            _hover={{ textDecoration: 'none' }}
          >
            Mi biblioteca{' '}
            <Tag ml='2' fontSize='xs' colorScheme='green'>
              Nuevo 😮
            </Tag>
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/my-collections'
            _hover={{ textDecoration: 'none' }}
          >
            Mis colecciones
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/my-favorites'
            _hover={{ textDecoration: 'none' }}
          >
            Mis favoritos
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/notifications'
            _hover={{ textDecoration: 'none' }}
          >
            Notificaciones
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/my-account'
            _hover={{ textDecoration: 'none' }}
          >
            Cuenta
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            as={Button}
            fontSize='md'
            m='0'
            fontWeight='normal'
            borderRadius='0'
            justifyContent='left'
            onClick={onOpen}
          >
            Cerrar Sesión
          </MenuItem>
        </MenuGroup>
      </MenuList>
      <ModalConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onDeleteBook={handleLogout}
        headerText='Cerrar sesión'
        bodyText='¿Está seguro que desea cerrar sesión?'
        buttonText='Cerrar sesión'
        loadingText='Cerrando sesión...'
        buttonColor='orange.500'
        isPending={isLoggingOut}
      />
    </Menu>
  );
}
