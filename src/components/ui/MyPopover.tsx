import React from 'react';
import {
  Button,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
} from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

interface Props {
  textBody: string;
  textFooter?: string;
}

export function MyPopover({ textBody, textFooter }: Props) {
  return (
    <>
      <Popover placement='top'>
        <PopoverTrigger>
          <Button bg='none' h='0' _active={{ bg: 'none' }} _hover={{ bg: 'none' }}>
            <Icon as={AiOutlineQuestionCircle} fontSize='20' />
          </Button>
        </PopoverTrigger>
        <PopoverContent bg='black' color='white' textAlign='center' fontSize='sm'>
          <PopoverArrow bg='black' />
          <PopoverBody>{textBody}</PopoverBody>
          {textFooter ? <PopoverFooter>{textFooter}</PopoverFooter> : null}
        </PopoverContent>
      </Popover>
    </>
  );
}
