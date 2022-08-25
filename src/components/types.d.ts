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
  numberPages: number;
  // imgUrl: string
}

interface TitleProps {
  title: string | undefined;
}

export type { LinkProps, CardProps, TitleProps };
