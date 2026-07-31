import React from 'react';
import { Helmet } from 'react-helmet-async';

import { HeadType } from '@components/types';
// million-ignore
export function MainHead({ title, description, urlImage }: HeadType) {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      {/* <meta name='twitter:site' content='@Franqsanz' />
      <meta name='twitter:creator' content='@Franqsanz' /> */}
      <meta name='twitter:url' content='https://www.xbureads.com/' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={urlImage} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='XBuReads' />
      <meta property='og:url' content='https://www.xbureads.com/' />
      <meta property='og:locale' content='es_AR' />
      <meta property='og:image' content={urlImage} />
      <meta property='og:image:width' content='1358' />
      <meta property='og:image:height' content='583' />
      <link rel='canonical' href='https://www.xbureads.com/' />
      <link rel='icon' type='image/svg+xml' href='/logo.png' />
      {/* Poppins ya viene self-hosted desde el build (vite-plugin-webfont-dl),
          así que el stylesheet de Google Fonts y sus preconnect sólo agregaban
          dos conexiones nuevas y un CSS que bloquea el render. */}
    </Helmet>
  );
}
