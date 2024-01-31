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
import { MdCopyAll } from 'react-icons/md';

import { ModalType } from '@components/types';

export function ModalShare({ shareUrl, data, isOpen, onClose }: ModalType) {
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
    if (shareUrl !== undefined) {
      copyToClipboard(shareUrl);
    }
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
            <Flex
              gap='3'
              mb='7'
              justify='space-evenly'
              align='flex-start'
              flexWrap='wrap'
            >
              <WhatsappShareButton url={shareUrl || ''} title={data}>
                <Flex direction='column' align='center'>
                  <Icon
                    as={WhatsappIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                  <Box as='span' fontSize='sm' mt='3'>
                    WhatsApp
                  </Box>
                </Flex>
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl || ''} title={data}>
                <Flex direction='column' align='center'>
                  <Icon
                    as={FacebookIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                  <Box as='span' fontSize='sm' mt='3'>
                    Facebook
                  </Box>
                </Flex>
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl || ''} title={data}>
                <Flex direction='column' align='center'>
                  <Icon
                    as={TwitterIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                  <Box as='span' fontSize='sm' mt='3'>
                    X
                  </Box>
                </Flex>
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl || ''} title={data}>
                <Flex direction='column' align='center'>
                  <Icon
                    as={TelegramIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                  <Box as='span' fontSize='sm' mt='3'>
                    Telegram
                  </Box>
                </Flex>
              </TelegramShareButton>
              <EmailShareButton url={shareUrl || ''} title={data}>
                <Flex direction='column' align='center'>
                  <Icon
                    as={EmailIcon}
                    boxSize={{ base: 10, md: 12 }}
                    rounded='3xl'
                  />
                  <Box
                    w='90px'
                    textAlign='center'
                    as='span'
                    fontSize='sm'
                    mt='3'
                  >
                    Correo electrónico
                  </Box>
                </Flex>
              </EmailShareButton>
            </Flex>
            <Flex justify='center' mb='4'>
              <Input
                size='lg'
                fontSize='sm'
                bg={bgInput}
                value={shareUrl || ''}
                readOnly
              />
              <Button
                w='145px'
                size='lg'
                onClick={handleCopyClick}
                ml='2'
                bg='green.500'
                color='black'
                p='5'
                fontWeight='normal'
                border='1px'
                rounded='lg'
                _hover={{ outline: 'none', bg: 'green.600' }}
              >
                <Flex align='center'>
                  <Icon as={MdCopyAll} boxSize='5' mr='1' />
                  Copiar
                </Flex>
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
