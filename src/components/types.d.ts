interface LinkProps {
  name: string;
  href?: string;
}

interface CardProps {
  id?: string;
  title: string;
  description: string;
  author: string;
  category: string;
  publicationDate: number;
  sourceLink: string;
  numberPages: number;
  // imgUrl: string
}

interface TitleProps {
  title: string | undefined;
}

interface PageTitleProps {
  title: string;
}

export type { LinkProps, CardProps, TitleProps, PageTitleProps };
