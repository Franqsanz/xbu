import React from 'react';
// import { Helmet } from 'react-helmet';
import { HeadProvider, Meta, Title, Link } from 'react-head';
// import { Helmet, HelmetProvider } from 'react-helmet-async';

import { HeadProps } from './types';

export function MainHead({ title, description, urlImage }: HeadProps) {
  return (
    // <HelmetProvider>
    <HeadProvider>
      {/* <Helmet> */}
      <Meta charSet='UTF-8' />
      <Title>{title}</Title>
      <Meta name='theme-color' content='#2de000' />
      <Meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <Meta name='description' content={description} />
      <Meta name='twitter:card' content='summary_large_image' />
      <Meta name='twitter:title' content={title} />
      {/* <Meta name='twitter:site' content='@Franqsanz' />
      <Meta name='twitter:creator' content='@Franqsanz' /> */}
      <Meta name='twitter:url' content='https://xbu.netlify.app/' />
      <Meta name='twitter:description' content={description} />
      <Meta name='twitter:image' content={urlImage} />
      <Meta property='og:type' content='website' />
      <Meta property='og:title' content={title} />
      <Meta property='og:description' content={description} />
      <Meta property='og:site_name' content='XBuniverse' />
      <Meta property='og:url' content='https://xbu.netlify.app/' />
      <Meta property='og:locale' content='es_AR' />
      <Meta property='og:image' content={urlImage} />
      <Meta property='og:image:width' content='1358' />
      <Meta property='og:image:height' content='583' />
      <Link rel='canonical' href='https://xbu.netlify.app/' />
      <Link rel='icon' type='image/svg+xml' href='/logo.png' />
      <Link rel='preconnect' href='https://fonts.googleapis.com' />
      <Link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap'
        rel='stylesheet'
      />
      {/* </Helmet> */}
    </HeadProvider>
    // </HelmetProvider>
  );
}
