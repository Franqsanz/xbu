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
      position: 'bottom-left',
      containerStyle: {
        fontFamily: 'sans-serif',
      },
      render: ({ onClose }) => (
        <Flex color='black' p='2' bg={bgColor} rounded='lg' boxShadow='md'>
          <Flex mt='1' p='2'>
            <Icon as={icon} boxSize='5' mt='1' mr='2' color={iconColor} />
            <Flex direction='column' color='whitesmoke'>
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
