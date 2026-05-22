import { ReactNode } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

type LazyOnViewProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  minH?: string | number | Record<string, string | number>;
  rootMargin?: string;
};

const defaultPlaceholder = <Spinner size='lg' />;

export function LazyOnView({
  children,
  placeholder = defaultPlaceholder,
  minH = '200px',
  rootMargin = '0px 0px -50% 0px',
}: LazyOnViewProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
  });

  return (
    <Box ref={ref}>
      {inView ? children : <Center minH={minH}>{placeholder}</Center>}
    </Box>
  );
}
