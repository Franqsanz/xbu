import React from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';
import { SignIn } from '@services/auth/auth';

export function Login() {
  return (
    <>
      <MainHead title='Ingresar o Regístrate | XBuReads' />
      <ContainerTitle title='XBuReads' />
      <Flex justify='center' py='10' align='center' minH='60vh'>
        <Stack
          w={{ base: '90%', md: '380px' }}
          direction='column'
          align='center'
          spacing='8'
        >
          <Box w='full'>
            <SignIn />
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
