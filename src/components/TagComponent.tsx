import React from 'react';
import { Tag, TagLabel, TagLeftIcon, Box } from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { PropsTag } from './types';

export function TagComponent({ name, m, count }: PropsTag) {
  let countUI;

  if (count === undefined) {
    countUI;
  } else {
    countUI = (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        as='span'
        w='5'
        h='5'
        ml='2'
        px='1'
        bg='black'
        color='white'
        rounded='md'
        fontSize='sm'
      >
        {count}
      </Box>
    );
  }

  return (
    <Tag bg='#abf299' color='#0d4300' size='lg' variant='subtle' m={m}>
      <TagLeftIcon boxSize='16px' as={BsTag} />
      <TagLabel
        display='flex'
        alignItems='center'
        alignSelf='center'
        whiteSpace='nowrap'
        overflow='initial'
      >
        {name}
        {countUI}
      </TagLabel>
    </Tag>
  );
}
