import React from 'react';
import { Box, Flex, Text, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';

export default function PrivacyPolicies() {
  return (
    <>
      <MainHead title='Política de Privacidad | XBuReads' />
      <ContainerTitle title='Política de Privacidad' />
      <Flex as='section' maxW='1000px' p='5' m='auto' direction='column'>
        <Text mt='5'>
          En XBuReads valoramos tu privacidad. Esta política explica qué información
          recopilamos cuando usás la plataforma, cómo la utilizamos y qué derechos
          tenés sobre ella.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Información que recopilamos
        </Box>
        <Text>
          Recopilamos información que vos nos proporcionás al crear y usar tu cuenta,
          como tu nombre, correo electrónico, foto de perfil y cualquier contenido
          que decidas publicar en la plataforma. También recibimos información
          técnica básica, como el tipo de dispositivo y navegador, necesaria para que
          el servicio funcione correctamente.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cómo usamos tu información
        </Box>
        <Text>Utilizamos tu información para:</Text>
        <UnorderedList mt='2' spacing='1' pl='4'>
          <ListItem>Proveer, mantener y mejorar el servicio.</ListItem>
          <ListItem>
            Permitirte iniciar sesión y proteger tu cuenta frente a accesos no
            autorizados.
          </ListItem>
          <ListItem>
            Mostrar tu contenido público (perfil, publicaciones, comentarios) al
            resto de la comunidad.
          </ListItem>
          <ListItem>
            Comunicarnos con vos si necesitás soporte o ante cambios relevantes en el
            servicio.
          </ListItem>
        </UnorderedList>
        <Box as='h2' fontSize='xl' py='5'>
          Servicios de terceros
        </Box>
        <Text>
          Nos apoyamos en proveedores externos para funciones como autenticación,
          almacenamiento de imágenes y alojamiento del servicio. Estos proveedores
          tratan tus datos únicamente para ayudarnos a brindar la plataforma y están
          obligados a hacerlo bajo estándares razonables de seguridad y privacidad.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cookies
        </Box>
        <Text>
          Utilizamos cookies y tecnologías similares para mantener tu sesión activa,
          recordar tus preferencias y proteger la cuenta. Podés controlar o eliminar
          las cookies desde la configuración de tu navegador, pero algunas funciones
          podrían no estar disponibles sin ellas.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Tus derechos
        </Box>
        <Text>
          Podés acceder, actualizar o eliminar tu información en cualquier momento
          desde tu cuenta. Si decidís eliminar tu cuenta, removeremos tu información
          personal de nuestro servicio en un plazo razonable, salvo aquello que
          estemos obligados a conservar por motivos legales.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Seguridad
        </Box>
        <Text>
          Aplicamos medidas técnicas y organizativas razonables para proteger tu
          información. Sin embargo, ningún sistema es completamente infalible, y no
          podemos garantizar seguridad absoluta.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Menores de edad
        </Box>
        <Text>
          XBuReads no está dirigido a menores de 13 años. No recopilamos
          intencionalmente información de menores. Si creés que un menor nos envió
          datos, contactanos para eliminarlos.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cambios en esta política
        </Box>
        <Text>
          Podemos actualizar esta política cuando sea necesario. Publicaremos la
          versión más reciente en esta misma página, indicando la fecha de la última
          actualización.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Contacto
        </Box>
        <Text>
          Si tenés preguntas sobre esta política, escribinos a{' '}
          <Link
            href='mailto:franqsanz.dev@gmail.com'
            fontWeight='bold'
            color='green.800'
          >
            franqsanz.dev@gmail.com
          </Link>
          .
        </Text>
        <Text mt='5'>
          Consultá también nuestros{' '}
          <Link
            as={NavLink}
            to='/terms'
            fontWeight='bold'
            color='green.800'
            _hover={{ textDecoration: 'underline' }}
          >
            Términos y Condiciones
          </Link>
          .
        </Text>
        <Text mt='5' fontWeight='bold'>
          Última actualización: 05/06/2026
        </Text>
      </Flex>
    </>
  );
}
