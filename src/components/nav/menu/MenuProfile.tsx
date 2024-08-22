import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';

import { useAccountActions } from '@hooks/useAccountActions';
import { MenuType } from '@components/types';

export function MenuProfile({ displayName, photoURL, username }: MenuType) {
  const navigate = useNavigate();
  const { logOut } = useAccountActions();
  const colorBorder = useColorModeValue('black', 'white');

  return (
    <Menu isLazy>
      <Button
        background='none'
        p='0'
        _hover={{ background: 'none' }}
        ml={{ base: '2px', md: 4 }}
        mr={{ base: 2, md: 0 }}
      >
        <MenuButton
          as={Box}
          borderRadius='full'
          _hover={{ border: `2px solid  ${colorBorder}` }}
        >
          <Avatar
            name={displayName as string}
            src={photoURL as string}
            size={{ base: 'xs', md: 'sm' }}
            referrerPolicy='no-referrer'
          />
        </MenuButton>
      </Button>
      <MenuList>
        <MenuGroup title={displayName as string} fontSize='md' textAlign='center'>
          <MenuDivider />
          <MenuItem
            as={NavLink}
            to={`/${username}`}
            _hover={{ textDecoration: 'none' }}
          >
            Perfil
          </MenuItem>
          <MenuItem as={NavLink} to='/new-post' _hover={{ textDecoration: 'none' }}>
            Crear Publicación
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
            onClick={async () => {
              await logOut();
              navigate('/login', { replace: true });
            }}
          >
            Cerrar Sesión
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
