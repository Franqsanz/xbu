import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

import { aboutCategories } from '../data/links';

export function AboutCategories({ category }: any) {
  const filteredAboutCategories = aboutCategories.filter((item) => {
    return item.category === category;
  });

  return (
    <>
      {filteredAboutCategories.map(({ category, description, wiki }) => (
        <React.Fragment key={category}>
          <Box fontSize='2xl' mt='5' fontWeight='bold'>
            Sobre {category}
          </Box>
          <Text mt='2' fontSize='sm'>
            {description}
          </Text>
          <Box display='inline' mt='4'>
            Más Info:{' '}
            <Link href={wiki} isExternal color='green.600'>
              Wikipedia.
            </Link>
          </Box>
        </React.Fragment>
      ))}
    </>
  );
}