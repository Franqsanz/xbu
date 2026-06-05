import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { SkeletonContainer } from '@components/skeletons/SkeletonContainer';

const TAB_LABELS = ['Leyendo', 'Leídos', 'Quiero leer'];

export function MyLibraryFallback() {
  return (
    <>
      <ContainerTitle title='Mi biblioteca' />
      <Tabs isFitted colorScheme='green' variant='line' mt={{ base: 2, md: 4 }}>
        <Box
          w='full'
          maxW={{ base: '1260px', '2xl': '1560px' }}
          m='0 auto'
          px={{ base: 5, md: 10, '2xl': 16 }}
        >
          <TabList>
            {TAB_LABELS.map((label) => (
              <Tab key={label} fontSize='sm' fontWeight='normal'>
                {label}
              </Tab>
            ))}
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel px='0'>
            <SkeletonContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
