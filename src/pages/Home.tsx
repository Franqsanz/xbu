import { Box } from '@chakra-ui/react';

import { MainHead } from '@components/layout/Head';
import { useAuth } from '@contexts/AuthContext';
import { LandingHome } from '@pages/LandingHome';
import { Feed } from '@components/feed/Feed';

export default function Home() {
  const { userData } = useAuth();

  return (
    <>
      <MainHead
        title='XBuReads'
        description='Comparte tus libros favoritos con la comunidad.'
        urlImage='https://www.xbureads.com/ogImage.png'
      />
      {userData ? (
        <Box
          w='full'
          maxW='4xl'
          m='auto'
          px={{ base: 4, md: 6 }}
          py={{ base: 6, md: 10 }}
        >
          <Feed />
        </Box>
      ) : (
        <LandingHome />
      )}
    </>
  );
}
