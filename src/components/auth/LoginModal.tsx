import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
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

export function LoginModal() {
  const navigate = useNavigate();
  const { isOpen, reason, close } = useLoginModalStore();
  const { currentUser, userData } = useAuth();
  const { isPending, login, showError } = useFirebaseLogin();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const bgBtn = useColorModeValue('#ffffff', '#1F2937');
  const colorBtn = useColorModeValue('#202124', '#E5E7EB');
  const borderBtn = useColorModeValue('#E0E0E0', '#404854');

  async function handleSignIn() {
    const result = await login();
    if (!result.success) showError(result.error);
  }

  useEffect(() => {
    if (!isOpen) return;
    if (currentUser && userData) {
      if (!userData.username) {
        close();
        navigate('/create-username', { state: { userId: currentUser.uid } });
      } else {
        close();
        window.location.reload();
      }
    }
  }, [isOpen, currentUser, userData, navigate, close]);

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
          <Box>
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
              _hover={{ bg: useColorModeValue('#F8F9FA', '#2D3748') }}
              onClick={handleSignIn}
              loadingText='Esperando confirmación...'
              isLoading={isPending}
              isDisabled={isPending}
            >
              Continuar con Google
            </Button>
          </Box>
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
