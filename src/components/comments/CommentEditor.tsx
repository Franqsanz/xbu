import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineSave } from 'react-icons/ai';

import { EditorType } from '@components/types';

export function CommentEditor({
  initialText,
  isUpdating,
  onCancel,
  onSave,
}: EditorType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const borderCard = useColorModeValue('gray.200', 'gray.600');
  const [text, setText] = useState(initialText);
  const maxChars = 1500;

  function handleComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    if (textareaRef.current) autoResize(textareaRef.current);
  }

  function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  useEffect(() => {
    if (textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
        const length = textareaRef.current?.value.length || 0;
        textareaRef.current?.setSelectionRange(length, length);

        if (textareaRef.current) {
          autoResize(textareaRef.current);
        }
      }, 0);
    }
  }, []);

  return (
    <Flex direction='column' px={{ base: 3, sm: 6 }} py='3'>
      <Textarea
        ref={textareaRef}
        value={text}
        resize='none'
        overflow='hidden'
        minH='100px'
        fontSize='sm'
        mb='3'
        onChange={handleComment}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
          if (e.key === 'Enter' && e.ctrlKey) onSave(text.trim());
        }}
      />
      <Box as='span' fontSize='xs' alignSelf='end' mb='2'>
        {text.length} / {maxChars}
      </Box>
      <HStack
        spacing='2'
        justify='flex-end'
        flexDirection={{ base: 'column-reverse', sm: 'row' }}
      >
        <Button
          w={{ base: 'full', md: 'auto' }}
          size='md'
          border='1px'
          borderColor={borderCard}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          w={{ base: 'full', md: 'auto' }}
          size='md'
          bg='green.500'
          color='black'
          border='1px'
          rounded='lg'
          leftIcon={<AiOutlineSave />}
          onClick={() => onSave(text.trim())}
          isLoading={isUpdating}
          loadingText='Guardando...'
          isDisabled={!text.trim() || text === initialText}
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          Guardar
        </Button>
      </HStack>
    </Flex>
  );
}
