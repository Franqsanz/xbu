import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsSun } from 'react-icons/bs';
import { RiMoonLine } from 'react-icons/ri';
import {
  Flex,
  Box,
  Link,
  ListItem,
  List,
  Button,
  useColorMode,
  useColorModeValue,
  useDisclosure,
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

import { navLink, accountLinks } from '../../data/links';
import { InputSearch } from '../forms/filters/InputSearch';
import { ModalFilter } from '../forms/filters/ModalFilter';
import { useAuth } from '../../store/AuthContext';
import { handleSignOut } from '../../services/firebase/auth';

export function DesktopNav() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');
  let profileMenu;

  if (currentUser) {
    profileMenu = (
      <Menu isLazy>
        <Button background='none' p='0' _hover={{ background: 'none' }} ml='2'>
          <MenuButton
            as={Box}
            borderRadius='full'
            _hover={{ border: '2px solid white' }}
          >
            <Image
              src={currentUser?.photoURL as string}
              w='35px'
              h='35px'
              borderRadius='full'
            />
          </MenuButton>
        </Button>
        <MenuList>
          <MenuGroup
            title={currentUser?.displayName as string}
            fontSize='md'
            textAlign='center'
          >
            <MenuItem
              as={NavLink}
              to={`/profile/${currentUser?.uid}`}
              icon={<FaRegUserCircle size='17' />}
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
                handleSignOut();
                navigate('/');
              }}
            >
              Cerrar Sessión
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  }

  return (
    <>
      <Flex
        as='header'
        w='100%'
        align='center'
        justify='space-between'
        p='2'
        bg={bgNavColor}
        position='sticky'
        top='0'
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='12px'
        zIndex='1'
      >
        <Flex as='nav' w='100%' justify='space-around' align='center'>
          <Flex align='center'>
            <Box
              as='span'
              bgGradient='linear-gradient(to-l, green.500, #e9f501)'
              bgClip='text'
              fontSize='2xl'
              fontWeight='bold'
            >
              <Link as={NavLink} to='/'>
                XB
              </Link>
            </Box>
            <Box>
              <List display='flex' alignItems='center'>
                {navLink.map(({ name, href }) => (
                  <ListItem key={name}>
                    <Link
                      as={NavLink}
                      to={href as string}
                      ml='7'
                      fontWeight='medium'
                      _activeLink={{
                        borderBottom: '2px',
                        borderColor: 'green.500',
                      }}
                      _hover={{ color: 'green.500' }}
                    >
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
          <Box>
            <List display='flex' alignItems='center'>
              <InputSearch width='300px' top='47px' onOpen={onOpen} />
              <ModalFilter isOpen={isOpen} onClose={onClose} />
              {/* {user ? (
                <Link
                  as={NavLink}
                  to='/profile'
                  ml='7'
                  fontWeight='medium'
                  _activeLink={{
                    borderBottom: '2px',
                    borderColor: 'green.500',
                  }}
                  _hover={{ color: 'green.500' }}
                >
                  Perfil
                </Link>
              ) : (
                accountLinks.map(({ name, href }) => (
                  <Link
                    key={name}
                    as={NavLink}
                    to={href as string}
                    border='1px'
                    borderColor='green.500'
                    p='2'
                    rounded='lg'
                    mx='2'
                    _hover={{ bg: 'green.600', outline: 'none' }}
                  >
                    {name}
                  </Link>
                ))
              )} */}
              <Button
                onClick={toggleColorMode}
                bg='none'
                ml='1'
                _active={{ bg: 'none', outline: '2px solid #4299E1' }}
                _hover={{ color: 'green.500' }}
              >
                {colorMode === 'dark' ? (
                  <BsSun size='20' />
                ) : (
                  <RiMoonLine size='20' />
                )}
              </Button>
              {profileMenu}
            </List>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
