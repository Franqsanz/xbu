import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { BsSun, BsMoon } from 'react-icons/bs';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Button,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  List,
  ListItem,
  Collapse,
} from '@chakra-ui/react';

import { navLink } from '../links';

export function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

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
        backdropBlur='4px'
        direction='column'
        position='sticky'
        top='0'
        p='2'
        zIndex='1'
        animation=''
      >
        <Flex w='100%' justify='space-between' align='center'>
          <Button
            onClick={onToggle}
            // icon={<FiMenu />}
            // size='lg'
            aria-label='Open Menu'
            bg='none'
            ml='4'
            _hover={{ bg: 'none', color: '#2de000' }}
            _active={{ bg: 'none' }}
          >
            {isOpen ? <IoClose fontSize='18' /> : <FiMenu fontSize='18' />}
          </Button>
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
        <Collapse in={isOpen}>
          <Box w='full'>
            <List>
              {navLink.map(({ name, href }) => (
                <ListItem key={name} my='2'>
                  <Link
                    display='block'
                    onClick={onToggle}
                    as={NavLink}
                    to={href as string}
                    mx='5'
                    p='3'
                    rounded='xl'
                    fontWeight='medium'
                    _hover={{
                      bg: 'gray.700',
                      border: 'none',
                      color: '#2de000',
                    }}
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
