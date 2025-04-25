import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

export function SplashScreen() {
  return (
    <Flex justify='center' align='center' h='100vh'>
      <Box
        fontSize='6xl'
        bgGradient='linear-gradient(to-l, green.500, #e9f501)'
        bgClip='text'
        fontWeight='bold'
      >
        XB
      </Box>
    </Flex>
  );
}
