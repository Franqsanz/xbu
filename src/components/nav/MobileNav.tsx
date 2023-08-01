import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiSearch } from 'react-icons/fi';
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
  Input,
} from '@chakra-ui/react';

import { navLink, accountLinks } from '../links';
import { InputSearch } from '../forms/filters/InputSearch';
import { ModalFilter } from '../forms/filters/ModalFilter';

export function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();
  const {
    isOpen: isOpenDFilter,
    onOpen: onOpenDFilter,
    onClose: onCloseDFilter,
  } = useDisclosure();
  const bgDrawer = useColorModeValue('#ffffffe0', '#121212e4');
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');
  const [isBoxVisible, setBoxVisible] = useState(false);

  function handleClick() {
    setBoxVisible(!isBoxVisible);
  }

  return (
    <>
      <Flex
        as='header'
        w='full'
        justify='start'
        bg={bgNavColor}
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='12px'
        direction='column'
        position='sticky'
        top='0'
        p='2'
        zIndex='999'
      >
        <Flex as='nav' w='100%' justify='space-between' align='center'>
          <Flex align='center'>
            <Button
              onClick={onOpenMenu}
              aria-label='Open Menu'
              bg='none'
              ml='2'
              _hover={{ bg: 'none', color: 'green.500' }}
              _active={{ bg: 'none' }}
            >
              {isOpenMenu ? (
                <IoClose fontSize='18' />
              ) : (
                <FiMenu fontSize='18' />
              )}
            </Button>
            <Box
              as='span'
              bgGradient='linear-gradient(to-l, green.500, #e9f501)'
              bgClip='text'
              fontSize='lg'
              ml='1'
              fontWeight='bold'
            >
              <Link as={NavLink} to='/'>
                XBuniverse
              </Link>
            </Box>
          </Flex>
          <Flex align='center'>
            <Button
              onClick={handleClick}
              bg='none'
              _active={{ bg: 'none' }}
              _hover={{ color: 'green.500' }}
            >
              <FiSearch size='18' />
            </Button>
            <Button
              onClick={toggleColorMode}
              bg='none'
              mr='2'
              _active={{ bg: 'none' }}
              _hover={{ color: 'green.500' }}
            >
              {colorMode === 'dark' ? (
                <BsSun size='18' />
              ) : (
                <RiMoonLine size='18' />
              )}
            </Button>
          </Flex>
        </Flex>
        <Box
          display={isBoxVisible ? 'flex' : 'none'}
          p='2'
          justifyContent='center'
          mx='3'
          mt='3'
        >
          <InputSearch
            width='90%'
            top='120px'
            onOpen={onOpenDFilter}
            onResultClick={handleClick}
          />
          <ModalFilter isOpen={isOpenDFilter} onClose={onCloseDFilter} />
        </Box>
        <Drawer
          isOpen={isOpenMenu}
          placement='left'
          onClose={onCloseMenu}
          size='xs'
        >
          <DrawerOverlay />
          <DrawerContent
            bg={bgDrawer}
            maxW='290px'
            backdropFilter='auto'
            backdropBlur='12px'
            roundedRight='2xl'
          >
            <DrawerCloseButton />
            <DrawerBody>
              <List mt='10'>
                {navLink.map(({ icon, name, href }) => (
                  <ListItem key={name} my='2'>
                    <Link
                      display='flex'
                      alignItems='center'
                      onClick={onCloseMenu}
                      as={NavLink}
                      to={href as string}
                      p='3'
                      rounded='xl'
                      fontWeight='medium'
                      _hover={{
                        bg: 'gray.700',
                        border: 'none',
                        color: 'green.500',
                      }}
                    >
                      <Icon as={icon} boxSize='5' mr='5' />
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>
            {/* <DrawerFooter justifyContent='flex-start' borderTopWidth='1px'>
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
                        color: 'green.500',
                      }}
                    >
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}
