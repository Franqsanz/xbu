import React from 'react';
// import { Helmet } from 'react-helmet';
// import { HeadProvider, Meta, Title, Link } from 'react-head';
import { Helmet } from 'react-helmet-async';

import { HeadProps } from './types';

export function MainHead({ title, description, urlImage }: HeadProps) {
  return (
    // <HelmetProvider>
    // <HeadProvider>
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta data-rh='true' charSet='UTF-8' />
      <meta data-rh='true' name='theme-color' content='#2de000' />
      <meta
        data-rh='true'
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta data-rh='true' name='description' content={description} />
      <meta data-rh='true' name='twitter:card' content='summary_large_image' />
      <meta data-rh='true' name='twitter:title' content={title} />
      {/* <meta name='twitter:site' content='@Franqsanz' />
      <meta name='twitter:creator' content='@Franqsanz' /> */}
      <meta
        data-rh='true'
        name='twitter:url'
        content='https://xbu.netlify.app/'
      />
      <meta data-rh='true' name='twitter:description' content={description} />
      <meta data-rh='true' name='twitter:image' content={urlImage} />
      <meta data-rh='true' property='og:type' content='website' />
      <meta data-rh='true' property='og:title' content={title} />
      <meta data-rh='true' property='og:description' content={description} />
      <meta data-rh='true' property='og:site_name' content='XBuniverse' />
      <meta
        data-rh='true'
        property='og:url'
        content='https://xbu.netlify.app/'
      />
      <meta data-rh='true' property='og:locale' content='es_AR' />
      <meta data-rh='true' property='og:image' content={urlImage} />
      <meta data-rh='true' property='og:image:width' content='1358' />
      <meta data-rh='true' property='og:image:height' content='583' />
      <link data-rh='true' rel='canonical' href='https://xbu.netlify.app/' />
      <link data-rh='true' rel='icon' type='image/svg+xml' href='/logo.png' />
      <link
        data-rh='true'
        rel='preconnect'
        href='https://fonts.googleapis.com'
      />
      {/* <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        as='crossorigin'
      /> */}
      <link
        data-rh='true'
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap'
        rel='stylesheet'
      />
    </Helmet>
    // </HeadProvider>
    // </HelmetProvider>
  );
}
