import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';

export function EditProfileFallback() {
  return (
    <>
      <ContainerTitle title='Editar perfil' />
      <Flex justify='center' py='20'>
        <Spinner size='xl' />
      </Flex>
    </>
  );
}
