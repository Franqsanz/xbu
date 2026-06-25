import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { FormNewBook } from '@components/forms/NewBook';
import { FormOriginalBook } from '@components/forms/OriginalBook';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';

type PublishMode = 'reference' | 'original';

export default function NewBook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawMode = searchParams.get('mode');
  const mode: PublishMode | null =
    rawMode === 'reference' || rawMode === 'original' ? rawMode : null;
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const subColor = useColorModeValue('gray.600', 'gray.400');

  function pick(next: PublishMode) {
    setSearchParams({ mode: next });
  }

  if (mode === 'reference') {
    return (
      <>
        <MainHead title='Nueva Publicación' />
        <ContainerTitle title='Recomendar un libro' />
        <FormNewBook />
      </>
    );
  }

  if (mode === 'original') {
    return (
      <>
        <MainHead title='Nueva Publicación' />
        <ContainerTitle title='Publicar mi libro' />
        <FormOriginalBook />
      </>
    );
  }

  return (
    <>
      <MainHead title='¡Publicar!' />
      <ContainerTitle title='¡Publicar!' />
      <Flex
        as='section'
        direction='column'
        align='center'
        maxW='500px'
        m='0 auto'
        px={{ base: 5, md: 0 }}
        py={{ base: 8, md: 12 }}
        gap='6'
      >
        <Text textAlign='center'>¿Qué querés publicar?</Text>
        <Flex direction='column' w='full' gap='3'>
          <Button
            onClick={() => pick('reference')}
            size='lg'
            w='full'
            border='1px'
            bg={bgColorButton}
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
          >
            Recomendar un libro
          </Button>
          <Text fontSize='sm' color={subColor} px='1'>
            Compartí un libro que te gustó. Otros usuarios podrán verlo y comentarlo.
          </Text>
          <Button
            onClick={() => pick('original')}
            mt='3'
            size='lg'
            w='full'
            border='1px'
            bg={bgColorButton}
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
          >
            Publicar un libro propio
          </Button>
          <Text fontSize='sm' color={subColor} px='1'>
            Subí un PDF o EPUB de tu autoría para que otros lo lean dentro de
            XBuReads.
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
