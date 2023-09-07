import React from 'react';
import type { IconType } from 'react-icons';

type RNode = React.ReactNode;

interface DisclosureType {
  isOpen: boolean;
  onClose: () => void;
}

interface LinkType {
  name: string;
  href?: string;
  icon?: React.ReactComponentElement;
}

interface SelectBooksType {
  value: string;
  label: string;
}

interface CardType {
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
  pathUrl: string;
  refetchQueries?: () => any | unknown;
  image?: {
    url: string;
  };
}

interface TitleType {
  title: string | undefined;
}

interface HeadType {
  title: string;
  description?: string;
  urlImage?: string;
}

interface TagType {
  bg: string;
  color: string;
  name: string | any;
  size: string;
  count?: number;
  margin?: string;
  isFocused?: boolean;
  tabIndex?: number;
  icon: IconType;
}

interface BookType {
  id?: string;
  title: string;
  author: string;
  synopsis: string;
  year: string;
  category: string[];
  numberPages: string;
  sourceLink?: string;
  language: string;
  format: string;
  pathUrl: string;
  image?: {
    url: null;
    public_id: string;
  };
}

interface ModalCropperType extends DisclosureType {
  getCropData: () => any;
}

type ModalCroppType = ModalCropperType & {
  children: RNode;
};

interface ModalType extends DisclosureType {
  shareUrl?: string;
  data?: string;
}

interface ReleatedBooksType {
  currentBookId: string | undefined;
}

interface SelectType extends Omit<SelectBooksType, 'label'> {
  total: number;
}

type languageYType = string[] | undefined;
type languagesYMapType = { [key: string]: number } | undefined;

interface LanguageAndYearType {
  language: languageYType;
  languagesMap: languagesYMapType;
  year: languageYType;
  yearsMap: languagesYMapType;
}

interface DrawerType extends DisclosureType, LanguageAndYearType {
  handleLanguageChange: (languages: any) => void;
  handleYearChange: (years: any) => void;
}

interface BookSearchResultsType {
  onOpen: () => void;
  width: string;
  top: string;
  onResultClick?: (book: string) => void | undefined;
}

interface MyLinkType extends Omit<LinkType, 'name'> {
  external: boolean;
  data?: string;
  index?: any;
}

interface CatchErrorType {
  children: RNode;
  skeletonLoad: RNode;
}

interface SkeletonType {
  showTags?: boolean;
}

export type {
  LinkType,
  SelectBooksType,
  SelectType,
  CardType,
  TitleType,
  HeadType,
  TagType,
  BookType,
  ModalCroppType,
  ModalCropperType,
  ModalType,
  ReleatedBooksType,
  DrawerType,
  LanguageAndYearType,
  BookSearchResultsType,
  MyLinkType,
  CatchErrorType,
  SkeletonType,
};
