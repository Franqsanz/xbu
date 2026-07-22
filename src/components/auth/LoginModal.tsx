import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@contexts/AuthContext';
import { useFirebaseLogin } from '@hooks/useFirebaseLogin';
import { useLoginModalStore } from '@store/useLoginModalStore';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginModal() {
  const navigate = useNavigate();
  const { isOpen, reason, close } = useLoginModalStore();
  const { currentUser, userData, loading } = useAuth();
  const { isPendingGoogle, isPendingSendLink, login, sendEmailLink, showError } =
    useFirebaseLogin();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const bgBtn = useColorModeValue('#ffffff', '#1F2937');
  const colorBtn = useColorModeValue('#202124', '#E5E7EB');
  const borderBtn = useColorModeValue('#E0E0E0', '#404854');
  const googleHoverBg = useColorModeValue('#F8F9FA', '#2D3748');
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  async function handleSignIn() {
    const result = await login();
    if (!result.success) showError(result.error);
  }

  async function handleSendLink() {
    if (!EMAIL_REGEX.test(email.trim())) {
      showError({ type: 'firebase', message: 'Ingresá un email válido.' });
      return;
    }
    const result = await sendEmailLink(email.trim());
    if (!result.success) {
      showError(result.error);
      return;
    }
    setEmailSent(true);
  }

  useEffect(() => {
    if (!isOpen) return;
    if (!currentUser) return;
    if (loading) return;
    if (userData?.username) {
      close();
      window.location.reload();
    } else {
      close();
      navigate('/create-username', { state: { userId: currentUser.uid } });
    }
  }, [isOpen, currentUser, userData, loading, navigate, close]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setEmailSent(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered motionPreset='scale'>
      <ModalOverlay backdropFilter='blur(4px)' />
      <ModalContent mx='4'>
        <ModalHeader textAlign='center'>Ingresar a XBuReads</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {reason && (
            <Text fontSize='sm' color={subColor} textAlign='center' mb='4'>
              {reason}
            </Text>
          )}
          {emailSent ? (
            <Box textAlign='center' py='4'>
              <Text fontSize='sm' mb='2'>
                Te enviamos un enlace a <strong>{email}</strong>.
              </Text>
              <Text fontSize='xs' color={subColor}>
                Revisá tu bandeja de entrada y hacé click para completar el ingreso.
              </Text>
            </Box>
          ) : (
            <Flex direction='column' gap='4'>
              <Button
                w='full'
                h='48px'
                fontWeight='500'
                fontSize='md'
                leftIcon={<FcGoogle size='24px' />}
                bg={bgBtn}
                color={colorBtn}
                border='1px solid'
                borderColor={borderBtn}
                borderRadius='8px'
                transition='all 0.2s ease'
                _hover={{ bg: googleHoverBg }}
                onClick={handleSignIn}
                loadingText='Esperando confirmación...'
                isLoading={isPendingGoogle}
                isDisabled={isPendingGoogle || isPendingSendLink}
              >
                Continuar con Google
              </Button>
              <Flex align='center' gap='3'>
                <Divider />
                <Text fontSize='sm' color={subColor} whiteSpace='nowrap'>
                  o
                </Text>
                <Divider />
              </Flex>
              <Flex direction='column' gap='2'>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  bg={bgColorInput}
                  fontSize={{ base: 'md', md: 'sm' }}
                  _focus={{ bg: 'transparent' }}
                  isDisabled={isPendingSendLink || isPendingGoogle}
                />
                <Button
                  w='full'
                  h='44px'
                  fontWeight='500'
                  fontSize='sm'
                  border='1px'
                  bg={bgColorButton}
                  color='black'
                  _hover={{ bg: 'green.600' }}
                  _active={{ bg: 'green.600' }}
                  onClick={handleSendLink}
                  isLoading={isPendingSendLink}
                  isDisabled={isPendingSendLink || isPendingGoogle || !email.trim()}
                  loadingText='Enviando enlace...'
                >
                  Continuar con Email
                </Button>
              </Flex>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Text fontSize='xs' color={subColor} textAlign='center'>
            Al continuar aceptás nuestros Términos y la Política de Privacidad.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
