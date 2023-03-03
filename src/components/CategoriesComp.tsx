import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import { TagComponent } from '../components/TagComponent';
import { useAllBooks } from '../hooks/querys';
import { CardProps } from '../components/types';

export default function CategoriesComp() {
  const { data } = useAllBooks();

  let categories = new Set();

  data && data.map(({ category }: CardProps) => categories.add(category));
  const categoryLinks = Array.from(categories).sort();

  function countCategory(ctry: any) {
    return data.filter(({ category }: CardProps) => category === ctry).length;
  }

  return (
    <>
      {categoryLinks.map((category, index) => (
        <Link
          display='flex'
          key={index}
          as={NavLink}
          to={`/books/search/category/${category}`}
          _hover={{ outline: 'none' }}
        >
          <TagComponent name={category} count={countCategory(category)} m='1' />
        </Link>
      ))}
    </>
  );
}
