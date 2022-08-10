import React from 'react';
import {
  Flex,
  Box,
  Text,
  Spinner,
  Container,
  Heading,
  useColorModeValue,
  Link,
  Tag,
  TagLeftIcon,
  TagLabel,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';

export function AllBooks() {
  interface Items {
    id: string;
    title: string;
    description: string;
    author: string;
    category: string;
    publicationDate: number;
    numberPages: number;
    // imgUrl: string
  }

  const { data, isLoading, error } = useQuery(['Books'], async () => {
    // const res = await fetch('http://localhost:9090/api/')
    const res = await fetch('https://xb-api.vercel.app/api');
    return res.json();
  });

  if (error) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='50px' />
        <AlertTitle mt='5' fontSize='xl'>
          No se pudieron obtener los datos{' '}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Flex
        w='full'
        justify='center'
        p={{ base: 2, md: 10 }}
        m='auto'
        flexWrap='wrap'
        // bg={useColorModeValue('gray.50', 'gray.700')}
      >
        {isLoading ? (
          <Spinner size='xl' />
        ) : (
          data.map(
            ({
              id,
              title,
              description,
              author,
              category,
              publicationDate,
              numberPages,
            }: Items) => (
              <React.Fragment key={id}>
                <Box
                  w='400px'
                  m='2'
                  rounded='30'
                  border='1px'
                  borderColor={useColorModeValue('gray.200', '#8bd07a')}
                  overflow='hidden'
                  boxShadow='lg'
                  my='5'
                  bg={useColorModeValue('white', 'black')}
                  // color='black'
                >
                  <Flex direction='column'>
                    {/* <Box>
                    <Image src={imgUrl} alt='' />
                  </Box> */}
                    <Box p='7'>
                      <Tag colorScheme='green' size='lg' variant='subtle'>
                        <TagLeftIcon boxSize='16px' as={BsTag} />
                        <TagLabel>{category}</TagLabel>
                      </Tag>
                    </Box>
                    <Box
                      as='h1'
                      fontSize='xx-large'
                      lineHeight='7'
                      fontFamily='monospace'
                      px='7'
                      mb='2'
                      color='#1e9800'
                    >
                      {title}
                    </Box>
                    <Box px='7'>{author}</Box>
                    <Box mb='2' p='7'>
                      <Text noOfLines={10} lineHeight='1.6'>
                        {description}
                      </Text>
                      <Box mt='5'>Fecha de lanzamiento: {publicationDate}</Box>
                      <Box>paginas: {numberPages}</Box>
                    </Box>
                    {/* <Box as='h3' fontSize='xl' mt='4'>
                    Autor
                  </Box> */}
                    {/* <Box as='span' p='7'>
                    {author}
                  </Box>
                  <Box as='h3' fontSize='xl' mt='4'>
                    Fecha de Publicacion
                  </Box> */}
                    {/* <Box as='span'>
                    {publicationDate}
                  </Box>
                  <Box as='span'>
                    {category}
                  </Box>
                  <Box as='span'>
                    {numberPages}
                  </Box> */}
                  </Flex>
                </Box>
              </React.Fragment>
            ),
          )
        )}
      </Flex>
    </>
  );
}
