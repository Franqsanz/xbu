import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { test, expect } from 'vitest';

import theme from '../../../theme';
import { AllBooks } from '../../components/AllBooks';

const queryClient = new QueryClient();

test('Render AllBooks', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AllBooks />
      </ChakraProvider>
    </QueryClientProvider>,
  );
});
