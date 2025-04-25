import React from 'react';
import type { IconType } from 'react-icons';
import { User } from 'firebase/auth';

type RNode = React.ReactNode;
type MyChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

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
  authors: string[];
  category?: string[];
  year?: number;
  language?: number;
  sourceLink?: string;
  numberPages?: number;
  format?: string;
  pathUrl: string;
  refetchQueries?: () => any | unknown;
  image?: {
    url: string;
    public_id: string;
  };
  views?: number;
  onDelete?: () => any | unknown;
  userId?: string;
  showDeleteButton?: boolean;
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
  authors: string[];
  synopsis: string;
  year: string;
  category: string[];
  numberPages: string;
  sourceLink?: string;
  language: string;
  format: string;
  pathUrl?: string;
  image: {
    url: string | number[];
    public_id: string;
  };
  userId?: string | undefined;
  rating: number;
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

interface RelatedBooksType extends Omit<CardType, 'title' | 'authors' | 'pathUrl'> {
  data?: any;
  currentBookId?: string | undefined;
  refetch?: () => void;
}

interface SelectType extends Omit<SelectBooksType, 'label'> {
  total: number;
}

type OptionType = string[] | undefined;
type languagesYMapType = { [key: string]: number } | undefined;

interface LanguageAndYearType {
  language: OptionType;
  year: OptionType;
  authors: OptionType;
}

interface DrawerType extends DisclosureType, LanguageAndYearType {
  handleLanguageChange: (languages: any) => void;
  handleYearChange: (years: any) => void;
  handleAuthorChange: (authors: any) => void;
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

interface ModalOptionsAndConfirType extends Omit<Partial<BookType>>, DisclosureType {
  onDeleteBook?: () => any | void;
  onEditBook?: () => any | void;
  isPending?: boolean;
  warningText?: string;
  isStrong?: boolean;
  id?: string;
  title?: string;
  authors?: string[];
  synopsis?: string;
  year?: string;
  category?: string[];
  numberPages?: string;
  sourceLink?: string;
  language?: string;
  format?: string;
  image?: {
    url: string;
    public_id: string;
  };
  rating?: number;
}

interface BooksSectionType {
  title: string;
  data?: string;
  booksComponent: RNode;
}

interface AboutType {
  category: string;
  description: string;
}

interface MenuType {
  displayName: string | null;
  photoURL: string | null;
  username: string;
  uid?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  token: string;
  userData: any;
}

interface AuthProviderType {
  children: RNode;
}

interface Collection {
  id: string;
  name: string;
  checked?: boolean;
}

interface ModalCollectionSelectorType extends DisclosureType {
  userId: string | undefined;
  bookId: string;
  data: Collection[];
  isPending: boolean;
}

export type {
  MyChangeEvent,
  AboutType,
  DisclosureType,
  LinkType,
  SelectBooksType,
  SelectType,
  CardType,
  TitleType,
  HeadType,
  TagType,
  BookType,
  BooksSectionType,
  ModalCroppType,
  ModalCropperType,
  ModalType,
  RelatedBooksType,
  DrawerType,
  LanguageAndYearType,
  BookSearchResultsType,
  MyLinkType,
  CatchErrorType,
  SkeletonType,
  MenuType,
  AuthContextType,
  AuthProviderType,
  ModalOptionsAndConfirType,
  ModalCollectionSelectorType,
};
