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

  function myToast({ bgColor, iconColor, title, description, icon }) {
    toast({
      position: 'top-right',
      duration: 3000,
      containerStyle: {
        fontFamily: 'sans-serif',
      },
      render: ({ onClose }) => (
        <Flex
          color='black'
          p='2'
          bg={bgColor}
          rounded='lg'
          boxShadow='md'
          mt='14'
        >
          <Flex mt='1' p='2' justify='space-between'>
            <Icon as={icon} boxSize='5' mt='1' mr='2' color={iconColor} />
            <Flex w='300px' direction='column' color='whitesmoke'>
              <Box fontWeight='semibold'>{title}</Box>
              <Box>{description}</Box>
            </Flex>
          </Flex>
          <CloseButton size='sm' onClick={onClose} color='whitesmoke' />
        </Flex>
      ),
    });
  }

  return myToast;
}
