import React, { useRef, useEffect } from 'react';
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
  useOutsideClick,
  DrawerFooter,
} from '@chakra-ui/react';

import { navLink, accountLinks } from '../../constant/constants';
import { InputSearch } from '@components/forms/filters/InputSearch';
import { ModalFilter } from '@components/modals/ModalFilter';
import { MenuProfile } from '@components/nav/menu/MenuProfile';
import { useAuth } from '@contexts/AuthContext';
import { useCheckUser } from '@hooks/queries';
import { currentYear } from '@utils/utils';

export function MobileNav() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { data, refetch } = useCheckUser(uid);
  const containerRef = useRef<HTMLDivElement>(null);
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
  const {
    isOpen: isOpenSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();
  const bgDrawer = useColorModeValue('#ffffffe0', '#121212e4');
  // const bgDrawerSearch = useColorModeValue('#ffffff', '#000000e3');
  const bgNavColor = useColorModeValue('#ffffff8b', '#12121244');
  let profileMenu;
  let linkRegister;

  useEffect(() => {
    if (uid) {
      refetch();
    }
  }, [uid, refetch]);

  useOutsideClick({
    ref: containerRef,
    handler: () => {
      onCloseSearch();
    },
  });

  if (data) {
    profileMenu = (
      <MenuProfile
        displayName={data.name}
        photoURL={data.picture}
        username={data.username}
      />
    );

    linkRegister = null;
  } else {
    linkRegister = (
      <List w='full'>
        {accountLinks.map(({ icon, name, href }) => (
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
    );
  }

  return (
    <>
      <Flex
        as='header'
        w='full'
        justify='start'
        p='2'
        bg={bgNavColor}
        position='sticky'
        top='0'
        boxShadow='sm'
        backdropFilter='auto'
        backdropBlur='12px'
        direction='column'
        zIndex='1'
      >
        <Flex as='nav' w='100%' justify='space-between' align='center'>
          <Flex align='center'>
            <Button
              onClick={onOpenMenu}
              aria-label='Open Menu'
              bg='none'
              _hover={{ bg: 'none', color: 'green.500' }}
              _active={{ bg: 'none' }}
            >
              {isOpenMenu ? <IoClose fontSize='18' /> : <FiMenu fontSize='18' />}
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
              onClick={onOpenSearch}
              bg='none'
              _active={{ bg: 'none' }}
              _hover={{ color: 'green.500' }}
            >
              <FiSearch size='18' />
            </Button>
            <Button
              onClick={toggleColorMode}
              bg='none'
              _active={{ bg: 'none' }}
              _hover={{ color: 'green.500' }}
            >
              {colorMode === 'dark' ? <BsSun size='18' /> : <RiMoonLine size='18' />}
            </Button>
            {profileMenu}
          </Flex>
        </Flex>
        <Drawer placement='top' isOpen={isOpenSearch} onClose={onCloseSearch}>
          <DrawerOverlay bg='none' backdropFilter='blur(7px)' />
          <DrawerContent bg='none' boxShadow='none' ref={containerRef}>
            <DrawerBody overflow='inherit'>
              <InputSearch
                width='full'
                top='47px'
                onOpen={onOpenDFilter}
                onResultClick={onCloseSearch}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <ModalFilter isOpen={isOpenDFilter} onClose={onCloseDFilter} />
        <Drawer isOpen={isOpenMenu} placement='left' onClose={onCloseMenu} size='xs'>
          <DrawerOverlay backdropFilter='blur(5px)' />
          <DrawerContent
            bg={bgDrawer}
            maxW={{ base: '300px', sm: '380px' }}
            borderRight='1px solid #A0AEC0'
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
            <DrawerFooter
              justifyContent='flex-start'
              flexDirection='column'
              borderTopWidth='1px'
            >
              {/* <List w='full'>
                {accountLinks.map(({ icon, name, href }) => (
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
              </List> */}
              {linkRegister}
              <Box fontSize='10px' my='1'>
                {currentYear} XBuniverse
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}
