import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import { MyTag } from '../components/MyTag';
import { useAllCategories } from '../hooks/querys';

export default function Categories() {
  const { data } = useAllCategories();

  // let categories = new Set();

  // data &&
  //   data.results.map(({ category }: CardProps) => categories.add(category));
  // const categoryLinks = Array.from(categories).sort();

  // function countCategory(ctry: any) {
  //   return data.results.filter(({ category }: CardProps) => category === ctry)
  //     .length;
  // }

  return (
    <>
      {data &&
        data.map(({ _id, count }) => (
          <Link
            display='flex'
            key={_id}
            as={NavLink}
            to={`/books/search/category/${_id}`}
            tabIndex={-1}
            _hover={{ outline: 'none' }}
          >
            <MyTag
              name={_id}
              size='lg'
              tabIndex={0}
              isFocused={true}
              count={count}
              margin='1'
            />
          </Link>
        ))}
    </>
  );
}
