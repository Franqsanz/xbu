import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsSun, BsMoon } from 'react-icons/bs';
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

import { navLink } from '../links';
import { MobileNav } from './MobileNav';

export function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        display={{ base: 'none', md: 'block' }}
        as='header'
        w='100%'
        align='center'
        justify='space-between'
        p='2'
        bg={useColorModeValue('#ffffff56', '#12121244')}
        position='sticky'
        top='0'
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='12px'
        zIndex='1'
      >
        <Flex w='100%' justify='space-between' align='center'>
          <Box
            as='span'
            bgGradient='linear-gradient(to-l, #2de000, #e9f501)'
            bgClip='text'
            fontSize='2xl'
            fontWeight='bold'
            ml='5'
          >
            <Link as={NavLink} to='/'>
              XB
            </Link>
          </Box>
          <Box as='nav' mr='5'>
            <List display='flex' alignItems='center'>
              {navLink.map(({ name, href }) => (
                <ListItem key={name}>
                  <Link
                    as={NavLink}
                    to={href as string}
                    mx='5'
                    py='1'
                    fontWeight='medium'
                    _activeLink={{
                      borderBottom: '2px',
                      borderColor: '#2de000',
                    }}
                    _hover={{ color: '#2de000' }}
                  >
                    {name}
                  </Link>
                </ListItem>
              ))}
              <Button
                onClick={toggleColorMode}
                bg='none'
                _active={{ bg: 'none' }}
                _hover={{ color: '#2de000' }}
              >
                {colorMode === 'dark' ? (
                  <BsSun size='20' />
                ) : (
                  <BsMoon size='20' />
                )}
              </Button>
            </List>
          </Box>
        </Flex>
      </Flex>
      <MobileNav />
    </>
  );
}
