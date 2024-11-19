import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  useDisclosure,
} from '@chakra-ui/react';

import { useCollectionDetail, useDeleteCollections } from '@hooks/queries';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { Card } from '@components/cards/Card';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { NoData } from '@assets/assets';
import { MyContainer } from '@components/ui/MyContainer';
import { useAuth } from '@contexts/AuthContext';
import { MdOutlineExplore } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';
import { SkeletonDCollection } from '@components/skeletons/SkeletonDCollection';
import { useMyToast } from '@hooks/useMyToast';
import { FaCheckCircle } from 'react-icons/fa';
import { ModalCollection } from '@components/modals/ModalCollection';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';

export function CollectionDetail() {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const myToast = useMyToast();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    data,
    isPending: isPendingData,
    refetch,
  } = useCollectionDetail(collectionId);
  const { mutate, isSuccess, isPending: isPendingDelete } = useDeleteCollections();
  let asideAndCardsUI;

  useEffect(() => {
    if (isSuccess) {
      navigate(`/my-collections`, { replace: true });
      myToast({
        title: `Se elimino la colección ${data?.name}.`,
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '200px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }, [isSuccess, navigate]);

  if (isPendingData) {
    return <SkeletonDCollection />;
  }

  function deleteCollection(id: string) {
    mutate([uid, id]);
  }

  function handleGoBack() {
    return navigate(-1);
  }

  if (data?.books.length > 0) {
    asideAndCardsUI = (
      <MySimpleGrid>
        {data?.books.map(
          ({
            id,
            category,
            language,
            title,
            authors,
            synopsis,
            sourceLink,
            pathUrl,
            image,
          }) => (
            <React.Fragment key={id}>
              <Card
                id={id}
                category={category}
                language={language}
                title={title}
                authors={authors}
                synopsis={synopsis}
                sourceLink={sourceLink}
                pathUrl={pathUrl}
                image={image}
              />
            </React.Fragment>
          ),
        )}
      </MySimpleGrid>
    );
  } else {
    asideAndCardsUI = (
      <Flex
        w='full'
        direction='column'
        justify='center'
        align='center'
        mt='5'
        mb='20'
      >
        <Image src={NoData} maxW='full' w={{ base: '200px', md: '400px' }} mt='5' />
        <Box
          my='7'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Aún no hay libros agregados
        </Box>
        <Link
          as={NavLink}
          to='/explore'
          bg='green.500'
          color='black'
          p='3'
          border='1px'
          rounded='lg'
          textAlign='center'
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          <Flex align='center' justify='center'>
            <Icon as={MdOutlineExplore} fontSize='25' mr='2' />
            Agregar libros
          </Flex>
        </Link>
      </Flex>
    );
  }

  return (
    <>
      <MainHead title={`${data?.name} | Mis colecciones | XBuniverse`} />
      <ContainerTitle title={data?.name} />
      <ModalCollection
        title='Editar colección'
        textButton='Guardar'
        nameCollection={data?.name}
        collectionId={collectionId}
        isEditing={true}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        refetch={refetch}
      />
      <ModalConfirmation
        isOpen={isOpenDelete}
        title={data?.name}
        isStrong={true}
        warningText='La colección será eliminada de manera permanente y no se podrá recuperar.'
        onDeleteBook={() => deleteCollection(data?.id)}
        isPending={isPendingDelete}
        onClose={onCloseDelete}
      />
      <Flex m='0 auto'>
        <Flex
          w={{ base: '1315px', '2xl': '1580px' }}
          mt='4'
          px={{ base: '6', md: '20', sm: '10' }}
          // borderBottom={`1px solid ${grayColor}`}
          justify='space-between'
          align='center'
        >
          <Button fontWeight='normal' w='90px' size='sm' onClick={handleGoBack}>
            <Flex align='center' justify='center'>
              <Icon as={FiArrowLeft} boxSize='4' mr='1' />
              Volver
            </Flex>
          </Button>
          <Flex gap='3'>
            <Button
              onClick={onOpenEdit}
              size='sm'
              fontWeight='normal'
              _hover={{ color: 'none' }}
            >
              Editar nombre
            </Button>
            <Button
              onClick={onOpenDelete}
              size='sm'
              fontWeight='normal'
              bg='red.500'
              color='white'
              _hover={{ color: 'none' }}
            >
              Eliminar colección
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <MyContainer>{asideAndCardsUI}</MyContainer>
    </>
  );
}
