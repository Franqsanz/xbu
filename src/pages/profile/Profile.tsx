import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

import { MySimpleGrid } from '@components/MySimpleGrid';
import { Card } from '@components/cards/Card';
import { Aside } from '@components/Aside';
import { MainHead } from '@components/Head';
import { useProfile } from '@hooks/querys';
import { parseDate } from '@utils/utils';
import { CardType } from '@components/types';
import ResultLength from '@components/ResultLength';
import { useAuth } from '@contexts/AuthContext';
// import { logOut } from '../../services/firebase/auth';

export default function Profile() {
  const getToken = window.localStorage.getItem('app_tk');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { username } = useParams();
  const { data } = useProfile(username, uid, getToken);
  const bgCover = useColorModeValue('gray.100', 'gray.700');

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
        <Box mt={{ base: 5, md: 8 }} mb='1' fontSize={{ base: 'md', md: 'lg' }}>
          PUBLICACIONES
        </Box>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW='1700px'
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data.books.length} />
          {/* {aboutCategoriesUI}
          {asideFilter}  */}
        </Aside>
        {data.books.length > 0 ? (
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
        ) : (
          <Box>Aún no hay publicaciones</Box>
        )}
      </Flex>
    </>
  );
}
