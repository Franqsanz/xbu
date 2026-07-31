import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Button,
  FormControl,
  Icon,
  Container,
  List,
  ListItem,
  Link,
  Tooltip,
  useOutsideClick,
  Flex,
  Spinner,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { CgOptions } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

import {
  useAllSearchBooks,
  useAllSearchUsers,
  useFollowUser,
  useUnfollowUser,
} from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useDebounce } from '@hooks/useDebounce';
import { BookSearchResultsType } from '@components/types';
import { cldAvatar } from '@utils/images';

function highlightText(text, query) {
  const regex = new RegExp(`(${query.trim()})`, 'gi');
  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part,
    );
}

type SearchUser = {
  uid: string;
  name: string;
  username: string;
  picture?: string;
  isFollowing: boolean;
};

function UserRow({
  user,
  query,
  onSelect,
}: {
  user: SearchUser;
  query: string;
  onSelect: () => void;
}) {
  const { currentUser } = useAuth();
  const rowBg = useColorModeValue('gray.200', 'gray.700');
  const rowBgHover = useColorModeValue('gray.300', 'gray.600');
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isHovered, setIsHovered] = useState(false);
  const { mutate: follow, isPending: isFollowingPending } = useFollowUser();
  const { mutate: unfollow, isPending: isUnfollowingPending } = useUnfollowUser();

  const isSelf = currentUser?.uid === user.uid;
  const showButton = !!currentUser && !isSelf;
  const isPending = isFollowingPending || isUnfollowingPending;

  useEffect(() => {
    setIsFollowing(user.isFollowing);
  }, [user.isFollowing]);

  function handleFollowClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;
    if (isFollowing) {
      setIsFollowing(false);
      unfollow(user.uid, { onError: () => setIsFollowing(true) });
    } else {
      setIsFollowing(true);
      follow(user.uid, { onError: () => setIsFollowing(false) });
    }
  }

  return (
    <ListItem
      textAlign='left'
      mb='3'
      rounded='lg'
      bg={rowBg}
      _hover={{ bg: rowBgHover }}
    >
      <Link
        as={NavLink}
        to={`/profile/${user.username}`}
        display='flex'
        alignItems='center'
        gap='3'
        p='3'
        onClick={onSelect}
        _hover={{ outline: 'none', textDecoration: 'none' }}
      >
        <Avatar
          src={cldAvatar(user.picture, 32)}
          name={user.name}
          size='sm'
          referrerPolicy='no-referrer'
        />
        <Flex direction='column' flex='1' overflow='hidden'>
          <Text fontSize={{ base: 'sm', sm: 'md' }} noOfLines={1} fontWeight='500'>
            {highlightText(user.name, query)}
          </Text>
          <Text fontSize='xs' color='gray.500' noOfLines={1}>
            @{highlightText(user.username, query)}
          </Text>
        </Flex>
        {showButton && (
          <Button
            size='xs'
            minW='90px'
            fontWeight='normal'
            bg={!isFollowing ? 'green.500' : isHovered ? 'red.500' : 'black'}
            color={!isFollowing ? 'black' : 'white'}
            _hover={{ bg: isFollowing ? 'red.500' : 'green.600' }}
            onClick={handleFollowClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            isLoading={isPending}
          >
            {isFollowing && isHovered
              ? 'Dejar de seguir'
              : isFollowing
                ? 'Siguiendo'
                : 'Seguir'}
          </Button>
        )}
      </Link>
    </ListItem>
  );
}

export function InputSearch({
  onOpen,
  width,
  top,
  onResultClick,
}: BookSearchResultsType) {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const colorIcons = useColorModeValue('gray.700', 'gray.300');
  const bgInput = useColorModeValue('white', 'black');
  const colorInput = useColorModeValue('gray.900', 'gray.100');
  const colorContainerBg = useColorModeValue('white', 'black');
  const colorContainer = useColorModeValue('black', 'gray.50');
  const colorListBg = useColorModeValue('gray.200', 'gray.700');
  const colorListBgHover = useColorModeValue('gray.300', 'gray.600');
  const colorInputNotResult = useColorModeValue('gray.600', 'gray.400');
  const sectionColor = useColorModeValue('gray.600', 'gray.400');
  const [search, setSearch] = useState({ query: '' });
  const { query } = search;
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  let loading;

  const {
    data: booksData,
    error: booksError,
    isPending: isPendingBooks,
    refetch: refetchBooks,
  } = useAllSearchBooks(debouncedQuery);

  const { data: usersData, isFetching: isFetchingUsers } =
    useAllSearchUsers(debouncedQuery);

  useOutsideClick({
    ref: containerRef,
    handler: (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        search.query
      ) {
        setSearch({ ...search, query: '' });
      }
    },
  });

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      refetchBooks();
    }

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSearch({ ...search, query: '' });
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [debouncedQuery, refetchBooks]);

  const isSearching = isPendingBooks || isFetchingUsers;
  const hasBooks = Array.isArray(booksData) && booksData.length > 0;
  const hasUsers = Array.isArray(usersData) && usersData.length > 0;
  const noResults = !isSearching && !hasBooks && !hasUsers && !!booksError;

  if (isSearching && !hasBooks && !hasUsers) {
    loading = (
      <Flex justify='center' direction='column' align='center' gap='2'>
        <Spinner size='md' thickness='2px' speed='0.40s' />
        <Box fontSize='sm' textAlign='center'>
          Buscando
        </Box>
      </Flex>
    );
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch({ ...search, query: e.target.value });
  }

  function closeDropdown() {
    setSearch({ ...search, query: '' });
    onResultClick?.('');
  }

  return (
    <>
      <FormControl
        as='search'
        role='search'
        w={width}
        mr={{ base: 0, lg: 2 }}
        ref={inputRef}
      >
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} boxSize='20px' color={colorIcons} />
          </InputLeftElement>
          <Input
            type='text'
            fontSize='sm'
            size='md'
            bg={bgInput}
            border='1px solid black'
            rounded='md'
            color={colorInput}
            placeholder='Buscar libros o personas'
            _placeholder={{ color: `${colorInput}`, fontSize: 'xs' }}
            _hover={{ outline: 'none' }}
            value={search.query}
            onChange={handleSearch}
          />
          <InputRightElement justifyContent='flex-end' w='4.5rem'>
            <Tooltip
              label='Más Opciones de búsqueda'
              fontSize='sm'
              bg='black'
              color='white'
            >
              <Button
                px='0'
                onClick={onOpen}
                bg='none'
                _hover={{ bg: 'none' }}
                _active={{ bg: 'none' }}
              >
                <Icon
                  as={CgOptions}
                  boxSize='20px'
                  color={colorIcons}
                  _hover={{ color: 'green.500' }}
                />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Container
        ref={containerRef}
        display={search.query.length >= 3 ? 'block' : 'none'}
        w={width}
        maxH='400px'
        m='10px auto'
        rounded='lg'
        overflow='auto'
        boxShadow='dark-lg'
        p='4'
        bg={colorContainerBg}
        color={colorContainer}
        fontWeight='500'
        position={{ base: 'inherit', md: 'absolute' }}
        top={top}
      >
        {loading}
        {!loading && (hasBooks || hasUsers) && (
          <Tabs isFitted colorScheme='green' variant='line' size='sm'>
            <TabList>
              <Tab
                fontSize='sm'
                fontWeight='500'
                sx={{
                  '&[aria-selected=true] .tab-count': { color: 'green.500' },
                }}
              >
                Libros{' '}
                {hasBooks && (
                  <Box as='span' className='tab-count' ml='1' color={sectionColor}>
                    ({(booksData as any[]).length})
                  </Box>
                )}
              </Tab>
              <Tab
                fontSize='sm'
                fontWeight='500'
                sx={{
                  '&[aria-selected=true] .tab-count': { color: 'green.500' },
                }}
              >
                Usuarios{' '}
                {hasUsers && (
                  <Box as='span' className='tab-count' ml='1' color={sectionColor}>
                    ({(usersData as SearchUser[]).length})
                  </Box>
                )}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px='0' pt='3'>
                {hasBooks ? (
                  <List fontSize='md'>
                    {(booksData as any[]).map((book) => (
                      <ListItem
                        key={book.id}
                        tabIndex={0}
                        textAlign='left'
                        mb='3'
                        rounded='lg'
                        bg={colorListBg}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            navigate(`/book/view/${book.pathUrl}`);
                          }
                        }}
                        _hover={{ bg: `${colorListBgHover}` }}
                      >
                        <Link
                          as={NavLink}
                          to={`/book/view/${book.pathUrl}`}
                          display='block'
                          p='3'
                          onClick={closeDropdown}
                          tabIndex={-1}
                          _hover={{ outline: 'none' }}
                        >
                          <Box fontSize={{ base: 'sm', sm: 'md' }} mb='1'>
                            {highlightText(book.title, search.query)}
                          </Box>
                          <Box fontSize='xs'>
                            {book.authors.map((author, index) => (
                              <span key={index}>
                                {highlightText(author, search.query)}
                                {index < book.authors.length - 1 && ', '}
                              </span>
                            ))}
                          </Box>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text fontSize='sm' color={colorInputNotResult} py='2'>
                    Sin libros para "{query}"
                  </Text>
                )}
              </TabPanel>
              <TabPanel px='0' pt='3'>
                {hasUsers ? (
                  <List fontSize='md'>
                    {(usersData as SearchUser[]).map((u) => (
                      <UserRow
                        key={u.uid}
                        user={u}
                        query={search.query}
                        onSelect={closeDropdown}
                      />
                    ))}
                  </List>
                ) : (
                  <Text fontSize='sm' color={colorInputNotResult} py='2'>
                    Sin usuarios para "{query}"
                  </Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {noResults && !hasBooks && !hasUsers && (
          <Box fontSize='md'>
            No se encontraron resultados para:{' '}
            <Box as='span' fontStyle='italic' color={colorInputNotResult}>
              "{query}"
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
