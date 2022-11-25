interface LinkProps {
  name: string;
  href?: string;
}

interface CardProps {
  id?: string;
  title: string;
  synopsis: string;
  author: string;
  category: string;
  year: number;
  language: number;
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

interface PropsTag {
  name: string;
  m?: string;
}

export type { LinkProps, CardProps, TitleProps, PageTitleProps, PropsTag };
