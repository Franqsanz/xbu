import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Link,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { MySimpleGrid } from '@components/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/Aside';
import { MainHead } from '@components/Head';
import { useProfile } from '@hooks/querys';
import { parseDate } from '@utils/utils';
import { CardType } from '@components/types';
import ResultLength from '@components/ResultLength';
import { useAuth } from '@contexts/AuthContext';
import { NoData } from '@assets/assets';
// import { logOut } from '../../services/firebase/auth';

export function Profile() {
  const getToken = window.localStorage.getItem('app_tk');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { username } = useParams();
  const { data } = useProfile(username, uid, getToken);
  const bgCover = useColorModeValue('gray.100', 'gray.700');
  let asideAndCardsUI;

  if (data.books.length > 0) {
    asideAndCardsUI = (
      <>
        <Aside>
          <ResultLength data={data.books.length} />
          {/* {aboutCategoriesUI}
          {asideFilter}  */}
        </Aside>
        <MySimpleGrid>
          {data.books.map(
            ({
              id,
              category,
              language,
              title,
              authors,
              synopsis,
              sourceLink,
              pathUrl,
              image,
            }: CardType) => (
              <React.Fragment key={id}>
                <Card
                  id={id}
                  category={category}
                  language={language}
                  title={title}
                  authors={authors}
                  synopsis={synopsis}
                  sourceLink={sourceLink}
                  pathUrl={pathUrl}
                  image={image}
                />
              </React.Fragment>
            ),
          )}
        </MySimpleGrid>
      </>
    );
  } else {
    asideAndCardsUI = (
      <Flex
        w='full'
        direction='column'
        justify='center'
        align='center'
        mt='5'
        mb='20'
      >
        <Box
          my={{ base: 2, md: 7 }}
          fontSize={{ base: 'lg', lg: '3xl' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Bienvenido a XBuniverse
        </Box>
        <Image
          src={NoData}
          maxW='full'
          w={{ base: '200px', md: '400px' }}
          mt='5'
        />
        <Box
          my='7'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Aún no hay publicaciones
        </Box>
        <Link
          w={{ base: '85%', md: '230px' }}
          display='block'
          as={NavLink}
          to='/new-post'
          bg='green.500'
          color='black'
          p='3'
          border='1px'
          rounded='lg'
          textAlign='center'
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          <Flex align='center' justify='center'>
            <Icon as={AiOutlineCloudUpload} fontSize='25' mr='2' />
            Crear publicación
          </Flex>
        </Link>
      </Flex>
    );
  }

  return (
    <>
      <MainHead
        title={`${data.user.name} | XBuniverse`}
        urlImage={data.user.picture}
      />
      <Flex
        justify='center'
        align='center'
        direction='column'
        h={{ base: '230px', md: '260px' }}
        bg={bgCover}
      >
        <Image
          src={data.user.picture}
          alt={`Imagen de perfil de ${data.user.name}`}
          referrerPolicy='no-referrer'
          borderRadius='full'
        />
        <Box
          as='h1'
          fontSize={{ base: 'xl', md: '3xl' }}
          mt='3'
          textAlign='center'
        >
          {data.user.name}
        </Box>
        <Flex
          direction='column'
          fontSize={{ base: 'xs', md: 'sm' }}
          mt='2'
          textAlign='center'
        >
          <Box as='span' fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold'>
            Se unió el
          </Box>{' '}
          {parseDate(data.user.createdAt)}
        </Flex>
      </Flex>
      <Flex justify='center' borderBottom='1px solid #A0AEC0'>
        <Box mt='3' mb='1' fontSize={{ base: 'md', md: 'lg' }}>
          PUBLICACIONES
        </Box>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW='1700px'
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        {asideAndCardsUI}
      </Flex>
    </>
  );
}
