import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Link, Spinner } from '@chakra-ui/react';

import { useMostViewedBooks } from '@hooks/queries';

export function MostViewed() {
  const { data, isLoading } = useMostViewedBooks('summary');

  if (isLoading) {
    return (
      <>
        <Box mt='10' fontSize='2xl' fontWeight='bold'>
          Más Vistos
        </Box>
        <Flex align='center' justify='center' h='25vh' direction='column' mt='3'>
          <Spinner size='lg' thickness='3px' />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Box mt='10' fontSize='2xl' fontWeight='bold'>
        Más Vistos
      </Box>
      <Flex as='ul' direction='column' mt='3'>
        {data?.map(({ id, title, pathUrl }, index) => (
          <>
            <Flex as='li' key={id} gap='2' align='center'>
              <Box w='30px' fontSize='25px' color='green.600'>
                {index + 1}.
              </Box>
              <Link
                as={NavLink}
                to={`/book/view/${pathUrl}`}
                w='185px'
                textTransform='uppercase'
                my='1'
                fontSize='sm'
                _hover={{ color: 'green.500', outline: 'none' }}
                sx={{
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '-webkit-line-clamp': '2',
                  lineHeight: 1.5,
                  maxHeight: 'calc(1.5em * 2)',
                }}
              >
                {title}
              </Link>
            </Flex>
          </>
        ))}
      </Flex>
    </>
  );
}
