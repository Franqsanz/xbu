import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import {
  Flex,
  Box,
  useColorModeValue,
  Link,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';

import { CardProps } from '../types';
import { TagComponent } from '../TagComponent';
import { handleImageLoad } from '../../utils/utils';

export function Card({ id, title, image, author, category }: CardProps) {
  const navigate = useNavigate();
  const colorAuthorCard = useColorModeValue('gray.600', 'gray.300');
  const outlineCard = useColorModeValue('black', 'white');

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      navigate(`/book/${id}`);
    }
  }

  return (
    <>
      <LinkBox w='300px' m='2' rounded='lg' my='5' pb='4'>
        <LinkOverlay
          as={NavLink}
          to={`/book/${id}`}
          tabIndex={-1}
          _hover={{ outline: 'none' }}
        >
          <Flex direction='column' position='relative'>
            <Box p='4' ml='4' position='absolute' top='-8' left='-4'>
              <Link
                as={NavLink}
                to={`/books/search/category/${category}`}
                outline='none'
                tabIndex={-1}
                _hover={{ outline: 'none' }}
              >
                <TagComponent name={category} />
              </Link>
            </Box>
            <Box m='auto' mb='7'>
              <LazyLoad width={234} height={360} offset={0} threshold={0.99}>
                <Image
                  w='234px'
                  h='360px'
                  src={image?.url}
                  alt={`Imagen de "${title}"`}
                  rounded='lg'
                  border='1px solid #A0AEC0'
                  boxShadow='dark-lg'
                  decoding='async'
                  loading='lazy'
                  filter='blur(20px)'
                  transition='filter 0.6s ease-in-out'
                  onLoad={handleImageLoad}
                  tabIndex={0}
                  onKeyPress={handleKeyPress}
                  _hover={{
                    borderColor: 'transparent',
                    outline: `4px solid ${outlineCard}`,
                  }}
                  _focus={{ outline: `4px solid ${outlineCard}` }}
                />
              </LazyLoad>
            </Box>
            <Flex direction='column' alignItems='center'>
              <Box
                w='240px'
                fontSize='md'
                lineHeight='8'
                fontWeight='400'
                mx='1'
                textAlign='center'
                mb='2'
                textTransform='uppercase'
              >
                {title}
              </Box>
              <Box
                px='7'
                fontSize='xs'
                textTransform='uppercase'
                color={colorAuthorCard}
              >
                {author}
              </Box>
            </Flex>
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </>
  );
}
