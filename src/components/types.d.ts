import React from 'react';

interface LinkProps {
  name: string;
  href?: string;
  icon?: React.ReactComponentElement;
}

interface BooksCategory {
  value: string;
  label: string;
}

interface BooksFormat {
  value: string;
  label: string;
}

interface CardProps {
  id?: string;
  title: string;
  synopsis?: string;
  author: string;
  category: string;
  year?: number;
  language?: number;
  sourceLink?: string;
  numberPages?: number;
  format?: string;
  refetchQueries?: () => any | unknown;
  image?: {
    url: string;
  };
}

interface TitleProps {
  title: string | undefined;
  showSearch: boolean;
}

interface HeadProps {
  title: string;
  description?: string;
  urlImage?: string;
}

interface PropsTag {
  name: string | any;
  size: string;
  count?: number;
  margin?: string;
  isFocused?: boolean;
  tabIndex?: number;
}

interface Book {
  id?: string;
  title: string;
  author: string;
  synopsis: string;
  year: string;
  category: string;
  numberPages: string;
  sourceLink?: string;
  language: string;
  format: string;
  image?: {
    url: null;
    public_id: string;
  };
}

interface ModalCropperType {
  isOpen: boolean;
  onClose: () => void;
  getCropData: () => any;
}

type ModalCropperProps = ModalCropperType & {
  children: React.ReactNode;
};

interface ModalProps {
  shareUrl?: string;
  data?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ReleatedBooksProps {
  currentBookId: string | undefined;
}

interface SelectProps {
  value: string;
  total: number;
}

interface PropsDrawer {
  isOpen: boolean;
  onClose: () => void;
  languages: Array<string>;
  handleLanguageChange: (languages: any) => void;
  language: string[] | undefined;
  languagesMap: { [key: string]: number } | undefined;
}

export type {
  LinkProps,
  BooksCategory,
  BooksFormat,
  CardProps,
  TitleProps,
  HeadProps,
  PropsTag,
  Book,
  ModalCropperProps,
  ModalProps,
  ReleatedBooksProps,
  SelectProps,
  PropsDrawer,
};
