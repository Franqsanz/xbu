import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Link, useColorModeValue } from '@chakra-ui/react';

import { MyLinkType } from '@components/types';

export function MyLink({ data, href, external, index }: MyLinkType) {
  const colorLinkCategory = useColorModeValue('green.800', 'green.400');
  const colorLinkHoverCategory = useColorModeValue('green.900', 'green.700');

  return (
    <>
      <Link
        as={NavLink}
        to={href}
        color={colorLinkCategory}
        isExternal={external}
        _hover={{
          color: `${colorLinkHoverCategory}`,
          textDecoration: 'underline',
        }}
      >
        {data}
      </Link>
      {index !== null && index !== undefined && <Box mr='1'>{index}</Box>}
    </>
  );
}
