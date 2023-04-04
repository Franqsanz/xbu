import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex } from '@chakra-ui/react';

export default function Profile() {
  const { user } = useParams();

  return (
    <>
      <Flex justify='center' align='center' h='300px' border='1px'>
        <Box as='h1' fontSize='3xl' textAlign='center'>
          {user}
        </Box>
      </Flex>
      <Flex gap='3' p='7' justify='center'>
        <Flex
          flex='1'
          bg='gray.50'
          justify='center'
          rounded='lg'
          boxShadow='xl'
          border='1px'
        >
          <Box p='5' textAlign='center'>
            Opciones
          </Box>
        </Flex>
        <Flex flex='3' gap='5' justify='end' flexWrap='wrap'>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
          <Box
            boxShadow='xl'
            rounded='lg'
            w='270px'
            h='270px'
            border='1px'
          ></Box>
        </Flex>
      </Flex>
    </>
  );
}
