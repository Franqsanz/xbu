import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import { getAccordionItems } from '@components/filters/FilterOptions';

export function FilterAccordion(props) {
  const accordionItems = getAccordionItems(props);

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle mb='2'>
        {accordionItems.map(({ title, content }, index) => (
          <AccordionItem border='none' key={index}>
            <h2>
              <AccordionButton px='1' borderRadius='md'>
                <Box as='span' pl='1' flex='1' textAlign='left'>
                  {title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb='3' p='3'>
              {content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
