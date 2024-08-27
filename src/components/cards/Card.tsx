import React from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import {
  Flex,
  Box,
  useColorModeValue,
  Image,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';
import { IoLanguageOutline } from 'react-icons/io5';

import { CardType } from '@components/types';
import { MyTag } from '@components/ui/MyTag';
import { Views } from '@components/ui/Views';
import { handleImageLoad, useHandleEnterKey, isSpanish } from '@utils/utils';

export function Card({
  title,
  language,
  image,
  authors,
  category,
  pathUrl,
  views,
}: CardType) {
  const handleEnterKey = useHandleEnterKey(pathUrl);
  const colorAuthorCard = useColorModeValue('gray.600', 'gray.300');
  const outlineCard = useColorModeValue('black', 'white');
  const height = useBreakpointValue({
    base: '183px',
    sm: '275px',
    md: '300px',
  });

  return (
    <>
      <LinkBox mx='1' mt='5' mb='2' zIndex='0'>
        <LinkOverlay
          as={NavLink}
          to={`/book/view/${pathUrl}`}
          tabIndex={-1}
          _hover={{ outline: 'none' }}
        >
          <Flex as='figure' direction='column'>
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
                zIndex='1'
              >
                <MyTag
                  bg='green.50'
                  color='green.900'
                  icon={BsTag}
                  name={category && category[0]}
                  size='md'
                  isFocused={false}
                  tabIndex={-1}
                />
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
                  onKeyDown={handleEnterKey}
                  _hover={{
                    borderColor: 'transparent',
                    outline: `4px solid ${outlineCard}`,
                  }}
                  _focus={{ outline: `4px solid ${outlineCard}` }}
                />
              </LazyLoad>
              {!isSpanish(language) && (
                <Box position='absolute' bottom='-2' right='-2' zIndex='1'>
                  <MyTag
                    bg='yellow'
                    color='black'
                    icon={IoLanguageOutline}
                    name={language}
                    size='md'
                    isFocused={false}
                    tabIndex={-1}
                  />
                </Box>
              )}
            </Flex>
            <Flex
              as='figcaption'
              direction='column'
              alignItems='center'
              textAlign='center'
            >
              <Box
                w='full'
                maxW={{ base: '130px', lg: '210px' }}
                fontSize={{ base: 'xs', sm: 'md' }}
                fontWeight='400'
                mx='1'
                mb='2'
                textTransform='uppercase'
                sx={{
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '-webkit-line-clamp': '2',
                  lineHeight: 1.5,
                  maxHeight: 'calc(1.5em * 2)',
                }}
              >
                {title}
              </Box>
              {authors.map((author, index) => (
                <Box
                  key={index}
                  px='7'
                  fontSize={{ base: '0.55rem', sm: 'xs' }}
                  textTransform='uppercase'
                  color={colorAuthorCard}
                >
                  {author}
                  {index < authors.length - 1 && ', '}
                </Box>
              ))}
              {views !== undefined && (
                <Views
                  align='center'
                  mt='2'
                  px='7'
                  color={colorAuthorCard}
                  views={views}
                  bxSize='4'
                />
              )}
            </Flex>
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </>
  );
}
