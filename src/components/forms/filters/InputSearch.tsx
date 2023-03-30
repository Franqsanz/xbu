import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Button,
  FormControl,
  Icon,
  Container,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react';

import { CgOptions } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

import { Book } from '../../types';
import { useAllBooks } from '../../../hooks/querys';

interface Props {
  onOpen: () => void;
}

export function InputSearch({ onOpen }: Props) {
  const colorIcons = useColorModeValue('gray.700', 'gray.300');
  const bgInput = useColorModeValue('gray.50', 'gray.800');
  const colorInput = useColorModeValue('gray.900', 'gray.100');
  const focusInput = useColorModeValue('white', 'gray.900');
  const hoverButton = useColorModeValue('gray.300', 'black');
  const colorContainerBg = useColorModeValue('white', 'gray.800');
  const colorContainer = useColorModeValue('black', 'gray.50');
  const colorListBg = useColorModeValue('gray.200', 'gray.700');
  const colorListBgHover = useColorModeValue('gray.300', 'gray.600');
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState({ query: '' });
  let alertMessage;

  const { data } = useAllBooks();

  useEffect(() => {
    if (data && data.results) setBooks(data.results);
  }, [data]);

  const filteredBooks = useMemo(() => {
    if (!data) return [];
    const { query } = search;

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()),
    );
  }, [books, search, data]);

  if (filteredBooks.length === 0) {
    alertMessage = <Box fontSize='md'>No se encontraron resultados.</Box>;
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch({ ...search, query: e.target.value });
  }

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
            placeholder='Por titulo o autor'
            _focus={{ bg: `${focusInput}` }}
            _hover={{ outline: 'none' }}
            onChange={handleSearch}
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
      <Container
        display={search.query ? 'block' : 'none'}
        w='80%'
        maxH='md'
        h='full'
        m='10px auto'
        rounded='lg'
        overflow='auto'
        boxShadow='2xl'
        p='4'
        bg={colorContainerBg}
        color={colorContainer}
        fontWeight='500'
      >
        {filteredBooks.map((book) => (
          <>
            <List fontSize='md'>
              <Link
                as={NavLink}
                to={`/book/${book.id}`}
                tabIndex={-1}
                _hover={{ outline: 'none' }}
              >
                <ListItem
                  tabIndex={0}
                  textAlign='left'
                  p='3'
                  mb='3'
                  rounded='lg'
                  bg={colorListBg}
                  _hover={{ bg: `${colorListBgHover}` }}
                >
                  <Box fontSize={{ base: 'sm', sm: 'lg' }} mb='1'>
                    {book.title}
                  </Box>
                  <Box fontSize='xs'>{book.author}</Box>
                </ListItem>
              </Link>
            </List>
          </>
        ))}
        {alertMessage}
      </Container>
    </>
  );
}
