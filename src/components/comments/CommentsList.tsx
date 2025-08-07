import React from 'react';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFindAllComments } from '@hooks/queries';

type CommentType = {
  bookId: string;
};

export function CommentsList({ bookId }: CommentType) {
  const borderCard = useColorModeValue('gray.200', 'gray.600');
  const colorDate = useColorModeValue('gray.600', 'gray.300');
  const emptyStateColor = useColorModeValue('gray.600', 'gray.400');
  const { data, isPending, isError } = useFindAllComments(bookId);

  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const formatted = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);

    return formatted.replace(/(\d{4})$/, ', $1');
  }

  if (isError) {
    return <div>Error al obtener los comentarios</div>;
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <Center mt='5' p='8'>
        <Flex direction='column' align='center' gap='2'>
          <Text fontSize='lg' color={emptyStateColor}>
            📝
          </Text>
          <Text fontSize='md' color={emptyStateColor} textAlign='center'>
            No hay comentarios aún
          </Text>
          <Text fontSize='sm' color={emptyStateColor} textAlign='center'>
            ¡Sé el primero en comentar!
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <Flex flexDirection='column' gap='5' mt='10' px='2'>
        {data?.results.map(({ id, author, text, createdAt }) => (
          <Flex
            key={id}
            flexDirection='column'
            gap='3'
            p='3'
            border='1px'
            borderColor={borderCard}
            rounded='lg'
          >
            <Flex justify='space-between'>
              <Flex gap='2' align='center'>
                <Avatar
                  name={author.username}
                  // src={}
                  size={{ base: 'xs', md: 'sm' }}
                  referrerPolicy='no-referrer'
                />
                <Box as='span' fontSize='sm'>
                  {author.username}
                </Box>
              </Flex>
              <Box as='span' fontSize='xs' color={colorDate}>
                {formatDate(createdAt)}
              </Box>
            </Flex>
            <Text fontSize='sm' px='5'>
              {text}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
