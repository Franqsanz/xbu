import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { useUserRegister } from '@hooks/queries';

export function FormCreateUser() {
  const [username, setUsername] = useState<string>('');
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state;
  const { mutateAsync, data, isPending, isSuccess } = useUserRegister(username);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setUsername(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutateAsync(token);
  }

  if (isSuccess) {
    navigate(`/${data.username}`);
  }

  return (
    <>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        justify='center'
        p='5'
        mt='24'
        h='400px'
      >
        <Flex gap='5' direction='column'>
          <Box
            as='h1'
            textAlign='center'
            fontSize={{ base: 'lg', md: '2xl' }}
            mb='5'
          >
            Elegir nombre de usuario
          </Box>
          <FormControl isRequired>
            <InputGroup size={{ base: 'md', md: 'lg' }}>
              <InputLeftAddon>xbu.com/</InputLeftAddon>
              <Input
                type='text'
                name='username'
                value={username}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <Button
            type='submit'
            size='lg'
            border='1px'
            bg={bgColorButton}
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
            fontWeight='normal'
            loadingText='Creando cuenta...'
            isLoading={isPending}
          >
            Siguiente
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
