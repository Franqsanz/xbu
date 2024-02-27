import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

export function SkeletonMain() {
  return (
    <>
      <Stack spacing='4'>
        <Skeleton py={{ base: 16, md: 20 }} />
        <Skeleton h='100vh' />
      </Stack>
    </>
  );
}
