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

import { ModalFilter } from '../../components/ModalFilter';

export function SearchBooks() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FormControl>
        <InputGroup w='80%' size='lg' m='auto' mt='10'>
          <InputLeftElement w='3rem' p='2'>
            <Icon
              as={FiSearch}
              boxSize='20px'
              color={useColorModeValue('gray.700', 'gray.300')}
            />
          </InputLeftElement>
          <Input
            type='text'
            bg={useColorModeValue('gray.100', 'gray.800')}
            border='1px solid black'
            color={useColorModeValue('gray.900', 'gray.100')}
            placeholder='Búscar por titulo'
            _hover={{ outline: 'none' }}
          />
          <InputRightElement w='4.5rem' p='2'>
            <Button
              onClick={onOpen}
              aria-label='Opciones de búsqueda'
              bg='none'
              title='Opciones de búsqueda'
              _hover={{
                bg: `${useColorModeValue('gray.300', 'black')}`,
              }}
            >
              <Icon
                as={CgOptions}
                boxSize='20px'
                color={useColorModeValue('gray.700', 'gray.300')}
              />
            </Button>
            <ModalFilter isOpen={isOpen} onClose={onClose} />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
}
