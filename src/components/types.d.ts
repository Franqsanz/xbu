import React from 'react';

interface LinkProps {
  name: string;
  href?: string;
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
  count?: number;
  m?: string;
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

export type {
  LinkProps,
  CardProps,
  TitleProps,
  HeadProps,
  PropsTag,
  Book,
  ModalCropperProps,
  ModalProps,
  ReleatedBooksProps,
};
