import React from 'react';
import {
  useColorModeValue,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Button,
  FormControl,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';

import { CgOptions } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

import { ModalFilter } from './ModalFilter';

export function SearchBooks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorIcons = useColorModeValue('gray.700', 'gray.300');
  const bgInput = useColorModeValue('gray.100', 'gray.800');
  const colorInput = useColorModeValue('gray.900', 'gray.100');
  const focusInput = useColorModeValue('white', 'gray.900');
  const hoverButton = useColorModeValue('gray.300', 'black');

  return (
    <>
      <FormControl>
        <InputGroup w='80%' size='lg' m='auto' mt={{ base: 5, md: 10 }}>
          <InputLeftElement w='3rem' p='2'>
            <Icon as={FiSearch} boxSize='20px' color={colorIcons} />
          </InputLeftElement>
          <Input
            type='text'
            fontSize='md'
            bg={bgInput}
            border='1px solid black'
            color={colorInput}
            placeholder='Búscar por titulo'
            _focus={{ bg: `${focusInput}` }}
            _hover={{ outline: 'none' }}
          />
          <InputRightElement justifyContent='flex-end' w='4.5rem' p='2'>
            <Button
              px='0'
              onClick={onOpen}
              bg='none'
              title='Opciones de búsqueda'
              _hover={{
                bg: `${hoverButton}`,
              }}
            >
              <Icon as={CgOptions} boxSize='20px' color={colorIcons} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <ModalFilter isOpen={isOpen} onClose={onClose} />
    </>
  );
}
