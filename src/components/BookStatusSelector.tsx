import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiCheck, FiBookOpen, FiBookmark, FiChevronDown, FiX } from 'react-icons/fi';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import {
  useBookStatus,
  useSetBookStatus,
  useDeleteBookStatus,
} from '@hooks/queries';
import { useMyToast } from '@hooks/useMyToast';
import { BookStatusValue, BookStatusSelectorProps } from '@components/types';

type Option = {
  value: BookStatusValue;
  label: string;
  icon: typeof FiCheck;
};

const OPTIONS: Option[] = [
  { value: 'read', label: 'Leído', icon: FiCheck },
  { value: 'reading', label: 'Leyendo', icon: FiBookOpen },
  { value: 'want_to_read', label: 'Quiero leer', icon: FiBookmark },
];

export function BookStatusSelector({ bookId, w }: BookStatusSelectorProps) {
  const { data, isLoading } = useBookStatus(bookId);
  const { mutate: setStatus, isPending: isSetting } = useSetBookStatus(bookId);
  const { mutate: removeStatus, isPending: isRemoving } =
    useDeleteBookStatus(bookId);
  const myToast = useMyToast();

  const currentStatus = (data?.status ?? null) as BookStatusValue | null;
  const activeOption = OPTIONS.find((o) => o.value === currentStatus);
  const isPending = isSetting || isRemoving;

  const idleBg = useColorModeValue('white', 'black');
  const bg = currentStatus ? 'green.500' : idleBg;
  const color = currentStatus ? 'black' : undefined;
  const hoverBg = currentStatus ? 'green.600' : 'black';
  const hoverColor = currentStatus ? 'black' : 'white';

  function successToast(title: string) {
    myToast({
      title,
      icon: FaCheckCircle,
      iconColor: 'green.700',
      bgColor: 'black',
      width: '230px',
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

  function handleSelect(value: BookStatusValue) {
    if (value === currentStatus) return;
    const label = OPTIONS.find((o) => o.value === value)?.label;
    setStatus(value, {
      onSuccess: () => successToast(`Marcado como "${label}"`),
      onError: () => errorToast('No se pudo actualizar el estado'),
    });
  }

  function handleClear() {
    if (!currentStatus) return;
    removeStatus(undefined, {
      onSuccess: () => successToast('Se quitó la marca'),
      onError: () => errorToast('No se pudo quitar la marca'),
    });
  }

  return (
    <Menu placement='bottom-start' matchWidth>
      <MenuButton
        as={Button}
        w={w}
        size='lg'
        p='6'
        fontWeight='normal'
        bg={bg}
        color={color}
        border='1px'
        borderColor='green.600'
        rounded='lg'
        textAlign='center'
        rightIcon={
          isLoading || isPending ? (
            <Spinner size='sm' />
          ) : (
            <Icon as={FiChevronDown} />
          )
        }
        _hover={{ bg: hoverBg, color: hoverColor }}
        _active={{ bg: hoverBg, color: hoverColor }}
        isDisabled={isLoading || isPending}
      >
        <Flex align='center' justify='center' gap='2'>
          <Icon as={activeOption?.icon ?? FiBookmark} />
          {activeOption?.label ?? 'Quiero leer'}
        </Flex>
      </MenuButton>
      <MenuList>
        {OPTIONS.map((opt) => (
          <MenuItem
            key={opt.value}
            icon={<Icon as={opt.icon} />}
            onClick={() => handleSelect(opt.value)}
            fontWeight={opt.value === currentStatus ? 'semibold' : 'normal'}
            color={opt.value === currentStatus ? 'green.500' : undefined}
          >
            {opt.label}
          </MenuItem>
        ))}
        {currentStatus && (
          <>
            <MenuDivider />
            <MenuItem icon={<Icon as={FiX} />} onClick={handleClear} color='red.500'>
              Quitar marca
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
