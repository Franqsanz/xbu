import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Skeleton,
  Spinner,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FiArrowLeft, FiCamera, FiCheck, FiX } from 'react-icons/fi';
import { RiScissorsCutFill } from 'react-icons/ri';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import 'cropperjs/dist/cropper.css';

import { useCheckUser, useCheckUsername, usePatchMyProfile } from '@hooks/queries';
import { useMyToast } from '@hooks/useMyToast';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { ModalCropper } from '@components/modals/ModalCropper';
import { EditProfileFallback } from '@pages/profile/account/EditProfileFallback';

const Cropper = lazy(() => import('react-cropper'));

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo =
    (location.state as { from?: string } | null)?.from ?? '/my-account';
  const { data: me, isPending: isLoadingMe } = useCheckUser();
  const { mutateAsync: patchProfile, isPending: isSaving } = usePatchMyProfile();
  const myToast = useMyToast();

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const dashedBg = useColorModeValue('gray.50', 'gray.800');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [debouncedUsername, setDebouncedUsername] = useState('');

  // Cropper state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropData, setCropData] = useState<string | null>(null);
  const [cropInstance, setCropInstance] = useState<any>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const {
    isOpen: isCropperOpen,
    onOpen: openCropper,
    onClose: closeCropper,
  } = useDisclosure();

  const originalUsername = me?.username ?? '';

  useEffect(() => {
    if (me) {
      setName(me.name ?? '');
      setUsername(me.username ?? '');
      setBio(me.bio ?? '');
      setDebouncedUsername(me.username ?? '');
    }
  }, [me]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUsername(username), 400);
    return () => clearTimeout(timer);
  }, [username]);

  const usernameChanged = debouncedUsername !== originalUsername;
  const usernameFormatOk =
    debouncedUsername.length === 0 || USERNAME_REGEX.test(debouncedUsername);

  const { data: usernameCheck, isFetching: isCheckingUsername } = useCheckUsername(
    debouncedUsername,
    usernameChanged && usernameFormatOk && debouncedUsername.length >= 3,
  );

  const usernameStatus:
    | 'idle'
    | 'checking'
    | 'ok'
    | 'invalid'
    | 'reserved'
    | 'taken' = !usernameChanged
    ? 'idle'
    : !usernameFormatOk || debouncedUsername.length < 3
      ? 'invalid'
      : isCheckingUsername
        ? 'checking'
        : usernameCheck?.ok
          ? 'ok'
          : usernameCheck?.reason === 'reserved'
            ? 'reserved'
            : usernameCheck?.reason === 'taken'
              ? 'taken'
              : 'invalid';

  const nameOk = name.trim().length >= 1 && name.trim().length <= 60;
  const bioOk = bio.length <= 300;
  const canSubmit =
    nameOk &&
    bioOk &&
    (usernameStatus === 'idle' || usernameStatus === 'ok') &&
    !isSaving &&
    !!me;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      myToast({
        title: 'La imagen supera 2 MB',
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
      return;
    }
    setCropData(URL.createObjectURL(file));
    openCropper();
    // permitir re-elegir el mismo archivo
    e.target.value = '';
  }

  function handleCrop() {
    if (!cropInstance) return;
    const canvas = cropInstance.getCroppedCanvas();
    if (!canvas) return;
    canvas.toBlob((blob: Blob | null) => {
      if (!blob) return;
      setCroppedBlob(blob);
      setCroppedPreview(URL.createObjectURL(blob));
      closeCropper();
    }, 'image/webp');
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    const updates: { name?: string; username?: string; bio?: string } = {};
    if (name.trim() !== (me?.name ?? '')) updates.name = name.trim();
    if (username !== originalUsername && usernameStatus === 'ok')
      updates.username = username;
    if (bio !== (me?.bio ?? '')) updates.bio = bio;

    const hasUpdates = Object.keys(updates).length > 0 || !!croppedBlob;
    if (!hasUpdates) {
      navigate(returnTo);
      return;
    }

    try {
      await patchProfile({ updates, image: croppedBlob });
      myToast({
        title: 'Perfil actualizado',
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
      // If username changed and we came from the own profile, redirect to the new slug
      let finalReturnTo = returnTo;
      if (updates.username && returnTo.includes(`/profile/${originalUsername}`)) {
        finalReturnTo = returnTo.replace(
          `/profile/${originalUsername}`,
          `/profile/${updates.username}`,
        );
      }
      // Recarga completa para que el avatar y datos se vean al instante en toda la app
      window.location.href = finalReturnTo;
    } catch (err: any) {
      myToast({
        title: 'No se pudo actualizar',
        description: err?.message,
        icon: FaExclamationCircle,
        iconColor: 'red.400',
        bgColor: 'black',
        width: '260px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }

  function usernameHelper() {
    if (usernameStatus === 'idle') return null;
    if (usernameStatus === 'checking') return 'Verificando disponibilidad...';
    if (usernameStatus === 'ok') return 'Disponible ✓';
    if (usernameStatus === 'invalid')
      return '3-20 caracteres, solo letras minúsculas, números y _';
    if (usernameStatus === 'reserved') return 'Ese username está reservado';
    if (usernameStatus === 'taken') return 'Ese username ya está en uso';
    return null;
  }

  const usernameIsError =
    usernameStatus === 'invalid' ||
    usernameStatus === 'reserved' ||
    usernameStatus === 'taken';

  if (isLoadingMe) {
    return <EditProfileFallback />;
  }

  return (
    <>
      <MainHead title='Editar perfil | XBuReads' />
      <ContainerTitle title='Editar perfil' />
      <Flex
        as='section'
        direction='column'
        w='full'
        maxW={{ base: 'full', md: '1000px' }}
        m='0 auto'
        px={{ base: 5, md: 10 }}
        py={{ base: 6, md: 10 }}
        gap='6'
      >
        <Button
          as={NavLink}
          to={returnTo}
          variant='ghost'
          size='sm'
          alignSelf='flex-start'
          leftIcon={<Icon as={FiArrowLeft} />}
          fontWeight='normal'
        >
          Volver
        </Button>
        <Flex
          direction='column'
          border='1px'
          borderColor={borderColor}
          rounded='lg'
          p={{ base: 4, md: 8 }}
          gap='8'
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 8, md: 12 }}
            align={{ base: 'stretch', md: 'flex-start' }}
          >
            <Flex
              direction='column'
              align='center'
              gap='3'
              w={{ base: 'full', md: '260px' }}
              flexShrink={0}
            >
              <Heading fontSize={{ base: 'md', md: 'lg' }} alignSelf='flex-start'>
                Foto
              </Heading>
              <Avatar
                size='2xl'
                src={croppedPreview ?? me?.picture}
                name={me?.name}
                referrerPolicy='no-referrer'
              />
              <Input
                ref={fileInputRef}
                type='file'
                accept='image/png,image/jpeg,image/webp'
                display='none'
                onChange={handleFileChange}
              />
              <Button
                size='sm'
                leftIcon={<Icon as={FiCamera} />}
                onClick={() => fileInputRef.current?.click()}
                fontWeight='normal'
              >
                {croppedBlob ? 'Cambiar otra vez' : 'Cambiar foto'}
              </Button>
              <Text fontSize='xs' color={subColor} textAlign='center'>
                PNG, JPG o WebP · máx 2 MB
              </Text>
            </Flex>
            <Box flex='1'>
              <Heading fontSize={{ base: 'md', md: 'lg' }} mb='5'>
                Datos
              </Heading>
              <Flex direction='column' gap='5'>
                <Flex direction={{ base: 'column', md: 'row' }} gap='5'>
                  <FormControl isInvalid={!nameOk && name.length > 0} flex='1'>
                    <FormLabel fontSize='sm'>Nombre</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={60}
                      placeholder='Tu nombre'
                    />
                    <FormErrorMessage>Entre 1 y 60 caracteres.</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={usernameIsError} flex='1'>
                    <FormLabel fontSize='sm'>Username</FormLabel>
                    <Input
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''),
                        )
                      }
                      maxLength={20}
                      placeholder='tu_username'
                      borderColor={usernameStatus === 'ok' ? 'green.500' : undefined}
                      _hover={
                        usernameStatus === 'ok'
                          ? { borderColor: 'green.500' }
                          : undefined
                      }
                      _focusVisible={
                        usernameStatus === 'ok'
                          ? {
                              borderColor: 'green.500',
                              boxShadow: '0 0 0 1px var(--chakra-colors-green-500)',
                            }
                          : undefined
                      }
                    />
                    {usernameStatus === 'checking' && (
                      <FormHelperText display='flex' alignItems='center' gap='2'>
                        <Spinner size='xs' />
                        {usernameHelper()}
                      </FormHelperText>
                    )}
                    {usernameStatus === 'ok' && (
                      <FormHelperText
                        color='green.500'
                        display='flex'
                        alignItems='center'
                        gap='1'
                      >
                        <Icon as={FiCheck} boxSize='4' />
                        Disponible
                      </FormHelperText>
                    )}
                    {usernameIsError && (
                      <FormErrorMessage display='flex' alignItems='center' gap='1'>
                        <Icon as={FiX} boxSize='4' />
                        {usernameHelper()}
                      </FormErrorMessage>
                    )}
                    {usernameChanged && usernameStatus === 'ok' && (
                      <Text fontSize='xs' color={subColor} mt='1'>
                        Tu URL pública pasará a ser /profile/{username}
                      </Text>
                    )}
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!bioOk}>
                  <FormLabel fontSize='sm'>Bio</FormLabel>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={300}
                    placeholder='Contá un poco sobre vos'
                    resize='vertical'
                    minH='100px'
                  />
                  <Flex justify='flex-end' mt='1'>
                    <Text fontSize='xs' color={subColor}>
                      {bio.length}/300
                    </Text>
                  </Flex>
                </FormControl>
              </Flex>
            </Box>
          </Flex>
          <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
            justify={{ base: 'stretch', md: 'flex-end' }}
            gap='2'
          >
            <Button as={NavLink} to={returnTo} fontWeight='normal'>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              isDisabled={!canSubmit}
              isLoading={isSaving}
              loadingText='Guardando...'
              bg={bgColorButton}
              color='black'
              _hover={{ bg: 'green.600' }}
              _active={{ bg: 'green.600' }}
              fontWeight='normal'
            >
              Guardar cambios
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <ModalCropper
        isOpen={isCropperOpen}
        onClose={closeCropper}
        getCropData={handleCrop}
      >
        <Box bg={dashedBg} rounded='md' p='2'>
          <Suspense fallback={<Skeleton h='350px' />}>
            {cropData ? (
              <Cropper
                src={cropData}
                style={{ height: 350, width: '100%' }}
                aspectRatio={1}
                guides={true}
                viewMode={1}
                background={false}
                responsive={true}
                autoCropArea={1}
                onInitialized={(instance: any) => setCropInstance(instance)}
              />
            ) : (
              <Skeleton h='350px' />
            )}
          </Suspense>
          <Flex align='center' gap='2' mt='2' color={subColor} fontSize='xs'>
            <Icon as={RiScissorsCutFill} />
            Ajustá el cuadro y presioná "Cortar imagen".
          </Flex>
        </Box>
      </ModalCropper>
    </>
  );
}
