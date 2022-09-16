import React from 'react';
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

import { navLink, accountLinks } from '../links';
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
        <Flex w='100%' justify='space-around' align='center'>
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
              {accountLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  as={NavLink}
                  to={href as string}
                  border='1px'
                  borderColor='#2de000'
                  p='2'
                  rounded='lg'
                  mx='3'
                  _hover={{ bg: '#28c900', outline: 'none' }}
                >
                  {name}
                </Link>
              ))}
              <Button
                onClick={toggleColorMode}
                bg='none'
                _active={{ bg: 'none', outline: '2px solid #4299E1' }}
                _hover={{ color: '#2de000' }}
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
      <MobileNav />
    </>
  );
}
