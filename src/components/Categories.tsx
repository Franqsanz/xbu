import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { BsTag } from 'react-icons/bs';

import { MyTag } from '@components/ui/MyTag';
import { useAllFilterOptions } from '@hooks/queries';
import { useCategoryStore } from '@contexts/categoryStore';

export default function Categories() {
  const { data } = useAllFilterOptions();
  const location = useLocation();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const isCategoryActive = useCategoryStore((state) => state.isCategoryActive);

  // Verifica si la categoría debe estar activa en la ruta actual
  const isActive = isCategoryActive(location as any);

  function handleCategoryClick(category: string) {
    const disabledRoutes = ['/explore', '/most-viewed'];
    const isDisabled = disabledRoutes.some((route) =>
      location.pathname.startsWith(route),
    );

    if (isActive || isDisabled) {
      setSelectedCategory(category);
    } else {
      console.log('Las categorías están deshabilitadas en esta ruta.');
    }
  }

  // Eliminar la categoría seleccionada si la ruta actual está deshabilitada
  useEffect(() => {
    if (!isActive && selectedCategory) {
      setSelectedCategory(null);
    }
  }, [location, isCategoryActive, setSelectedCategory]);

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
            onClick={() => handleCategoryClick(category)}
          >
            <MyTag
              bg={selectedCategory === category ? '#FFFF00' : 'green.50'}
              color={selectedCategory === category ? 'black' : 'green.900'}
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
