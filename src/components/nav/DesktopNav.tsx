import React, { useEffect, useState, useRef } from 'react';
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
import { InputSearch } from '../forms/filters/InputSearch';
import { ModalFilter } from '../forms/filters/ModalFilter';

export function DesktopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');

  // let user = false;
  // const [user, setUser] = useState(null);
  // console.log(user);

  // useEffect(() => {
  //   fetch('http://localhost:9090/auth/login/check-user', {
  //     method: 'GET',
  //     // credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Credentials': true,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       throw new Error('authentication has been failed!');
  //     })
  //     .then((resObject) => {
  //       // setUser(resObject.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
        zIndex='999'
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
                _active={{ bg: 'none', outline: '2px solid #4299E1' }}
                _hover={{ color: 'green.500' }}
              >
                {colorMode === 'dark' ? (
                  <BsSun size='20' />
                ) : (
                  <RiMoonLine size='20' />
                )}
              </Button>
            </List>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
