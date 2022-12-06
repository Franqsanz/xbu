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
  format: string;
  // imgUrl: string
}

interface TitleProps {
  title: string | undefined;
}

interface HeadProps {
  title: string;
  description?: string;
  urlImage?: string;
}

interface PropsTag {
  name: string;
  m?: string;
}

export type { LinkProps, CardProps, TitleProps, HeadProps, PropsTag };
