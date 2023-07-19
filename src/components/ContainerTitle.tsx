import React, { useRef } from 'react';
import {
  Container,
  Box,
  useColorModeValue,
  useDisclosure,
  Portal,
} from '@chakra-ui/react';

import { InputSearch } from './forms/filters/InputSearch';
import { ModalFilter } from './forms/filters/ModalFilter';
import { TitleProps } from './types';

export function ContainerTitle({ title, showSearch }: TitleProps) {
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgContainer = useColorModeValue('#abf299', '#0d4300');
  const colorTitle = useColorModeValue('#0d4300', '#abf299');

  return (
    <Container maxW='full' p='0' ref={ref}>
      <Box py={{ base: 7, md: 10 }} bg={bgContainer}>
        <Box
          as='h1'
          m='auto'
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          textAlign='center'
          color={colorTitle}
        >
          {title}
        </Box>
        <Box maxW='full' w={{ base: '1000px', md: '900px' }} m='auto'>
          {showSearch && <InputSearch onOpen={onOpen} />}
          <Portal containerRef={ref}>
            <ModalFilter isOpen={isOpen} onClose={onClose} />
          </Portal>
        </Box>
      </Box>
    </Container>
  );
}
