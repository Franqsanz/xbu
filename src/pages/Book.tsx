import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

import { useBook } from '../hooks/querys';
import { Title } from '../components/Title';

export function Book() {
  const { id } = useParams();
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  const { data } = useBook(id);

  return (
    <>
      <Title title={`${data.title} | XBuniverse`} />
      <Flex
        w='full'
        maxW='800px'
        // h={{ base: 'auto', md: '80vh' }}
        direction='column'
        justify='center'
        p={{ base: 5, md: 14 }}
        m='.2rem auto'
      >
        <Box>
          <Tag colorScheme='green' size='lg' variant='subtle'>
            <TagLeftIcon boxSize='16px' as={BsTag} />
            <TagLabel>{data.category}</TagLabel>
          </Tag>
        </Box>
        <Box as='h1' fontSize='4xl' my='5'>
          {data.title}
        </Box>
        <Box my='2'>{data.author}</Box>
        <Text my='5'>{data.description}</Text>
        <Box>{data.publicationDate}</Box>
        <Box>{data.numberPages}</Box>
        <Box w='100px' mt='10' mb='150px'>
          <Link
            href={data.sourceLink}
            isExternal
            color='blue.600'
            fontWeight='bold'
          >
            <Flex align='center'>
              Ver aquí
              <FiExternalLink style={{ marginLeft: '6px' }} />
            </Flex>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
