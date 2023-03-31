import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

import { useAllBooks } from '../../../hooks/querys';
// import { CardProps } from '../../components/types';

interface Props {
  onClose: () => void;
}

export default function Filter({ onClose }: Props) {
  const bgSelect = useColorModeValue('gray.100', 'gray.800');
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data } = useAllBooks();

  function createSet(data: any, key: string): Set<string> {
    const set = new Set<string>();
    data && data.results.map((item: any) => set.add(item[key]));
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
    onClose();
  }

  return (
    <>
      <Flex
        py='5'
        direction='column'
        as='form'
        justify='center'
        onSubmit={handleSearch}
      >
        <Flex direction='column' justify='center' gap='3'>
          <FormControl display='flex' alignItems='center' isRequired>
            <Select
              size='lg'
              bg={bgSelect}
              onChange={handleChange}
              placeholder='Filtrar por:'
              _focus={{ bg: 'transparent' }}
            >
              <option value='year'>Año</option>
              <option value='language'>Idioma</option>
              <option value='category'>Categoria</option>
            </Select>
          </FormControl>
          <FormControl display='flex' alignItems='center' isRequired>
            <Select
              size='lg'
              bg={bgSelect}
              value={value}
              onChange={handleValueChange}
              placeholder='Seleccione una opción'
              isDisabled={!query}
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
            size='lg'
            type='submit'
            bg='#2de000'
            color='black'
            p='4'
            px='8'
            fontWeight='light'
            border='1px'
            rounded='lg'
            isDisabled={!value}
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
