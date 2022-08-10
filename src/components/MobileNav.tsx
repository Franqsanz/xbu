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
} from '@chakra-ui/react';

export function MobileNav() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as='header'
      w='100%'
      justify='space-between'
      align='center'
      position='sticky'
      top='0'
      p='2'
      bg='gray.700'
    >
      <IconButton
        onClick={onToggle}
        icon={<FiMenu />}
        aria-label='Menu'
        bg='none'
        ml='5'
        // border='1px'
        // borderColor='#84cc16'
        _hover={{ bg: '#ecfccb', color: '#84cc16' }}
        _active={{ bg: '#ecfccb' }}
      />
      <Box
        as='span'
        bgGradient='linear-gradient(to-l, #2de000, #e9f501)'
        bgClip='text'
        fontSize='3xl'
        fontWeight='bold'
      >
        <Link as={NavLink} to='/'>
          XB
        </Link>
      </Box>
      <Button
        onClick={toggleColorMode}
        bg='none'
        mr='6'
        _active={{ bg: 'none' }}
        _hover={{ color: '#2de000' }}
      >
        {colorMode === 'dark' ? <BsSun size='20' /> : <BsMoon size='20' />}
      </Button>
    </Flex>
  );
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];
