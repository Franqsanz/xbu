import React from 'react';
import { Flex, Input, useColorModeValue } from '@chakra-ui/react';

interface FilterNumberTypes {
  min: string | undefined;
  max: string | undefined;
  setMin: React.ChangeEventHandler<HTMLInputElement>;
  setMax: React.ChangeEventHandler<HTMLInputElement>;
}

export function FilterNumberPages({ min, max, setMin, setMax }: FilterNumberTypes) {
  const bgInput = useColorModeValue('gray.100', 'black');
  const colorInput = useColorModeValue('gray.900', 'gray.100');

  return (
    <>
      <Flex mb='1' gap='2' align='center'>
        <Input
          type='number'
          bg={bgInput}
          border='1px solid black'
          size='sm'
          rounded='md'
          color={colorInput}
          placeholder='Mínimo'
          value={min}
          onChange={setMin}
          _placeholder={{ color: `${colorInput}`, fontSize: 'xs' }}
          _hover={{ outline: 'none' }}
          _focus={{ bg: 'transparent' }}
        />
        <Input
          type='number'
          bg={bgInput}
          border='1px solid black'
          size='sm'
          rounded='md'
          color={colorInput}
          placeholder='Máximo'
          value={max}
          onChange={setMax}
          _placeholder={{ color: `${colorInput}`, fontSize: 'xs' }}
          _hover={{ outline: 'none' }}
          _focus={{ bg: 'transparent' }}
        />
      </Flex>
    </>
  );
}
