import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

import { MySimpleGrid } from '../../components/MySimpleGrid';
import { Card } from '../../components/cards/Card';
import { Aside } from '../../components/Aside';
import { MainHead } from '../../components/Head';
import ResultLength from '../../components/ResultLength';
import { useAuth } from '../../store/AuthContext';
import { useProfile } from '../../hooks/querys';

export default function Profile() {
  const { userId } = useParams();
  const { data } = useProfile(userId);
  const { currentUser } = useAuth();
  const bgCover = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <MainHead
        title={`${currentUser?.displayName as string} | XBuniverse`}
        urlImage={currentUser?.photoURL as string}
      />
      <Flex
        justify='center'
        align='center'
        direction='column'
        h='300px'
        bg={bgCover}
      >
        <Image src={currentUser?.photoURL as string} borderRadius='10' />
        <Box as='h1' fontSize='3xl' mt='3' textAlign='center'>
          {currentUser?.displayName}
        </Box>
        <Box as='span' fontSize='sm' textAlign='center'>
          {currentUser?.email}
        </Box>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW='1700px'
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data.books} />
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
