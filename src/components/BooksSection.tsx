import React, { Suspense } from 'react';
import { Box, Flex, Divider, Spinner } from '@chakra-ui/react';

import { BooksSectionType } from './types';

export function BooksSection({
  title,
  data,
  booksComponent,
}: BooksSectionType) {
  return (
    <>
      <Box mt='10' mb='5'>
        <Divider borderColor='gray.400' />
      </Box>
      <Flex direction='column'>
        <Box
          p='2'
          mb='3'
          fontSize={{ base: 'xl', md: '2xl' }}
          textAlign={{ base: 'center', lg: 'left' }}
          ml={{ base: 0, lg: 2 }}
        >
          {title}{' '}
          <Box as='span' fontWeight='semibold'>
            {data}
          </Box>
        </Box>
        <Suspense
          fallback={
            <Box p='3'>
              <Spinner size='lg' />
            </Box>
          }
        >
          <Box>{booksComponent}</Box>
        </Suspense>
      </Flex>
    </>
  );
}
