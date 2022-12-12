import React from 'react';
import { Helmet } from 'react-helmet';

import { HeadProps } from './types';

export function MainHead({ title, description, urlImage }: HeadProps) {
  return (
    <Helmet>
      <meta name='theme-color' content='#2de000' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      {/* <meta name='twitter:site' content='@Franqsanz' />
      <meta name='twitter:creator' content='@Franqsanz' /> */}
      <meta name='twitter:url' content='https://xbu.netlify.app/' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={urlImage} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='XBuniverse' />
      <meta property='og:url' content='https://xbu.netlify.app/' />
      <meta property='og:locale' content='es_AR' />
      <meta property='og:image' content={urlImage} />
      <meta property='og:image:width' content='1358' />
      <meta property='og:image:height' content='583' />
      <link rel='canonical' href='https://xbu.netlify.app/' />
      <link rel='icon' type='image/svg+xml' href='/logo.png' />
    </Helmet>
  );
}
