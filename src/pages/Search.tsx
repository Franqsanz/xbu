import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CgOptions } from 'react-icons/cg';
import {
  CheckboxGroup,
  Checkbox,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Box,
} from '@chakra-ui/react';

import { Card } from '../components/card/Card';
import { CardProps } from '../components/types';
import { useFilter } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MySimpleGrid } from '../components/MySimpleGrid';
import { MainHead } from '../components/Head';
import { Aside } from '../components/Aside';
import ResultLength from '../components/ResultLength';

export default function Search() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const bgColorButton = useColorModeValue('#2de000', '#24b300');
  const bgContentCheckbox = useColorModeValue('white', 'gray.800');
  const [languages, setLanguages] = useState<string[]>([]);
  const { query, param } = useParams();
  let bookFilter;

  const { data } = useFilter(query, param);

  function getLanguages(data: Array<CardProps>) {
    const languages = [...new Set(data.map((book) => book.language))];

    if (languages.length === 1) {
      return null;
    }

    return languages;
  }

  const language = getLanguages(data);

  const filteredBooks = data.filter(({ language }) => {
    return languages.length === 0 || languages.includes(language);
  });

  function handleLanguageChange(languages) {
    setLanguages(languages);
  }

  if (language && language?.length > 0) {
    bookFilter = (
      <Flex display={{ base: 'none', md: 'flex' }} direction='column' mt='10'>
        <CheckboxGroup
          value={languages}
          onChange={handleLanguageChange}
          colorScheme='green'
        >
          <Flex align='center' py='2' mb='2' fontSize='xl' fontWeight='bold'>
            <Icon as={CgOptions} boxSize='20px' mr='3' />
            Filtrar
          </Flex>
          <Flex direction='column-reverse' gap='3'>
            {language &&
              language.map((language) => (
                <Checkbox key={language} value={language}>
                  {language}
                </Checkbox>
              ))}
          </Flex>
        </CheckboxGroup>
      </Flex>
    );
  }

  return (
    <>
      <MainHead title={`Libros de ${param} | XBuniverse`} />
      <ContainerTitle title={`Libros de ${param}`} showSearch={true} />
      <Flex display={{ base: 'flex', md: 'none' }} mt='5' justify='center'>
        <Button
          onClick={onToggle}
          fontWeight='500'
          border='1px'
          size='md'
          bg={bgColorButton}
          color='black'
          _hover={{ bg: '#28c900' }}
          _active={{ bg: '#28c900' }}
        >
          <Icon as={CgOptions} boxSize='20px' mr='3' />
          Filtros
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='full'>
        <DrawerOverlay bg='#1212126e' />
        <DrawerContent
          bg={useColorModeValue('#ffffffe0', '#121212e4')}
          backdropFilter='auto'
          backdropBlur='12px'
        >
          <DrawerHeader>Filtrar</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex px='2' direction='column'>
              <Box mb='4' borderBottom='1px'>
                Idioma
              </Box>
              <CheckboxGroup
                value={languages}
                onChange={handleLanguageChange}
                colorScheme='green'
              >
                <Flex
                  mx='3'
                  bg={bgContentCheckbox}
                  p='3'
                  rounded='lg'
                  direction='column-reverse'
                  gap='3'
                >
                  {language &&
                    language.map((language) => (
                      <Checkbox key={language} value={language}>
                        {language}
                      </Checkbox>
                    ))}
                </Flex>
              </CheckboxGroup>
            </Flex>
          </DrawerBody>
          <DrawerFooter mb='2' borderTopWidth='1px'>
            <Button
              onClick={onClose}
              border='1px'
              size='lg'
              bg={bgColorButton}
              color='black'
              _hover={{ bg: '#28c900' }}
              _active={{ bg: '#28c900' }}
            >
              Aplicar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data} />
          {bookFilter}
        </Aside>
        <MySimpleGrid>
          {filteredBooks.map(
            ({
              id,
              title,
              synopsis,
              author,
              category,
              sourceLink,
              image,
            }: CardProps) => (
              <React.Fragment key={id}>
                <Card
                  id={id}
                  category={category}
                  title={title}
                  author={author}
                  synopsis={synopsis}
                  sourceLink={sourceLink}
                  image={image}
                />
              </React.Fragment>
            ),
          )}
        </MySimpleGrid>
      </Flex>
    </>
  );
}
