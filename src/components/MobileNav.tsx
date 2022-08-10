import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  List,
  ListItem,
  Collapse,
} from '@chakra-ui/react';

import { navLink } from './links';

export function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex
        display={{ base: 'block', md: 'none' }}
        as='header'
        w='full'
        justify='start'
        bg={useColorModeValue('#ffffff56', '#12121244')}
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='5px'
        direction='column'
        position='sticky'
        top='0'
        p='2'
        zIndex='1'
        animation=''
      >
        <Flex
          w='100%'
          justify='space-between'
          align='center'
        >
          <IconButton
            onClick={onToggle}
            icon={<FiMenu />}
            size='lg'
            aria-label='Menu'
            bg='none'
            ml='4'
            _hover={{ bg: 'none', border: '1px', borderColor: '#2de000' }}
            _active={{ bg: 'none' }}
          />
          <Box
            as='span'
            bgGradient='linear-gradient(to-l, #2de000, #e9f501)'
            bgClip='text'
            fontSize='xl'
            fontWeight='bold'
          >
            <Link as={NavLink} to='/'>
              XB
            </Link>
          </Box>
          <Button
            onClick={toggleColorMode}
            bg='none'
            mr='4'
            _active={{ bg: 'none' }}
            _hover={{ color: '#2de000' }}
          >
            {colorMode === 'dark' ? <BsSun size='18' /> : <BsMoon size='18' />}
          </Button>
        </Flex>
        <Collapse
          in={isOpen}
        >
          <Box w='full'>
            <List>
              {navLink.map(({ name, href }) => (
                <ListItem
                  key={name}
                  my='2'
                >
                  <Link
                    display='block'
                    as={NavLink}
                    to={href}
                    mx='5'
                    p='3'
                    rounded='xl'
                    fontWeight='medium'
                    _hover={{ bg: 'gray.700', border: 'none', color: '#2de000' }}
                  >
                    {name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </Flex>
    </>
  );
}
