import React, { useEffect, useState } from 'react';
import {
  NavLink,
  ScrollRestoration,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { MdOutlineExplore } from 'react-icons/md';
import { FiArrowLeft, FiMoreVertical } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

import {
  useCollectionDetail,
  useDeleteCollections,
  useDeleteCollectionBook,
} from '@hooks/queries';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { Card } from '@components/cards/Card';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';
import { NoData } from '@assets/assets';
import { MyContainer } from '@components/ui/MyContainer';
import { useAuth } from '@contexts/AuthContext';
import { SkeletonDCollection } from '@components/skeletons/SkeletonDCollection';
import { useMyToast } from '@hooks/useMyToast';
import { ModalCollection } from '@components/modals/ModalCollection';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';

interface Book {
  id: string;
  title: string;
}

export function CollectionDetail() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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
    isOpen: isOpenDeleteBook,
    onOpen: onOpenDeleteBook,
    onClose: onCloseDeleteBook,
  } = useDisclosure();
  const {
    data,
    isPending: isPendingData,
    refetch,
  } = useCollectionDetail(collectionId);
  const { mutate, isSuccess, isPending: isPendingDelete } = useDeleteCollections();
  const {
    mutate: deleteBook,
    isSuccess: isSuccessDeleteBook,
    isPending: isPendingDeleteBook,
  } = useDeleteCollectionBook();
  const isCurrentUserAuthor = currentUser && currentUser.uid === data?.userId;
  let asideAndCardsUI;
  let btnOptionsDesktop;
  let btnOptionsMobile;

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

  useEffect(() => {
    if (isSuccessDeleteBook) {
      refetch();

      myToast({
        title: `Se elimino ${selectedBook?.title} de la colección.`,
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

      onCloseDeleteBook();
    }
  }, [isSuccessDeleteBook]);

  function handleOpenDelete(book) {
    setSelectedBook(book);
    onOpenDeleteBook();
  }

  if (isPendingData) {
    return <SkeletonDCollection />;
  }

  function deleteCollection(id: string) {
    mutate([uid, id]);
  }

  function handleGoBack() {
    return navigate(-1);
  }

  function deleteCollectionBook(collectionId: string, bookId: string) {
    deleteBook({ userId: uid, collectionId, bookId });
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
                showDeleteButton={true}
                onDelete={() => handleOpenDelete({ id, title })}
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

  if (currentUser && isCurrentUserAuthor) {
    btnOptionsDesktop = (
      <Flex display={{ base: 'none', sm: 'flex' }} gap='3'>
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
    );

    btnOptionsMobile = (
      <Box display={{ base: 'block', sm: 'none' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FiMoreVertical />}
            size='sm'
          />
          <MenuList p='0' fontSize='sm'>
            <MenuItem p='2' onClick={onOpenEdit}>
              Editar nombre
            </MenuItem>
            <MenuItem p='2' onClick={onOpenDelete}>
              Eliminar colección
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }

  return (
    <>
      <ScrollRestoration />
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
      <ModalConfirmation
        isOpen={isOpenDeleteBook}
        title={selectedBook?.title}
        isStrong={true}
        warningText='El libro será eliminado de la colección.'
        onDeleteBook={() => {
          if (collectionId && selectedBook?.id) {
            deleteCollectionBook(collectionId, selectedBook.id);
          }
        }}
        isPending={isPendingDeleteBook}
        onClose={onCloseDeleteBook}
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
          {btnOptionsDesktop}
          {btnOptionsMobile}
        </Flex>
      </Flex>
      <MyContainer>{asideAndCardsUI}</MyContainer>
    </>
  );
}
