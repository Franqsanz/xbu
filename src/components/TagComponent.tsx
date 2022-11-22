import React from 'react';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { PropsTag } from './types';

export function TagComponent({ name, m }: PropsTag) {
  return (
    <Tag bg='#abf299' color='#0d4300' size='lg' variant='subtle' m={m}>
      <TagLeftIcon boxSize='16px' as={BsTag} />
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
}
