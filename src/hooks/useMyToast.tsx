import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  // useColorModeValue,
  useToast,
} from '@chakra-ui/react';

export function useMyToast() {
  const toast = useToast();

  function myToast({ bgColor, title, description, icon }) {
    toast({
      position: 'bottom-right',
      containerStyle: {
        fontFamily: 'sans-serif',
      },
      render: ({ onClose }) => (
        <Flex color='black' p='2' bg={bgColor} rounded='lg' boxShadow='md'>
          <Flex mt='1' p='2'>
            <Icon as={icon} boxSize='5' mt='1' mr='2' />
            <Flex direction='column'>
              <Box fontWeight='semibold'>{title}</Box>
              <Box>{description}</Box>
            </Flex>
          </Flex>
          <CloseButton size='sm' onClick={onClose} />
        </Flex>
      ),
    });
  }

  return myToast;
}
