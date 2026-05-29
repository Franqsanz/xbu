import { ReactNode } from 'react';
import {
  Button,
  Center,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  message?: string;
  minH?: string;
}

/**
 * Boundary local para envolver una sección secundaria de la página
 * (ej. libros relacionados, más libros del autor). Si esa sección falla,
 * solo esa caja muestra el error con un retry — el resto de la página
 * sigue funcionando.
 */
export function SectionErrorBoundary({
  children,
  message = 'No se pudo cargar esta sección.',
  minH = '160px',
}: SectionErrorBoundaryProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const subColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Center
              minH={minH}
              border='1px dashed'
              borderColor={borderColor}
              rounded='lg'
              p='5'
            >
              <Flex direction='column' align='center' gap='3'>
                <Icon as={FiAlertTriangle} boxSize='6' color={subColor} />
                <Text fontSize='sm' color={subColor} textAlign='center'>
                  {message}
                </Text>
                <Button
                  size='sm'
                  leftIcon={<Icon as={FiRefreshCw} />}
                  onClick={() => resetErrorBoundary()}
                  fontWeight='normal'
                  bg='green.500'
                  color='black'
                  _hover={{ bg: 'green.600' }}
                  _active={{ bg: 'green.600' }}
                >
                  Reintentar
                </Button>
              </Flex>
            </Center>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
