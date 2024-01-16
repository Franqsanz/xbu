import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

import { ContainerTitle } from '@components/ContainerTitle';
import { MainHead } from '@components/Head';

export default function PrivacyPolicies() {
  return (
    <>
      <MainHead title='Políticas de Privacidad | XBuniverse' />
      <ContainerTitle title='Políticas de Privacidad' />
      <Flex as='section' maxW='1000px' p='5' m='auto' direction='column'>
        <Box as='h2' fontSize='xl' py='5'>
          Política de Privacidad de XBuniverse
        </Box>
        <Text>
          XBuniverse se compromete a proteger tu privacidad y a mantener seguros
          tus datos personales. Esta Política de Privacidad describe cómo
          recopilamos, utilizamos y protegemos la información que recopilamos de
          nuestros usuarios.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Recopilación de información
        </Box>
        <Text>
          Recopilamos información personal como tu nombre, dirección de correo
          electrónico y otra información relevante para proporcionar nuestros
          servicios. También podemos recopilar información no personal como la
          dirección IP, el tipo de navegador, el proveedor de servicios de
          Internet, las páginas que visitas y la hora y fecha de tu visita.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Uso de la información
        </Box>
        <Text>
          La información que recopilamos se utiliza para proporcionar nuestros
          servicios, para mejorar nuestro sitio web y para enviar información
          sobre nuestros productos y servicios. No compartimos tu información
          personal con terceros, excepto cuando sea necesario para proporcionar
          nuestros servicios o cuando lo requiere la ley.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cookies
        </Box>
        <Text>
          Utilizamos cookies y otras tecnologías similares para mejorar tu
          experiencia en nuestro sitio web y para recopilar información sobre
          tus visitas. Puedes controlar el uso de cookies en tu navegador.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Seguridad
        </Box>
        <Text>
          Tomamos medidas para proteger la información que recopilamos,
          incluyendo la utilización de medidas de seguridad físicas,
          electrónicas y procedimentales para garantizar la seguridad de la
          información.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cambios en esta política
        </Box>
        <Text>
          Podemos actualizar esta Política de Privacidad de vez en cuando. Te
          notificaremos cualquier cambio en nuestra Política de Privacidad
          publicando la nueva Política de Privacidad en nuestro sitio web.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Contacto
        </Box>
        <Text>
          Si tienes preguntas sobre nuestra Política de Privacidad, contáctanos
          en{' '}
          <Link
            href='mailto:franqsanz.dev@gmail.com'
            fontWeight='bold'
            color='green.800'
          >
            franqsanz.dev@gmail.com
          </Link>
          .
        </Text>
        <Text mt='5' fontWeight='bold'>
          Última actualización: [13/04/2023]
        </Text>
      </Flex>
    </>
  );
}
