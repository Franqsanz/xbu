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
import { FaRegUserCircle } from 'react-icons/fa';
import { FaPowerOff } from 'react-icons/fa6';
import { logOut } from '../../../services/firebase/auth';

interface MenuType {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}

export function MenuProfile({ displayName, photoURL, uid }: MenuType) {
  const navigate = useNavigate();
  const colorBorder = useColorModeValue('black', 'white');

  return (
    <Menu isLazy>
      <Button background='none' p='0' _hover={{ background: 'none' }} ml='4'>
        <MenuButton
          as={Box}
          borderRadius='full'
          _hover={{ border: `2px solid  ${colorBorder}` }}
        >
          <Image
            src={photoURL as string}
            w='35px'
            h='35px'
            borderRadius='full'
          />
        </MenuButton>
      </Button>
      <MenuList>
        <MenuGroup
          title={displayName as string}
          fontSize='md'
          textAlign='center'
        >
          <MenuItem
            as={NavLink}
            to={`/profile/${uid}`}
            icon={<FaRegUserCircle size='15px' />}
            _hover={{ textDecoration: 'none' }}
          >
            Perfil
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
            icon={<FaPowerOff size='15px' />}
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
