import React from 'react';
import type { JSX } from 'react';
import type { IconType } from 'react-icons';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useBreakpointValue,
  // useColorModeValue,
  useToast,
} from '@chakra-ui/react';

type ToastPosition =
  | 'bottom'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

interface ToastType {
  width: string;
  padding?: string;
  marginT?: string;
  align: string;
  bxSize: number | string;
  fntSize: number | string;
  bgColor: string;
  iconColor?: string;
  title: string | JSX.Element;
  position?: ToastPosition | undefined;
  description?: string;
  icon?: IconType;
  color: string;
}

export function useMyToast() {
  const toast = useToast();
  const responsivePosition = useBreakpointValue({
    base: 'top',
    md: 'top-right',
  });

  function myToast({
    width,
    padding,
    marginT,
    align,
    bxSize,
    fntSize,
    bgColor,
    iconColor,
    title,
    position,
    description,
    icon,
    color,
  }: ToastType) {
    toast({
      position: (position as ToastPosition) || responsivePosition,
      duration: 3000,
      containerStyle: {
        fontFamily: 'sans-serif',
      },
      render: ({ onClose }) => (
        <Flex
          color='black'
          p={padding}
          bg={bgColor}
          rounded='lg'
          border={`1px solid ${color}`}
          boxShadow='md'
          mt={marginT}
          justify='space-between'
        >
          <Flex mt='1' p='2' justify='space-between' align={align}>
            <Icon as={icon} boxSize={bxSize} mr='2' color={iconColor} />
            <Flex w={{ base: 'full', md: width }} direction='column'>
              <Box fontWeight='semibold' fontSize={fntSize} color={color}>
                {title}
              </Box>
              <Box color={color}>{description}</Box>
            </Flex>
          </Flex>
          <CloseButton size='sm' onClick={onClose} color='whitesmoke' />
        </Flex>
      ),
    });
  }

  return myToast;
}
