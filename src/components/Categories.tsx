import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { MyTag } from '../components/MyTag';
import { useAllFilterOptions } from '../hooks/querys';

export default function Categories() {
  const { data } = useAllFilterOptions();

  return (
    <>
      {data &&
        data[0].categories[0].map(({ _id, count }) => (
          <Link
            display='flex'
            key={_id}
            as={NavLink}
            to={`/books/search/category/${_id}`}
            tabIndex={-1}
            _hover={{ outline: 'none' }}
          >
            <MyTag
              bg='green.50'
              color='green.900'
              icon={BsTag}
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
