import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Spinner,
  Box,
  Heading,
  FormLabel,
  Text,
  Textarea,
  Select,
  Image,
  HStack,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { FormNewBook } from '../components/forms/NewBook';
import { MainHead } from '../components/Head';
import { ContainerTitle } from '../components/ContainerTitle';

export function NewBook() {
  return (
    <>
      <MainHead title='Nueva Publicación' />
      <ContainerTitle title='¡Publicar!' />
      <FormNewBook />
    </>
  );
}
