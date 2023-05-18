import React from 'react';

interface DisclosureProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LinkProps {
  name: string;
  href?: string;
  icon?: React.ReactComponentElement;
}

interface SelectBooksprops {
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

interface ModalCropperType extends DisclosureProps {
  getCropData: () => any;
}

type ModalCropperProps = ModalCropperType & {
  children: React.ReactNode;
};

interface ModalProps extends DisclosureProps {
  shareUrl?: string;
  data?: string;
}

interface ReleatedBooksProps {
  currentBookId: string | undefined;
}

interface SelectProps {
  value: string;
  total: number;
}

interface LanguageProps {
  language: string[] | undefined;
  languagesMap: { [key: string]: number } | undefined;
}

interface PropsDrawer extends DisclosureProps, LanguageProps {
  languages: Array<string>;
  handleLanguageChange: (languages: any) => void;
}

export type {
  LinkProps,
  SelectBooksprops,
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
  LanguageProps,
};
