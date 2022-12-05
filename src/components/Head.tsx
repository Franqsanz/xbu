import React from 'react';
import { Helmet } from 'react-helmet';

import { HeadProps } from './types';

export function Title({ title, description }: HeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Helmet>
  );
}
