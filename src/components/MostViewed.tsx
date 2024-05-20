import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Link } from '@chakra-ui/react';

import { useMostViewedBooks } from '@hooks/queries';

export function MostViewed() {
  const { data } = useMostViewedBooks('summary');

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
