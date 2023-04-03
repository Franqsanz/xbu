import React from 'react';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { PropsTag } from './types';

export function TagComponent({
  name,
  size,
  margin,
  count,
  isFocused,
  tabIndex,
}: PropsTag) {
  const outlineCard = useColorModeValue('black', 'white');
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
    <Tag
      bg='#abf299'
      color='#0d4300'
      size={size}
      border='1px'
      variant='subtle'
      m={margin}
      tabIndex={tabIndex}
      outline='none'
      _focus={isFocused === true ? { outline: `2px solid ${outlineCard}` } : {}}
    >
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
