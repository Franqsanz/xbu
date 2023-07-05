import React, { useState } from 'react';
import {
  RadioGroup,
  Radio,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Flex,
  Box,
  Button,
} from '@chakra-ui/react';

import { PropsDrawer } from './types';

export function FilterDrawer({
  isOpen,
  onClose,
  handleLanguageChange,
  language,
  languagesMap,
}: PropsDrawer) {
  const bgContentCheckbox = useColorModeValue('white', 'transparent');
  const bgButtonApply = useColorModeValue('green.500', 'green.700');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  function handleRadioChange(language) {
    setSelectedLanguage(language);
  }

  function handleAllRadioChange() {
    setSelectedLanguage('');
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement='bottom' onClose={onClose} size='xl'>
        <DrawerOverlay bg='#1212126e' />
        <DrawerContent
          backdropFilter='auto'
          backdropBlur='12px'
          roundedTop='3xl'
        >
          <DrawerHeader>Filtrar por:</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex px='2' direction='column' mb='10'>
              <Box mb='4' borderBottom='1px'>
                Idioma
              </Box>
              <RadioGroup
                value={selectedLanguage}
                onChange={handleLanguageChange}
                colorScheme='green'
              >
                <Flex
                  mx='2'
                  bg={bgContentCheckbox}
                  rounded='lg'
                  direction='column-reverse'
                  gap='5'
                >
                  {language &&
                    language.map((language) => (
                      <Radio
                        key={language}
                        value={language}
                        onChange={() => handleRadioChange(language)}
                      >
                        {language}
                        <Box as='span' ml='2' color='gray.500'>
                          ({languagesMap && languagesMap[language]})
                        </Box>
                      </Radio>
                    ))}
                  <Radio value='' onChange={handleAllRadioChange}>
                    Todos
                  </Radio>
                </Flex>
              </RadioGroup>
            </Flex>
          </DrawerBody>
          <DrawerFooter justifyContent='center' borderTopWidth='1px'>
            <Button
              w='full'
              onClick={onClose}
              bg={bgButtonApply}
              border='1px'
              size='lg'
              fontWeight='light'
              color='black'
              _hover={{ bg: 'green.600' }}
              _active={{ bg: 'green.600' }}
            >
              Mostrar Resultados
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
