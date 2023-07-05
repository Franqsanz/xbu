import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { useAllSearchBooks } from '../../../hooks/querys';

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
  const navigate = useNavigate();
  let alertMessage;

  const { data } = useAllSearchBooks();

  // TODO: resolver esto a futuro
  // function handleKeyPress(e: React.KeyboardEvent) {
  //   if (e.key === 'Enter') {
  //     navigate(`/book/show/${books}`);
  //   }
  // }

  useEffect(() => {
    if (data && data) setBooks(data);
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
        <InputGroup maxW='70%' size='lg' m='auto' mt={{ base: 5, md: 10 }}>
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
        maxW='70%'
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
        <List fontSize='md'>
          {filteredBooks.map((book) => (
            <>
              <ListItem
                key={book.id}
                tabIndex={0}
                textAlign='left'
                mb='3'
                rounded='lg'
                bg={colorListBg}
                // onKeyDown={handleKeyPress}
                _hover={{ bg: `${colorListBgHover}` }}
              >
                <Link
                  as={NavLink}
                  to={`/book/view/${book.pathUrl}`}
                  display='block'
                  p='3'
                  tabIndex={-1}
                  _hover={{ outline: 'none' }}
                >
                  <Box fontSize={{ base: 'sm', sm: 'lg' }} mb='1'>
                    {book.title}
                  </Box>
                  <Box fontSize='xs'>{book.author}</Box>
                </Link>
              </ListItem>
            </>
          ))}
        </List>
        {alertMessage}
      </Container>
    </>
  );
}
