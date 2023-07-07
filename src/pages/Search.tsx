import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CgOptions } from 'react-icons/cg';
import {
  Button,
  Flex,
  Icon,
  useDisclosure,
  Box,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import { Card } from '../components/cards/Card';
import { CardProps, LanguageProps } from '../components/types';
import { useFilter } from '../hooks/querys';
import { ContainerTitle } from '../components/ContainerTitle';
import { MySimpleGrid } from '../components/MySimpleGrid';
import { MainHead } from '../components/Head';
import { Aside } from '../components/Aside';
import ResultLength from '../components/ResultLength';
import { FilterDrawer } from '../components/FilterDrawer';

export default function Search() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { query, param } = useParams();
  let asideFilter;
  let buttonFilter;

  const { data } = useFilter(query, param);

  function getLanguages(data: Array<CardProps>): LanguageProps | null {
    const languagesMap = data.reduce((acc, book) => {
      const language = book.language;

      if (language) {
        acc[language] = (acc[language] || 0) + 1;
      }

      return acc;
    }, {});

    const language = Object.keys(languagesMap);

    if (language.length === 1) {
      return null;
    }

    return { language, languagesMap };
  }

  const languagesData = getLanguages(data);

  const filteredBooks = data.filter(({ language }) => {
    return languages.length === 0 || languages.includes(language);
  });

  function handleLanguageChange(languages) {
    setLanguages(languages);
    setSelectedLanguage(languages);
  }

  if (languagesData) {
    const { language, languagesMap } = languagesData;

    asideFilter = (
      <Flex display={{ base: 'none', md: 'flex' }} direction='column' mt='10'>
        <RadioGroup
          value={selectedLanguage}
          onChange={handleLanguageChange}
          colorScheme='green'
        >
          <Flex align='center' py='2' mb='2' fontSize='xl' fontWeight='bold'>
            <Icon as={CgOptions} boxSize='20px' mr='2' />
            Filtrar
          </Flex>
          <Flex direction='column-reverse' gap='3'>
            {language &&
              language.map((language) => (
                <Radio key={language} value={language}>
                  {language}
                  <Box as='span' ml='2' color='gray.500'>
                    ({languagesMap && languagesMap[language]})
                  </Box>
                </Radio>
              ))}
            <Radio value=''>Todos</Radio>
          </Flex>
        </RadioGroup>
      </Flex>
    );

    buttonFilter = (
      <Flex
        display={{ base: 'flex', md: 'none' }}
        py='3'
        px='10'
        justify='flex-end'
        borderBottom='1px solid #A0AEC0'
      >
        <Button
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          fontWeight='500'
          size='md'
        >
          <Icon as={CgOptions} boxSize='20px' mr='2' />
          Filtrar
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <MainHead title={`Libros de ${param} | XBuniverse`} />
      <ContainerTitle title={`Libros de ${param}`} showSearch={true} />
      {buttonFilter}
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        language={languagesData?.language}
        languagesMap={languagesData?.languagesMap}
        handleLanguageChange={handleLanguageChange}
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <ResultLength data={data} />
          {asideFilter}
        </Aside>
        <MySimpleGrid>
          {filteredBooks.map(
            ({
              id,
              title,
              synopsis,
              author,
              category,
              sourceLink,
              image,
              pathUrl,
            }: CardProps) => (
              <React.Fragment key={id}>
                <Card
                  id={id}
                  category={category}
                  title={title}
                  author={author}
                  synopsis={synopsis}
                  sourceLink={sourceLink}
                  // pathUrl={pathUrl}
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
