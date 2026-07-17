import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { useReportBook } from '@hooks/queries';
import { useMyToast } from '@hooks/useMyToast';

type ReportType = 'copyright' | 'inappropriate' | 'spam' | 'other';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
};

const OPTIONS: { value: ReportType; label: string; hint?: string }[] = [
  {
    value: 'copyright',
    label: 'Infringe derechos de autor',
    hint: 'El libro es pirata o no tenés permiso para publicarlo.',
  },
  {
    value: 'inappropriate',
    label: 'Contenido inapropiado',
    hint: 'Violencia, discurso de odio, contenido ilegal.',
  },
  { value: 'spam', label: 'Spam o engañoso' },
  { value: 'other', label: 'Otro' },
];

export function ModalReportBook({ isOpen, onClose, bookId }: Props) {
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const [type, setType] = useState<ReportType>('copyright');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const myToast = useMyToast();
  const { mutateAsync, isPending } = useReportBook(bookId);

  function reset() {
    setType('copyright');
    setDescription('');
    setContactEmail('');
    setEmailError('');
    setDescriptionError('');
  }

  function handleClose() {
    if (isPending) return;
    reset();
    onClose();
  }

  async function handleSubmit() {
    let hasError = false;
    if (type === 'other' && !description.trim()) {
      setDescriptionError('Contame brevemente el motivo del reporte.');
      hasError = true;
    }
    const trimmedEmail = contactEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Ingresá un email de contacto válido.');
      hasError = true;
    }
    if (hasError) return;

    try {
      await mutateAsync({
        type,
        description: description.trim() || undefined,
        contactEmail: trimmedEmail,
      });
      myToast({
        title: 'Reporte enviado. Gracias.',
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '260px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
      reset();
      onClose();
    } catch (err) {
      const message =
        err instanceof Error &&
        err.message &&
        !err.message.startsWith('Error en la solicitud')
          ? err.message
          : 'No se pudo enviar el reporte.';
      myToast({
        title: message,
        icon: IoWarningSharp,
        iconColor: 'red.400',
        bgColor: 'black',
        width: '320px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: 'xs', md: 'md' }}
      isCentered
    >
      <ModalOverlay backdropFilter='blur(7px)' />
      <ModalContent>
        <ModalHeader>Reportar libro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize='sm' color={subColor} mb='4'>
            Tu reporte es anónimo para el autor. Solo el equipo de XBuReads lo
            recibe.
          </Text>
          <FormControl mb='4'>
            <FormLabel fontSize='sm'>Motivo</FormLabel>
            <RadioGroup value={type} onChange={(v) => setType(v as ReportType)}>
              <Flex direction='column' gap='2'>
                {OPTIONS.map((o) => (
                  <Radio key={o.value} value={o.value} colorScheme='green'>
                    <Flex direction='column'>
                      <Text fontSize='sm'>{o.label}</Text>
                      {o.hint && (
                        <Text fontSize='xs' color={subColor}>
                          {o.hint}
                        </Text>
                      )}
                    </Flex>
                  </Radio>
                ))}
              </Flex>
            </RadioGroup>
          </FormControl>
          <FormControl mb='4' isInvalid={!!descriptionError}>
            <FormLabel fontSize='sm'>
              Descripción{' '}
              <Text as='span' fontSize='xs' color={subColor}>
                {type === 'other' ? '(obligatoria)' : '(opcional)'}
              </Text>
            </FormLabel>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (descriptionError) setDescriptionError('');
              }}
              placeholder='Contame más detalles del reporte…'
              bg={bgColorInput}
              rows={4}
              maxLength={2000}
              fontSize={{ base: 'md', md: 'sm' }}
              _focus={{ bg: 'transparent' }}
            />
            <FormErrorMessage fontSize='xs'>{descriptionError}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!emailError}>
            <FormLabel fontSize='sm'>Email de contacto</FormLabel>
            <Input
              type='email'
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              placeholder='tu@email.com'
              bg={bgColorInput}
              fontSize={{ base: 'md', md: 'sm' }}
              _focus={{ bg: 'transparent' }}
            />
            <FormErrorMessage fontSize='xs'>{emailError}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter gap='2'>
          <Button
            variant='ghost'
            fontWeight='normal'
            fontSize='sm'
            onClick={handleClose}
            isDisabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            bg={bgColorButton}
            color='black'
            fontSize='sm'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
            isLoading={isPending}
            loadingText='Enviando…'
            onClick={handleSubmit}
          >
            Enviar reporte
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
