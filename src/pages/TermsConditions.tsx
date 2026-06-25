import React from 'react';
import { Box, Flex, Text, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';

export default function TermsConditions() {
  return (
    <>
      <MainHead title='Términos y Condiciones | XBuReads' />
      <ContainerTitle title='Términos y Condiciones' />
      <Flex as='section' maxW='1000px' p='5' m='auto' direction='column'>
        <Text mt='5'>
          Bienvenido a XBuReads. Al usar la plataforma aceptás estos Términos y
          Condiciones. Te pedimos leerlos con atención antes de crear una cuenta o
          publicar contenido.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Aceptación
        </Box>
        <Text>
          El uso de XBuReads implica la aceptación plena de estos términos y de
          nuestra{' '}
          <Link
            as={NavLink}
            to='/privacy-policies'
            fontWeight='bold'
            color='green.800'
            _hover={{ textDecoration: 'underline' }}
          >
            Política de Privacidad
          </Link>
          . Si no estás de acuerdo con alguna parte, te pedimos no utilizar el
          servicio.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cuentas y registro
        </Box>
        <Text>
          Para acceder a algunas funciones es necesario crear una cuenta. Al
          registrarte, te comprometés a:
        </Text>
        <UnorderedList mt='2' spacing='1' pl='4'>
          <ListItem>Brindar información veraz y mantenerla actualizada.</ListItem>
          <ListItem>
            Ser responsable de toda actividad realizada bajo tu cuenta.
          </ListItem>
          <ListItem>
            Notificarnos si detectás un uso no autorizado de tu cuenta.
          </ListItem>
          <ListItem>Tener al menos 13 años de edad.</ListItem>
        </UnorderedList>
        <Box as='h2' fontSize='xl' py='5'>
          Contenido del usuario
        </Box>
        <Text>
          XBuReads permite publicar libros, reseñas, comentarios y otros aportes. Vos
          mantenés la propiedad del contenido que publicás, pero al hacerlo nos
          otorgás una licencia no exclusiva para mostrarlo y distribuirlo dentro de
          la plataforma, con el fin de operar el servicio.
        </Text>
        <Text mt='3'>
          Sos responsable de lo que publicás y de contar con los derechos necesarios
          sobre ese contenido.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Libros propios subidos por el usuario
        </Box>
        <Text>
          XBuReads permite subir libros de autoría propia (PDF o EPUB) para que otros
          usuarios los lean dentro de la plataforma. Al subir un archivo, confirmás
          expresamente que:
        </Text>
        <UnorderedList mt='2' spacing='1' pl='4'>
          <ListItem>
            Sos el autor del libro o contás con todos los derechos necesarios para
            publicarlo y distribuirlo.
          </ListItem>
          <ListItem>
            Asumís la responsabilidad legal exclusiva sobre el contenido subido.
          </ListItem>
          <ListItem>
            Otorgás a XBuReads una licencia no exclusiva para almacenar el archivo,
            generar enlaces firmados de corta duración y mostrarlo a los lectores
            dentro del visor de la plataforma.
          </ListItem>
        </UnorderedList>
        <Text mt='3'>
          XBuReads no permite la descarga directa del archivo y aplica medidas para
          mitigar la copia, pero estas medidas no constituyen una protección
          absoluta. Si recibimos un reclamo creíble de titulares de derechos sobre un
          libro subido, podemos retirarlo de la plataforma sin previo aviso. El abuso
          reiterado puede derivar en la suspensión o eliminación de la cuenta.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Contenido prohibido
        </Box>
        <Text>No está permitido publicar contenido que:</Text>
        <UnorderedList mt='2' spacing='1' pl='4'>
          <ListItem>Infrinja derechos de autor o de terceros.</ListItem>
          <ListItem>
            Sea discriminatorio, violento, sexualmente explícito o ilegal.
          </ListItem>
          <ListItem>Promueva acoso, amenazas o suplantación de identidad.</ListItem>
          <ListItem>Contenga spam, malware o enlaces engañosos.</ListItem>
        </UnorderedList>
        <Text mt='3'>
          Podemos remover contenido que infrinja estas reglas y suspender o eliminar
          cuentas que las incumplan reiteradamente.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Propiedad intelectual
        </Box>
        <Text>
          XBuReads, su logo y la plataforma son propiedad de sus creadores. No podés
          copiar, reproducir o redistribuir partes del servicio sin autorización. Si
          creés que algún contenido publicado viola tus derechos de autor, podés
          contactarnos para evaluar su remoción.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Disponibilidad y modificaciones del servicio
        </Box>
        <Text>
          Hacemos lo posible por mantener el servicio disponible, pero no
          garantizamos que esté libre de interrupciones o errores. Podemos modificar,
          suspender o discontinuar funciones en cualquier momento, intentando avisar
          con antelación cuando se trate de cambios relevantes.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Limitación de responsabilidad
        </Box>
        <Text>
          XBuReads se ofrece &ldquo;tal cual&rdquo;, sin garantías de ningún tipo. No
          nos hacemos responsables por la exactitud de la información publicada por
          los usuarios, ni por daños indirectos derivados del uso del servicio.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Eliminación de cuenta
        </Box>
        <Text>
          Podés eliminar tu cuenta cuando quieras desde la configuración. Al hacerlo
          se removerá tu información personal en un plazo razonable. También podemos
          suspender o eliminar cuentas que violen estos términos.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Ley aplicable
        </Box>
        <Text>
          Estos términos se rigen por las leyes de la República Argentina. Cualquier
          disputa relacionada con el servicio será resuelta ante los tribunales
          competentes de dicha jurisdicción.
        </Text>
        <Box as='h2' fontSize='xl' py='5'>
          Cambios a estos términos
        </Box>
        <Text>
          Podemos actualizar estos Términos y Condiciones cuando sea necesario. La
          versión más reciente estará siempre disponible en esta página.
        </Text>
      </Flex>
    </>
  );
}
