import React, { useRef } from 'react';
// const fileInputRef = useRef<HTMLInputElement>(null);

function handleInputChange(
  e,
  books,
  setBooks: React.Dispatch<React.SetStateAction<any>>,
) {
  const { name, value } = e.target;

  // Si el campo es 'author', dividimos los nombres por comas en un array
  if (name === 'authors') {
    const authorNames = value.split(',');
    setBooks({
      ...books,
      [name]: authorNames, // Guardamos un array de nombres de autores
    });
  } else {
    setBooks({
      ...books,
      [name]: value,
    });
  }
}

function handleCategory(
  selectedOptions,
  setBooks: React.Dispatch<React.SetStateAction<any>>,
) {
  // Verificar si se seleccionaron opciones
  if (selectedOptions && selectedOptions.length > 0) {
    // Obtener los valores de las opciones seleccionadas
    const selectedValues = selectedOptions.map((option) => option.value);

    // Actualizar el estado de 'books' con los valores seleccionados
    setBooks((prevBooks) => ({
      ...prevBooks,
      category: selectedValues,
    }));
  } else {
    // Si no se seleccionaron opciones, establecer el estado de 'category' como un array vacío
    setBooks((prevBooks) => ({
      ...prevBooks,
      category: [],
    }));
  }
}

function handleField(
  fieldName,
  newValue,
  setBooks: React.Dispatch<React.SetStateAction<any>>,
) {
  setBooks((books) => ({
    ...books,
    [fieldName]: newValue,
  }));
}

function useFileInputRef() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return { fileInputRef, handleButtonClick };
}

export { handleInputChange, handleCategory, handleField, useFileInputRef };
