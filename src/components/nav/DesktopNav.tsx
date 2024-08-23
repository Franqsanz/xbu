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

import { navLink, accountLinks } from '../../data/links';
import { MenuProfile } from '@components/nav/menu/MenuProfile';
import { InputSearch } from '@components/forms/filters/InputSearch';
import { ModalFilter } from '@components/modals/ModalFilter';
import { useAuth } from '@contexts/AuthContext';
import { useCheckUser } from '@hooks/queries';

export function DesktopNav() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, refetch } = useCheckUser(uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');
  let profileMenu;

  useEffect(() => {
    if (uid) {
      refetch();
    }
  }, [uid, refetch]);

  if (data) {
    profileMenu = (
      <MenuProfile
        displayName={data.name}
        photoURL={data.picture}
        username={data.username}
      />
    );
  } else {
    profileMenu = accountLinks.map(({ name, href }) => (
      <Link
        key={name}
        as={NavLink}
        to={href as string}
        border='1px'
        borderColor='green.500'
        p='7px'
        rounded='md'
        ml='3'
        _hover={{ bg: 'green.600', outline: 'none' }}
      >
        {name}
      </Link>
    ));
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
        <Flex
          as='nav'
          w='100%'
          maxW={{ base: '1160px', '2xl': '1430px' }}
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
              <Button
                onClick={toggleColorMode}
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
              {profileMenu}
            </List>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
