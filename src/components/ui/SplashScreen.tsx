import React from 'react';
import { Flex, Box, CircularProgress, useColorModeValue } from '@chakra-ui/react';

export function SplashScreen() {
  const bgColor = useColorModeValue('gray.700', 'green.700');
  const tkColor = useColorModeValue('gray.300', 'black');

  return (
    <Flex direction='column' justify='center' align='center' h='100vh'>
      <Box
        fontSize='6xl'
        bgGradient='linear-gradient(to-l, green.500, #e9f501)'
        bgClip='text'
        fontWeight='bold'
      >
        XB
      </Box>
      <CircularProgress
        isIndeterminate
        size='30px'
        color={bgColor}
        trackColor={tkColor}
      />
    </Flex>
  );
}
