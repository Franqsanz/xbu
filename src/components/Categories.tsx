import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import { MyTag } from '../components/MyTag';
import { useAllBooks } from '../hooks/querys';
import { CardProps } from '../components/types';

export default function Categories() {
  const { data } = useAllBooks();

  let categories = new Set();

  data &&
    data.results.map(({ category }: CardProps) => categories.add(category));
  const categoryLinks = Array.from(categories).sort();

  function countCategory(ctry: any) {
    return data.results.filter(({ category }: CardProps) => category === ctry)
      .length;
  }

  return (
    <>
      {categoryLinks.map((category, index) => (
        <Link
          display='flex'
          key={index}
          as={NavLink}
          to={`/books/search/category/${category}`}
          tabIndex={-1}
          _hover={{ outline: 'none' }}
        >
          <MyTag
            name={category}
            size='lg'
            tabIndex={0}
            isFocused={true}
            count={countCategory(category)}
            margin='1'
          />
        </Link>
      ))}
    </>
  );
}