import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useColorModeValue } from '@chakra-ui/react';

interface LinkProps {
  href: string;
  external: boolean;
  data?: string;
  index?: any;
}

export function MyLink({ data, href, external, index }: LinkProps) {
  const colorLinkCategory = useColorModeValue('green.800', 'green.400');
  const colorLinkHoverCategory = useColorModeValue('green.900', 'green.700');

  return (
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
      {index || null}
    </Link>
  );
}
