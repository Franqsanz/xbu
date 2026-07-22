import React from 'react';
import { Box, Checkbox, Flex } from '@chakra-ui/react';

interface OptionType {
  value: string;
  label: string;
  count: number;
}

interface FilterCheckboxGroupType {
  options: Array<OptionType>;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export function FilterCheckboxGroup({
  options,
  selectedValues,
  onToggle,
}: FilterCheckboxGroupType) {
  return (
    <Flex direction='column' gap='3'>
      {options.map(({ value, label, count }) => (
        <Checkbox
          key={value}
          value={value}
          colorScheme='green'
          isChecked={selectedValues.includes(value)}
          onChange={() => onToggle(value)}
        >
          {label}
          <Box as='span' ml='2' color='gray.500'>
            ({count})
          </Box>
        </Checkbox>
      ))}
    </Flex>
  );
}
