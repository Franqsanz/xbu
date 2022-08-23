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
import { Helmet } from 'react-helmet';

import { NewBook } from '../components/forms/NewBook';

export function FormNewBook() {
  return (
    <>
      <Helmet>
        <title>Nueva Publicacion</title>
      </Helmet>
      <NewBook />
    </>
  );
}
