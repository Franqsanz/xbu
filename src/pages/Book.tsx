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
  const infoTextColor = useColorModeValue('gray.600', 'gray.400');
  let uiDescription;
  let uiLink;

  const { data } = useBook(id);

  if (data.description === '') {
    uiDescription = (
      <Box mb='10'>
        <Box p='2' fontSize='xl' bg={grayColor} roundedTop='lg'>
          Descripción
        </Box>
        <Text fontSize='md' my='7' fontStyle='italic' color={infoTextColor}>
          El autor de la publicación no a proporsionado una descripción
        </Text>
      </Box>
    );
  } else {
    uiDescription = (
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

  if (data.sourceLink === '') {
    uiLink = (
      <Box mb='10'>
        <Box
          as='span'
          ml='2'
          fontSize='md'
          fontStyle='italic'
          color={infoTextColor}
        >
          El autor de la publicación no a proporsionado un link
        </Box>
      </Box>
    );
  } else {
    uiLink = (
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
    );
  }

  return (
    <>
      <Title title={`${data.title} | XBuniverse`} />
      <Flex
        w='full'
        maxW='1300px'
        m='auto'
        mt={{ base: 0, md: 10 }}
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
          m='1rem auto'
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
            <Text mt='3' mb='10' fontSize='lg'>
              {data.synopsis}
            </Text>
          </Box>
          {uiDescription}
          <Box p='2' fontSize='xl' bg={grayColor} roundedTop='lg'>
            Caracteristicas
          </Box>
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p='4'
            roundedBottom='lg'
          >
            <Flex direction='column'>
              <Box>
                <Flex>
                  <Box w='160px'>
                    <Box as='span'>Autor:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.author}</Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box w='160px'>
                    <Box as='span'>Año:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.year}</Box>
                  </Box>
                </Flex>
                <Flex mb='2'>
                  <Box w='160px'>
                    <Box as='span'>N° paginas:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.numberPages}</Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box w='160px'>
                    <Box as='span'>Idioma:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.language}</Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box mt='10' mb='10px'>
            {uiLink}
          </Box>
        </Flex>
        <Flex w={{ base: 'full', lg: '400px' }} px='3'>
          <Box
            maxW={{ base: '920px', lg: '300px' }}
            p={{ base: 5, md: 10 }}
            m='1rem auto'
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
