import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
  Icon,
} from '@chakra-ui/react';
import {
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { FaCheckCircle } from 'react-icons/fa';

import { ModalProps } from './types';

export function ModalShare({ shareUrl, data, isOpen, onClose }: ModalProps) {
  const bgInput = useColorModeValue('gray.200', 'gray.900');
  const bgToast = useColorModeValue('black', 'white');
  const colorToast = useColorModeValue('white', 'black');
  const toast = useToast();

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        duration: 3000,
        containerStyle: {
          fontFamily: 'sans-serif',
        },
        render: () => (
          <Flex color={colorToast} p={3} bg={bgToast} rounded='lg'>
            <Icon as={FaCheckCircle} boxSize='5' mr='2' />
            El enlace se ha copiado al portapapeles
          </Flex>
        ),
      });
    } catch (err) {
      console.error('Error al copiar el texto al portapapeles:', err);
    }
  }

  function handleCopyClick() {
    copyToClipboard(shareUrl);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: 'xs', md: 'lg' }}
      >
        <ModalOverlay backdropFilter='blur(5px)' />
        <ModalContent>
          <ModalHeader>Compartir</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap='3' mb='7' justify='space-evenly' flexWrap='wrap'>
              <Flex direction='column' align='center'>
                <WhatsappShareButton url={shareUrl} title={data}>
                  <Icon
                    as={WhatsappIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                </WhatsappShareButton>
                <Box as='span' fontSize='sm' mt='3'>
                  WhatsApp
                </Box>
              </Flex>
              <Flex direction='column' align='center'>
                <FacebookShareButton url={shareUrl} title={data}>
                  <Icon
                    as={FacebookIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                </FacebookShareButton>
                <Box as='span' fontSize='sm' mt='3'>
                  Facebook
                </Box>
              </Flex>
              <Flex direction='column' align='center'>
                <TwitterShareButton url={shareUrl} title={data}>
                  <Icon
                    as={TwitterIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                </TwitterShareButton>
                <Box as='span' fontSize='sm' mt='3'>
                  Twitter
                </Box>
              </Flex>
              <Flex direction='column' align='center'>
                <TelegramShareButton url={shareUrl} title={data}>
                  <Icon
                    as={TelegramIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                </TelegramShareButton>
                <Box as='span' fontSize='sm' mt='3'>
                  Telegram
                </Box>
              </Flex>
              <Flex direction='column' align='center'>
                <EmailShareButton url={shareUrl} title={data}>
                  <Icon
                    as={EmailIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                </EmailShareButton>
                <Box w='90px' textAlign='center' as='span' fontSize='sm' mt='3'>
                  Correo electrónico
                </Box>
              </Flex>
            </Flex>
            <Flex justify='center' mb='4'>
              <Input
                size='lg'
                fontSize='sm'
                bg={bgInput}
                value={shareUrl}
                readOnly
              />
              <Button
                size='lg'
                onClick={handleCopyClick}
                ml='2'
                bg='#2de000'
                color='black'
                p='4'
                fontWeight='light'
                border='1px'
                rounded='lg'
                _hover={{ outline: 'none', bg: '#28c900' }}
              >
                Copiar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
