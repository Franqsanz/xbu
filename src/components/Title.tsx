import React from 'react';
import { Helmet } from 'react-helmet';

import { PageTitleProps } from './types';

export function Title({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
