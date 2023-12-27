import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Image,
} from '@chakra-ui/react';

import { logOut } from '../../../services/firebase/auth';
import { MenuType } from '../../../components/types';

export function MenuProfile({ displayName, photoURL, uid }: MenuType) {
  const navigate = useNavigate();
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
          <Image
            src={photoURL as string}
            w={{ base: '25px', md: '35px' }}
            h={{ base: '25px', md: '35px' }}
            borderRadius='full'
          />
        </MenuButton>
      </Button>
      <MenuList w='250px'>
        <MenuGroup
          title={displayName as string}
          fontSize='md'
          textAlign='center'
        >
          <MenuDivider />
          <MenuItem
            as={NavLink}
            to={`/profile/${uid}`}
            _hover={{ textDecoration: 'none' }}
          >
            Perfil
          </MenuItem>
          <MenuItem
            as={NavLink}
            to='/new-post'
            _hover={{ textDecoration: 'none' }}
          >
            Crear Publicación
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
            onClick={() => {
              logOut();
              navigate('/', { replace: true });
            }}
          >
            Cerrar Sessión
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
