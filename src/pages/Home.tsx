import { Flex } from '@chakra-ui/react';

import { MainHead } from '@components/layout/Head';
import { useAuth } from '@contexts/AuthContext';
import { LandingHome } from '@pages/LandingHome';
import { Feed } from '@components/feed/Feed';
import { HomeLayout } from '@components/layout/HomeLayout';
import { ContinueReading } from '@components/aside/ContinueReading';
import { WhoToFollow } from '@components/aside/WhoToFollow';
import { MyCollections } from '@components/aside/MyCollections';
import { MostViewed } from '@components/aside/MostViewed';

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
        <HomeLayout
          leftRail={<MostViewed compact />}
          rightRail={
            <Flex direction='column' gap='8'>
              <ContinueReading />
              <WhoToFollow />
              <MyCollections />
            </Flex>
          }
        >
          <Feed />
        </HomeLayout>
      ) : (
        <LandingHome />
      )}
    </>
  );
}
