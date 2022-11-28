import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Box, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

import { useBook } from '../hooks/querys';
import { Title } from '../components/Title';
import { categoryLinks } from '../components/links';
import { TagComponent } from '../components/TagComponent';

export function Book() {
  const { id } = useParams();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  let ui;

  const { data } = useBook(id);

  if (data.description === '') {
    ui = (
      <Box my='14'>
        <Box as='span' ml='2' fontSize='md' fontStyle='italic' color='gray.600'>
          No se a proporsionado una descripción
        </Box>
      </Box>
    );
  } else {
    ui = (
      <Box mt='5'>
        <Box p='2' fontSize='xl' bg={grayColor} roundedTop='lg'>
          Descripción
        </Box>
        <Text mt='3' mb='14'>
          {data.description}
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Title title={`${data.title} | XBuniverse`} />
      <Flex
        w='full'
        maxW='1300px'
        m='auto'
        mb='28'
        align='flex-start'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex
          w='full'
          maxW='920px'
          direction='column'
          justify='center'
          p={{ base: 5, md: 14 }}
          m='2rem auto'
        >
          <Box>
            <TagComponent name={data.category} />
          </Box>
          <Box
            as='h1'
            fontSize={{ base: '3xl', md: '4xl' }}
            my='5'
            textTransform='uppercase'
          >
            {data.title}
          </Box>
          <Box
            my='1'
            fontSize={{ base: 'lg', md: '2xl' }}
            textTransform='uppercase'
          >
            {data.author}
          </Box>
          <Box mt='5'>
            <Box
              p='2'
              fontSize='xl'
              bg={useColorModeValue('gray.200', 'gray.600')}
              roundedTop='lg'
            >
              Sinopsis
            </Box>
            <Text p='2' mt='3' mb='10' fontSize='lg'>
              {data.synopsis}
            </Text>
          </Box>
          {ui}
          <Box p='2' fontSize='xl' bg={grayColor} roundedTop='lg'>
            Caracteristicas
          </Box>
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p='4'
            roundedBottom='lg'
          >
            <Flex align='center'>
              <Flex direction='column'>
                <Box as='span'>Autor:</Box>
                <Box as='span' my='2'>
                  Año:
                </Box>
                <Box as='span' mb='2'>
                  N° paginas:
                </Box>
                <Box as='span'>Idioma:</Box>
              </Flex>
              <Flex direction='column' ml='10'>
                <Box as='span'>{data.author}</Box>
                <Box as='span' my='2'>
                  {data.year}
                </Box>
                <Box as='span' mb='2'>
                  {data.numberPages}
                </Box>
                <Box as='span'>{data.language}</Box>
              </Flex>
            </Flex>
          </Box>
          <Box mt='10' mb='10px'>
            <Link
              w={{ base: '100%', md: '115px' }}
              display='block'
              href={data.sourceLink}
              isExternal
              bg='#2de000'
              color='black'
              p='3'
              rounded='10'
              textAlign='center'
              _hover={{ outline: 'none', bg: '#28c900' }}
            >
              <Flex align='center'>
                Ver Libro
                <FiExternalLink style={{ marginLeft: '6px' }} />
              </Flex>
            </Link>
          </Box>
        </Flex>
        <Flex w={{ base: 'full', lg: '400px' }} px='3'>
          <Box
            maxW={{ base: '920px', lg: '300px' }}
            p={{ base: 5, md: 10 }}
            m='2rem auto'
            rounded='10'
            border='1px'
            borderColor={grayColor}
            boxShadow='lg'
          >
            <Box mb='4' fontSize='2xl' textAlign='center'>
              Categorias
            </Box>
            {categoryLinks.map(({ name }) => (
              <Link
                key={name}
                as={NavLink}
                to={`/categories/${name}`}
                _hover={{ outline: 'none' }}
              >
                <TagComponent name={name} m='1' />
              </Link>
            ))}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
