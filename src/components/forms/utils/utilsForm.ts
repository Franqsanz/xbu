import React, { useRef } from 'react';
import pako from 'pako';
import { MyChangeEvent } from '@components/types';

function handleInputChange(
  e: MyChangeEvent,
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
  } else if (name === 'rating') {
    const rating = parseFloat(value);

    setBooks({
      ...books,
      [name]: rating,
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

async function handleImage(e, setCropData, onOpen) {
  const file = e.target.files?.[0];
  if (!file) return;

  // 2 MB
  if (file.size > 2000000) {
    alert(
      `El tamaño de la imagen es mayor a 2 MB. Por favor, seleccione una imagen de menor tamaño.`,
    );

    return;
  }

  const blobImage = new Blob([file], { type: 'image/webp' });
  setCropData(URL.createObjectURL(blobImage));

  onOpen();
}

async function getCrop(crop, setPreviewImg, books, setBooks, onClose) {
  if (typeof crop !== 'undefined') {
    const croppedCanvas = crop.getCroppedCanvas();
    croppedCanvas.toBlob((blob) => {
      setPreviewImg(blob);

      if (blob) {
        const reader = new FileReader();
        reader.onload = function () {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const compressedArrayBuffer = pako.deflate(uint8Array);
          const byteArray = [...new Uint8Array(compressedArrayBuffer)];
          const publicId = books.image.public_id;
          const pId = publicId.replace('xbu/', '');

          setBooks((prevBooks) => ({
            ...prevBooks,
            image: {
              url: byteArray,
              public_id: pId,
            },
          }));
        };
        reader.readAsArrayBuffer(blob);

        onClose();
      }
    }, 'image/webp');
  }
}

export {
  handleInputChange,
  handleCategory,
  handleField,
  useFileInputRef,
  handleImage,
  getCrop,
};
