import React, { useMemo, useState } from 'react';
import { Box, Input, Text, useColorModeValue } from '@chakra-ui/react';

import { FilterRadioGroup } from '@components/filters/FilterRadioGroup';

interface OptionType {
  value: string;
  label: string;
  count: number;
}

interface Props {
  options: OptionType[];
  selectedValue: string;
  onChange: (value: string) => void;
  allLabel: string;
  placeholder?: string;
  emptyMessage?: string;
}

export function FilterSearchableRadio({
  options,
  selectedValue,
  onChange,
  allLabel,
  placeholder = 'Buscar…',
  emptyMessage = 'Sin coincidencias',
}: Props) {
  const [query, setQuery] = useState('');
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const subColor = useColorModeValue('gray.600', 'gray.400');

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <Box>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        size='sm'
        borderRadius='md'
        bg={bgColorInput}
        fontSize={{ base: 'md', md: 'sm' }}
        _focus={{ bg: 'transparent' }}
        mb='3'
      />
      {filteredOptions.length === 0 ? (
        <Text fontSize='sm' color={subColor} py='2'>
          {emptyMessage}
        </Text>
      ) : (
        <FilterRadioGroup
          options={filteredOptions}
          selectedValue={selectedValue}
          onChange={onChange}
          allLabel={allLabel}
        />
      )}
    </Box>
  );
}
