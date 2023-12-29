import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

import { MySimpleGrid } from '../../components/MySimpleGrid';
import { Card } from '../../components/cards/Card';
import { Aside } from '../../components/Aside';
import { MainHead } from '../../components/Head';
import ResultLength from '../../components/ResultLength';
// import { useAuth } from '../../store/AuthContext';
import { useProfile } from '../../hooks/querys';
import { parseDate } from '../../utils/utils';

export default function Profile() {
  // const [userToken, setUserToken] = useState<string | undefined>('');
  const { userId } = useParams();
  // const { currentUser } = useAuth();
  const { data } = useProfile(userId);
  const bgCover = useColorModeValue('gray.100', 'gray.700');

  // useEffect(() => {
  //   function getToken() {
  //     try {
  //       currentUser?.getIdToken().then((token) => {
  //         setUserToken(token);
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getToken();
  // }, []);

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
        h='300px'
        bg={bgCover}
      >
        <Image
          src={data.user.picture}
          alt={`Imagen de perfil de ${data.user.name}`}
          borderRadius='10'
        />
        <Box as='h1' fontSize='3xl' mt='3' textAlign='center'>
          {data.user.name}
        </Box>
        <Box as='span' fontSize='sm' textAlign='center'>
          {data.user.email}
        </Box>
        <Flex direction='column' fontSize='sm' mt='2' textAlign='center'>
          <Box as='span' fontSize='md' fontWeight='bold'>
            Se unió el
          </Box>{' '}
          {parseDate(data.user.createdAt)}
        </Flex>
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
            }) => (
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
      </Flex>
    </>
  );
}
