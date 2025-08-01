import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Box, useColorModeValue, Link, Icon, Text } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { CardType } from '@components/types';
import { useHandleEnterKey } from '@utils/utils';

export function RelatedCard({ title, authors, pathUrl, refetchQueries }: CardType) {
  const handleEnterKey = useHandleEnterKey(pathUrl);
  const borderCard = useColorModeValue('gray.200', 'gray.600');
  const colorAuthorCard = useColorModeValue('gray.600', 'gray.300');
  const colorLink = useColorModeValue('green.900', 'green.50');
  const bgRandomBookCardLink = useColorModeValue('green.50', 'green.900');
  const outlineCard = useColorModeValue('black', 'white');

  return (
    <>
      <Box
        w='full'
        h={{ base: 'auto', md: '270px' }}
        mx={{ base: 0, md: 2 }}
        rounded='xl'
        border='1px'
        borderColor={borderCard}
        boxShadow='lg'
        overflow='hidden'
        my='2'
        bg='transparent'
        position='relative'
        tabIndex={0}
        onKeyDown={handleEnterKey}
        _focus={{ outline: `3px solid ${outlineCard}` }}
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction='column'>
            <Box p='4'>
              <Text
                as='h1'
                fontSize='lg'
                lineHeight='7'
                fontWeight='800'
                mb='2'
                textTransform='uppercase'
                noOfLines={3}
              >
                {title}
              </Text>
              {authors.map((author, index) => (
                <Box
                  key={index}
                  textTransform='uppercase'
                  fontSize='sm'
                  color={colorAuthorCard}
                >
                  {author}
                  {index < authors.length - 1 && ', '}
                </Box>
              ))}
            </Box>
          </Flex>
          <Link
            as={NavLink}
            to={`/book/view/${pathUrl}`}
            onClick={refetchQueries}
            w='full'
            bg={bgRandomBookCardLink}
            py='4'
            px='7'
            color={colorLink}
            position={{ base: 'initial', md: 'absolute' }}
            bottom='0'
            tabIndex={-1}
            _hover={{ outline: 'none' }}
          >
            <Flex align='center'>
              Ver libro
              <Icon as={FiArrowRight} ml='2' />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
