import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Tooltip,
  useOutsideClick,
} from '@chakra-ui/react';

import { CgOptions } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

import { Book } from '../../types';
import { useAllSearchBooks } from '../../../hooks/querys';
import { BookSearchResultsProps } from '../../../components/types';

// function highlightText(text, query) {
//   const regex = new RegExp(`(${query})`, 'gi');
//   return text
//     .split(regex)
//     .map((part, index) =>
//       regex.test(part) ? <mark key={index}>{part}</mark> : part,
//     );
// }

export function InputSearch({
  onOpen,
  width,
  top,
  onResultClick,
}: BookSearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorIcons = useColorModeValue('gray.700', 'gray.300');
  const bgInput = useColorModeValue('white', 'black');
  const colorInput = useColorModeValue('gray.900', 'gray.100');
  const colorContainerBg = useColorModeValue('white', 'black');
  const colorContainer = useColorModeValue('black', 'gray.50');
  const colorListBg = useColorModeValue('gray.200', 'gray.700');
  const colorListBgHover = useColorModeValue('gray.300', 'gray.600');
  const colorInputNotResult = useColorModeValue('gray.600', 'gray.400');
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState({ query: '' });
  // const navigate = useNavigate();
  let alertMessage;

  const { data } = useAllSearchBooks();
  const { query } = search;

  // TODO: resolver esto a futuro
  // function handleKeyPress(e: React.KeyboardEvent) {
  //   if (e.key === 'Enter') {
  //     navigate(`/book/show/${books}`);
  //   }
  // }

  useOutsideClick({
    ref: containerRef,
    handler: () => {
      if (search.query) {
        setSearch({ ...search, query: '' });
      }
    },
  });

  useEffect(() => {
    if (data && data) setBooks(data);

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSearch({ ...search, query: '' });
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [data]);

  const filteredBooks = useMemo(() => {
    if (!data) return [];

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()),
    );
  }, [books, search, data]);

  if (filteredBooks.length === 0) {
    alertMessage = (
      <Box fontSize='md'>
        No se encontraron resultados para:{' '}
        <Box as='span' fontStyle='italic' color={colorInputNotResult}>
          "{query}"
        </Box>
      </Box>
    );
  }

  function handleResultClick(book) {
    if (onResultClick) {
      onResultClick(book);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch({ ...search, query: e.target.value.trim() });
  }

  return (
    <>
      <FormControl w={width} mr={{ base: 0, lg: 2 }}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} boxSize='20px' color={colorIcons} />
          </InputLeftElement>
          <Input
            type='text'
            fontSize='sm'
            size='md'
            bg={bgInput}
            border='1px solid black'
            rounded='md'
            color={colorInput}
            placeholder='Buscar Titulo o Autor'
            _placeholder={{ color: `${colorInput}` }}
            _hover={{ outline: 'none' }}
            value={search.query}
            onChange={handleSearch}
          />
          <InputRightElement justifyContent='flex-end' w='4.5rem'>
            <Tooltip
              label='Más Opciones de búsqueda'
              fontSize='sm'
              bg='black'
              color='white'
            >
              <Button
                px='0'
                onClick={onOpen}
                bg='none'
                _hover={{ bg: 'none' }}
                _active={{ bg: 'none' }}
              >
                <Icon
                  as={CgOptions}
                  boxSize='20px'
                  color={colorIcons}
                  _hover={{ color: 'green.500' }}
                />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Container
        display={search.query ? 'block' : 'none'}
        w={width}
        maxH='300px'
        m='10px auto'
        rounded='lg'
        overflow='auto'
        boxShadow='dark-lg'
        p='4'
        bg={colorContainerBg}
        color={colorContainer}
        ref={containerRef}
        fontWeight='500'
        position={{ base: 'inherit', md: 'absolute' }}
        top={top}
      >
        <List fontSize='md'>
          {filteredBooks.map((book) => (
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
                onClick={() => {
                  setSearch({ ...search, query: '' });
                  handleResultClick(book);
                }}
                tabIndex={-1}
                _hover={{ outline: 'none' }}
              >
                <Box fontSize={{ base: 'sm', sm: 'md' }} mb='1'>
                  {book.title}
                  {/* {highlightText(book.title, search.query)} */}
                </Box>
                <Box fontSize='xs'>
                  {book.author}
                  {/* {highlightText(book.author, search.query)} */}
                </Box>
              </Link>
            </ListItem>
          ))}
        </List>
        {alertMessage}
      </Container>
    </>
  );
}
