import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { test, expect } from 'vitest';

import theme from '../../../../theme';
import { Card } from '../../../components/cards/Card';
// import { CardType } from '../../../components/types';

interface CardType {
  id?: string;
  title: string;
  synopsis?: string;
  authors: string[];
  category: string[];
  year?: number;
  language?: any;
  sourceLink?: string;
  numberPages?: number;
  format?: string;
  pathUrl: string;
  refetchQueries?: () => any | unknown;
  image?: {
    url: string;
    public_id: string;
  };
}

test('Render Card component', () => {
  const bookMock: CardType = {
    image: {
      url: 'https://res.cloudinary.com/xbu/image/upload/v1692010873/xbu/wpoypu6cfnda2btva5s0.webp',
      public_id: 'xbu/wpoypu6cfnda2btva5s0',
    },
    title: 'Los peligros de fumar en la cama',
    authors: ['Mariana Enriquez'],
    synopsis:
      'Una nina desentierra en el jardin unos huesos que resultan no ser de un animal; la bucolica escena veraniega de unas chicas que se banan en un paraje natural acaba convertida en un infierno de celos de inquietantes consecuencias; un mendigo despreciado siembra la desgracia en un barrio pudiente; Barcelona se transforma en un escenario perturbador; marcado por la culpa y del que es imposible escapar; una presencia fantasmal busca un sacrificio en un balneario; una chica siente una atraccion fetichista por los corazones enfermos; un rockero fallecido de un modo atroz recibe un homenaje de sus fans que va mas alla de lo imaginable; un chico que filma clandestinamente a parejas haciendo el amor y a mujeres con tacones altos caminando por las calles recibe una propuesta que le cambiara la vida...\nEn los doce soberbios cuentos que componen este volumen Mariana Enriquez despliega todo un repertorio de recursos del relato clasico de terror: apariciones espectrales; brujas; sesiones de espiritismo; grutas; visiones; muertos que vuelven a la vida... Pero; lejos de proponer una mera revisitacion arqueologica del genero; reelabora ese material con una voz propia y radicalmente moderna. Tirando del hilo de la mejor tradicion; la lleva un paso mas alla; con historias que indagan en lo siniestro que se agazapa en lo cotidiano; despliegan un turbio erotismo y crean imagenes poderosisimas que dejan una huella indeleble.\n\nQuienes descubrieron a Mariana Enriquez con Las cosas que perdimos en el fuego tienen ahora en sus manos un libro anterior; en el que ya aparece perfectamente dibujado el universo de una escritora que conecta con maestros modernos de la literatura de terror como Shirley Jackson; Thomas Ligotti o su compatriota Cortazar. Enriquez se asoma a los abismos mas reconditos del alma humana; a las soterradas corrientes de la sexualidad y la obsesion... Como ha dicho Leila Guerriero: ´El terror; en los cuentos de Mariana Enriquez; se desliza como un jadeo de agua negra sobre baldosas al sol. Como algo imposible que; sin embargo; podria suceder.´',
    category: ['Ficción', 'Literatura'],
    sourceLink:
      'https://www.anagrama-ed.es/libro/narrativas-hispanicas/los-peligros-de-fumar-en-la-cama/9788433998248/NH_580',
    language: 'Español',
    year: 2017,
    numberPages: 232,
    format: 'Físico',
    pathUrl: 'los-peligros-de-fumar-en-la-cama-rXb6',
    id: '64da097a85df016d471dad12',
  };

  const { title, authors, category, language, pathUrl, image } = bookMock;

  render(
    <ChakraProvider theme={theme}>
      <MemoryRouter>
        <Card
          category={category}
          title={title}
          authors={authors}
          image={image}
          pathUrl={pathUrl}
          language={language}
        />
      </MemoryRouter>
    </ChakraProvider>,
  );

  expect(screen.getByText('ciencia'));
  expect(screen.getByText('tierra'));
  expect(screen.getByText('franco'));
  expect(image).toEqual('http://www.ciencia.com/publications/tierra');
});
