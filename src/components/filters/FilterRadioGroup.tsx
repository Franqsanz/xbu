import React from 'react';
import { RadioGroup, Radio, Box, Flex } from '@chakra-ui/react';

interface OptionType {
  value: string;
  label: string;
  count: number;
}

interface FilterRadioGroupType {
  options: Array<OptionType>;
  selectedValue: string;
  onChange: (value: string) => void;
  allLabel: string;
}

export function FilterRadioGroup({
  options,
  selectedValue,
  onChange,
  allLabel,
}: FilterRadioGroupType) {
  return (
    <RadioGroup value={selectedValue} onChange={onChange} colorScheme='green'>
      <Flex direction='column' gap='3'>
        <Radio value=''>{allLabel}</Radio>
        {options.map(({ value, label, count }) => (
          <Radio key={value} value={value}>
            {label}
            <Box as='span' ml='2' color='gray.500'>
              ({count})
            </Box>
          </Radio>
        ))}
      </Flex>
    </RadioGroup>
  );
}
