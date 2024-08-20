import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { MyTag } from '@components/ui/MyTag';
import { useAllFilterOptions } from '@hooks/queries';

export default function Categories() {
  const { data } = useAllFilterOptions();

  return (
    <>
      {data &&
        data[0].categories[0].map(({ category, count }) => (
          <Link
            display='flex'
            key={category}
            as={NavLink}
            to={`/books/filter/category/${category}`}
            tabIndex={-1}
            _hover={{ outline: 'none' }}
          >
            <MyTag
              bg='green.50'
              color='green.900'
              icon={BsTag}
              name={category}
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
