import React from 'react';
import { Box } from '@chakra-ui/react';

import { useAuth } from '@contexts/AuthContext';
import { SkeletonFeed } from '@components/skeletons/SkeletonFeed';

export function HomeFallback() {
  const { userData } = useAuth();

  if (!userData) return null;

  return (
    <Box
      w='full'
      maxW='4xl'
      m='auto'
      px={{ base: 6, md: 6 }}
      py={{ base: 6, md: 10 }}
    >
      <SkeletonFeed />
    </Box>
  );
}
