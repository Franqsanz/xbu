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
      <Box py={{ base: 16, md: 24 }} bg={bgContainer}>
        <Box
          maxW='95%'
          w='3xl'
          m='auto'
          textAlign='center'
          as='h1'
          fontSize={{ base: '4xl', md: '7xl' }}
          color={colorTitle}
        >
          {title}
          {showSearch && <InputSearch onOpen={onOpen} />}

          <Portal containerRef={ref}>
            <ModalFilter isOpen={isOpen} onClose={onClose} />
          </Portal>
        </Box>
      </Box>
    </Container>
  );
}
