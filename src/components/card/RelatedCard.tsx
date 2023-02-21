import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flex, Box, useColorModeValue, Link, Icon } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { CardProps } from '../types';

export function RelatedCard({ id, title, author, refetchQueries }: CardProps) {
  const navigate = useNavigate();
  const borderCard = useColorModeValue('gray.200', '#28c900');
  const outlineCard = useColorModeValue('black', 'white');

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      navigate(`/book/${id}`);
    }
  }

  return (
    <>
      <Box
        w='full'
        h={{ base: 'auto', md: '245px' }}
        mx={{ base: 0, md: 2 }}
        rounded='30'
        border='1px'
        borderColor={borderCard}
        boxShadow='lg'
        overflow='hidden'
        my='2'
        bg='transparent'
        position='relative'
        tabIndex={0}
        onKeyPress={handleKeyPress}
        _focus={{ outline: `3px solid ${outlineCard}` }}
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction='column'>
            <Box p='4'>
              <Box
                as='h1'
                fontSize='xl'
                lineHeight='8'
                fontWeight='800'
                mb='2'
                color='#1f9c00'
                textTransform='uppercase'
              >
                {title}
              </Box>
              <Box textTransform='uppercase' fontSize='sm'>
                {author}
              </Box>
            </Box>
          </Flex>
          <Link
            as={NavLink}
            to={`/book/${id}`}
            onClick={refetchQueries}
            w='full'
            bg='#28c900'
            py='4'
            px='7'
            position={{ base: 'initial', md: 'absolute' }}
            bottom='0'
            _hover={{ outline: 'none', bg: '#24b300' }}
          >
            <Flex align='center' color='black'>
              Ver libro
              <Icon as={FiArrowRight} ml='2' />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
