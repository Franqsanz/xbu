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

export type { LinkProps, CardProps };
