import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import theme from '../../../theme';
import { AuthContext } from '@contexts/AuthContext';
import { AuthContextType } from '@components/types';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

const defaultAuth: AuthContextType = {
  currentUser: null,
  userData: null,
  loading: false,
};

type ProviderOptions = {
  initialEntries?: string[];
  queryClient?: QueryClient;
  authValue?: Partial<AuthContextType>;
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialEntries = ['/'],
    queryClient,
    authValue,
    ...options
  }: ProviderOptions & RenderOptions = {},
) {
  const client = queryClient ?? createTestQueryClient();
  const auth: AuthContextType = { ...defaultAuth, ...authValue };

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          <AuthContext.Provider value={auth}>
            <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
          </AuthContext.Provider>
        </QueryClientProvider>
      </ChakraProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient: client,
  };
}

export * from '@testing-library/react';
