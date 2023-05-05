import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { BsSun } from 'react-icons/bs';
import { RiMoonLine } from 'react-icons/ri';
import {
  Box,
  Flex,
  Button,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  List,
  ListItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';

import { navLink, accountLinks } from '../links';

export function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Flex
        display={{ base: 'block', md: 'none' }}
        w='full'
        justify='start'
        bg={useColorModeValue('#ffffff56', '#12121244')}
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='12px'
        direction='column'
        position='sticky'
        top='0'
        p='2'
        zIndex='999'
      >
        <Flex w='100%' justify='space-between' align='center'>
          <Button
            onClick={onToggle}
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
            {colorMode === 'dark' ? (
              <BsSun size='18' />
            ) : (
              <RiMoonLine size='18' />
            )}
          </Button>
        </Flex>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='xs'>
          <DrawerOverlay bg='#12121211' />
          <DrawerContent
            bg={useColorModeValue('#ffffffcf', '#121212cf')}
            // zIndex='999'
            backdropFilter='auto'
            backdropBlur='12px'
          >
            <DrawerCloseButton />
            <DrawerBody>
              <List mt='10'>
                {navLink.map(({ icon, name, href }) => (
                  <ListItem key={name} my='2'>
                    <Link
                      display='flex'
                      alignItems='center'
                      onClick={onToggle}
                      as={NavLink}
                      to={href as string}
                      p='3'
                      rounded='xl'
                      fontWeight='medium'
                      _hover={{
                        bg: 'gray.700',
                        border: 'none',
                        color: '#2de000',
                      }}
                    >
                      <Icon as={icon} boxSize='5' mr='5' />
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>
            <DrawerFooter justifyContent='flex-start' borderTopWidth='1px'>
              <List w='full'>
                {accountLinks.map(({ name, href }) => (
                  <ListItem key={name} my='2'>
                    <Link
                      display='block'
                      onClick={onToggle}
                      as={NavLink}
                      to={href as string}
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
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}
