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
  useBreakpointValue,
} from '@chakra-ui/react';

import { CardProps } from '../types';
import { TagComponent } from '../TagComponent';
import { handleImageLoad } from '../../utils/utils';

export function Card({ id, title, image, author, category }: CardProps) {
  const navigate = useNavigate();
  const colorAuthorCard = useColorModeValue('gray.600', 'gray.300');
  const outlineCard = useColorModeValue('black', 'white');
  const height = useBreakpointValue({
    base: '183px',
    sm: '275px',
    md: '300px',
  });

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      navigate(`/book/${id}`);
    }
  }

  return (
    <>
      <LinkBox mx='1' my='5' pb='4'>
        <LinkOverlay
          as={NavLink}
          to={`/book/${id}`}
          tabIndex={-1}
          _hover={{ outline: 'none' }}
        >
          <Flex direction='column'>
            <Flex
              w={{ base: '120px', sm: '180px', md: '200px' }}
              m='auto'
              mb='7'
              direction='column'
              position='relative'
            >
              <Box
                display={{ base: 'none', md: 'block' }}
                position='absolute'
                top='-2'
                left='-2'
              >
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
              <LazyLoad height={height} offset={0} threshold={0.99}>
                <Image
                  h={{ base: 'auto', md: '300px' }}
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
            </Flex>
            <Flex direction='column' alignItems='center' textAlign='center'>
              <Box
                w='full'
                maxW='240px'
                fontSize={{ base: 'xs', sm: 'md' }}
                fontWeight='400'
                mx='1'
                mb='2'
                textTransform='uppercase'
              >
                {title}
              </Box>
              <Box
                px='7'
                fontSize={{ base: '0.55rem', sm: 'xs' }}
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
