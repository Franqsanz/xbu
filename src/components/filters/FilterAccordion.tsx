import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import {
  FilterAccordionTypes,
  getAccordionItems,
} from '@components/filters/FilterOptions';

export function FilterAccordion(props: FilterAccordionTypes) {
  const accordionItems = getAccordionItems(props);
  // Controlled: mantenemos las secciones abiertas entre re-renders (que ocurren
  // en cada cambio de sub-filtro cuando React Query re-fetchea). Chakra en
  // uncontrolled resetea el state interno al cambiar los children, que era lo
  // que cerraba los acordeones al marcar/desmarcar una opción.
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <>
      <Accordion
        index={openIndexes}
        onChange={(idx) => setOpenIndexes(Array.isArray(idx) ? idx : [idx])}
        allowMultiple
        mb='2'
      >
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
