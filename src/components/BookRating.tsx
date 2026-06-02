import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Rating } from '@smastrom/react-rating';
import { FiX } from 'react-icons/fi';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import { useAuth } from '@contexts/AuthContext';
import {
  useMyBookRating,
  useBookRatingStats,
  useSetMyBookRating,
  useDeleteMyBookRating,
} from '@hooks/queries';
import { useMyToast } from '@hooks/useMyToast';

interface BookRatingProps {
  bookId: string;
  averageRating: number;
  ratingsCount: number;
}

export function BookRating({
  bookId,
  averageRating,
  ratingsCount,
}: BookRatingProps) {
  const { currentUser } = useAuth();
  const isLogged = !!currentUser;
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const myToast = useMyToast();

  const { data: statsData } = useBookRatingStats(bookId, {
    averageRating,
    ratingsCount,
  });
  const liveAverage = statsData?.averageRating ?? averageRating;
  const liveCount = statsData?.ratingsCount ?? ratingsCount;

  const { data: myRatingData } = useMyBookRating(bookId, isLogged);
  const { mutate: setRating, isPending: isSetting } = useSetMyBookRating(bookId);
  const { mutate: deleteRating, isPending: isDeleting } =
    useDeleteMyBookRating(bookId);

  const serverRating = (myRatingData?.rating ?? null) as number | null;
  const [localRating, setLocalRating] = useState<number>(serverRating ?? 0);

  useEffect(() => {
    setLocalRating(serverRating ?? 0);
  }, [serverRating]);

  const isPending = isSetting || isDeleting;

  function successToast(title: string) {
    myToast({
      title,
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

  function errorToast(title: string) {
    myToast({
      title,
      icon: FaExclamationCircle,
      iconColor: 'red.400',
      bgColor: 'black',
      width: '230px',
      color: 'whitesmoke',
      align: 'center',
      padding: '1',
      fntSize: 'md',
      bxSize: 5,
    });
  }

  function handleChange(next: number) {
    if (isPending || !isLogged) return;
    if (next < 1 || next > 5) return;

    setLocalRating(next);
    setRating(next, {
      onSuccess: () =>
        successToast(
          serverRating !== null ? 'Voto actualizado' : '¡Gracias por votar!',
        ),
      onError: () => {
        setLocalRating(serverRating ?? 0);
        errorToast('No se pudo guardar tu voto');
      },
    });
  }

  function handleClear() {
    if (isPending || !isLogged || serverRating === null) return;

    setLocalRating(0);
    deleteRating(undefined, {
      onSuccess: () => successToast('Se quitó tu voto'),
      onError: () => {
        setLocalRating(serverRating ?? 0);
        errorToast('No se pudo quitar tu voto');
      },
    });
  }

  if (!isLogged) {
    return (
      <Flex direction='column' gap='1'>
        <Rating style={{ maxWidth: 140 }} value={liveAverage} readOnly />
        <Text fontSize='xs' color={subColor}>
          {liveCount > 0
            ? `${liveAverage.toFixed(1)} · ${liveCount} ${
                liveCount === 1 ? 'voto' : 'votos'
              }`
            : 'Aún sin votos'}
        </Text>
      </Flex>
    );
  }

  const displayValue = serverRating !== null ? localRating : liveAverage;
  const showAsMine = serverRating !== null;

  return (
    <Flex direction='column' gap='1'>
      <Flex align='center' gap='2'>
        <Box position='relative'>
          <Rating
            style={{ maxWidth: 140, opacity: isPending ? 0.4 : 1 }}
            value={displayValue}
            onChange={handleChange}
            isDisabled={isPending}
          />
          {isPending && (
            <Flex
              position='absolute'
              inset='0'
              align='center'
              justify='center'
              pointerEvents='none'
            >
              <Spinner size='sm' thickness='2px' speed='0.6s' color='green.500' />
            </Flex>
          )}
        </Box>
        {showAsMine && (
          <Tooltip label='Quitar mi voto' fontSize='xs'>
            <IconButton
              aria-label='Quitar voto'
              icon={<FiX />}
              size='xs'
              variant='ghost'
              onClick={handleClear}
              isDisabled={isPending}
            />
          </Tooltip>
        )}
      </Flex>
      <Text fontSize='xs' color={subColor}>
        {liveCount > 0
          ? `${liveAverage.toFixed(1)} · ${liveCount} ${
              liveCount === 1 ? 'voto' : 'votos'
            }${showAsMine ? ' · tu voto registrado' : ''}`
          : 'Sé el primero en votar'}
      </Text>
    </Flex>
  );
}
