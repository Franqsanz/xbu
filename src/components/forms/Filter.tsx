import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiFilter } from 'react-icons/fi';

import { useAllBooks } from '../../hooks/querys';
import { CardProps } from '../../components/types';

export function Filter() {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data } = useAllBooks();

  function createSet(data: CardProps[], key: string): Set<string> {
    const set = new Set<string>();
    data && data.map((item: any) => set.add(item[key]));
    return set;
  }

  function setToArray(set: Set<string>): string[] {
    return Array.from(set).sort();
  }

  const years = setToArray(createSet(data, 'year'));
  const languages = setToArray(createSet(data, 'language'));
  const categories = setToArray(createSet(data, 'category'));

  useEffect(() => {
    if (query === 'year') setValues(years);
    if (query === 'language') setValues(languages);
    if (query === 'category') setValues(categories);
  }, [query]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuery(e.target.value);
  }

  function handleValueChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    navigate(`/books/search/${query}/${value}`);
  }

  return (
    <>
      <Flex
        w='full'
        maxW='615px'
        p='3'
        m='auto'
        mt='7'
        direction='column'
        as='form'
        align={{ base: 'center', md: 'flex-start' }}
        onSubmit={handleSearch}
      >
        <Flex mb='4' fontSize='xl' align='center'>
          <FiFilter style={{ marginRight: 6 }} />
          Hacer una busqueda:
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='center'
          gap='3'
        >
          <FormControl
            w={{ base: 'full', md: '160px' }}
            display='flex'
            alignItems='center'
            isRequired
          >
            <Select
              size='md'
              bg={useColorModeValue('gray.100', 'gray.800')}
              onChange={handleChange}
              placeholder='Filtrar por:'
              _focus={{ bg: 'transparent' }}
            >
              <option value='year'>Año</option>
              <option value='language'>Idioma</option>
              <option value='category'>Categoria</option>
            </Select>
          </FormControl>
          <FormControl w='250px' display='flex' alignItems='center' isRequired>
            <Select
              size='md'
              bg={useColorModeValue('gray.100', 'gray.800')}
              value={value}
              onChange={handleValueChange}
              placeholder='Seleccione una opción'
              _focus={{ bg: 'transparent' }}
            >
              {values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            ml={{ base: 0, md: 3 }}
            type='submit'
            bg='#2de000'
            color='black'
            p='4'
            px='8'
            fontWeight='light'
            border='1px'
            rounded='lg'
            _hover={{ outline: 'none', bg: '#28c900' }}
          >
            <Flex align='center' justify='center'>
              <FiSearch style={{ marginRight: '6px' }} />
              Buscar
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
