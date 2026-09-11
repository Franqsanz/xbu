import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
} from '@chakra-ui/react';

import { navLink } from '../../constant/constants';
import { MenuProfile } from '@components/nav/menu/MenuProfile';
import { NotificationsBell } from '@components/notifications/NotificationsBell';
import { InputSearch } from '@components/forms/filters/InputSearch';
import { ModalFilter } from '@components/modals/ModalFilter';
import { CONTENT_MAX_W } from '@components/ui/layout';
import { useAuth } from '@contexts/AuthContext';
import { useCheckUser } from '@hooks/queries';
import { useLoginModalStore } from '@store/useLoginModalStore';

export function DesktopNav() {
  const { currentUser, userData } = useAuth();
  const uid = currentUser?.uid;
  const { refetch } = useCheckUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const openLoginModal = useLoginModalStore((s) => s.open);
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');
  let profileMenu;

  useEffect(() => {
    if (uid) {
      refetch();
    }
  }, [uid, refetch]);

  if (userData) {
    profileMenu = (
      <MenuProfile
        displayName={userData.name}
        photoURL={userData.picture}
        username={userData.username}
      />
    );
  } else {
    profileMenu = (
      <Button
        onClick={() => openLoginModal()}
        border='1px'
        borderColor='green.500'
        bg='transparent'
        p='7px'
        rounded='md'
        ml='3'
        fontWeight='normal'
        _hover={{ bg: 'green.600', outline: 'none' }}
      >
        Ingresar
      </Button>
    );
  }

  return (
    <>
      <Flex
        as='header'
        display={{ base: 'none', lg: 'flex' }}
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
        zIndex='100'
      >
        <Flex
          as='nav'
          w='100%'
          maxW={CONTENT_MAX_W}
          m='auto'
          justify='space-between'
          align='center'
        >
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
                      {href === '/' && userData ? 'Feed' : name}
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
              <Button
                onClick={toggleColorMode}
                aria-label={
                  colorMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
                }
                bg='none'
                ml='3'
                _active={{ bg: 'none', outline: '2px solid #4299E1' }}
                _hover={{ color: 'green.500' }}
              >
                {colorMode === 'dark' ? (
                  <BsSun size='20' />
                ) : (
                  <RiMoonLine size='20' />
                )}
              </Button>
              {userData && <NotificationsBell />}
              {profileMenu}
            </List>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
