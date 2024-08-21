import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { aboutCategories } from '../../data/links';

export function AboutCategories({ category }: any) {
  const filteredAboutCategories = aboutCategories.filter((item) => {
    return item.category === category;
  });

  return (
    <>
      {filteredAboutCategories.map(({ category, description }) => (
        <React.Fragment key={category}>
          <Box fontSize='2xl' mt='5' fontWeight='bold'>
            Sobre {category}
          </Box>
          <Text
            mt='2'
            fontSize='sm'
            maxH='250px'
            overflow='auto'
            pr='1'
            sx={{
              '&::-webkit-scrollbar': {
                width: '7px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#a2aab3',
                borderRadius: '30px',
              },
            }}
          >
            {description}
          </Text>
        </React.Fragment>
      ))}
    </>
  );
}
