import React from 'react';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

import { PropsTag } from './types';

export function MyTag({
  bg,
  color,
  icon,
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
      bg={bg}
      color={color}
      size={size}
      border='1px'
      variant='subtle'
      m={margin}
      tabIndex={tabIndex}
      outline='none'
      _focus={isFocused === true ? { outline: `2px solid ${outlineCard}` } : {}}
    >
      <TagLeftIcon boxSize='16px' as={icon} />
      <TagLabel
        display='flex'
        alignItems='center'
        alignSelf='center'
        whiteSpace='nowrap'
        overflow='initial'
      >
        {name}
        {countUI || null}
      </TagLabel>
    </Tag>
  );
}
