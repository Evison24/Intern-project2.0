import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  useToast,
  HStack,
  FormControl,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Center,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Axios from '../../utils/axios/Axios';
import { AddIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const AdminAddUser = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const firstField = useRef();
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required !')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required !')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async data => {
    const resp = await Axios.post('Users/register', data);
    if (resp.status === 200) {
      const resUsers = await Axios.get('users');
      setUsers(resUsers.data);
      toast({
        title: 'Account created.',
        description: 'New user created successfully !',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      reset();
    } else {
      toast({
        title: 'Account was not created.',
        description: 'Something went wrong !',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center mt={5}>
        <Button leftIcon={<AddIcon />} colorScheme={'orange'} onClick={onOpen}>
          Create user
        </Button>
      </Center>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={'sm'}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={'black'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerCloseButton />
            <DrawerHeader bgColor={'orange.400'}>
              Create a new account
            </DrawerHeader>

            <DrawerBody mt={10}>
              <FormControl>
                <HStack mb={10}>
                  <FormControl id="firstName" isRequired>
                    <Input
                      type="text"
                      placeholder="First name"
                      bgColor="whiteAlpha.300"
                      borderColor="blackAlpha.500"
                      fontSize="xl"
                      h={50}
                      {...register('name', { required: true })}
                    />
                  </FormControl>

                  <FormControl id="lastName" isRequired>
                    <Input
                      type="text"
                      placeholder="Last name"
                      bgColor="whiteAlpha.300"
                      borderColor="blackAlpha.500"
                      fontSize="xl"
                      h={50}
                      {...register('surname', { required: true })}
                    />
                  </FormControl>
                </HStack>
                <FormControl id="username" mb={10} isRequired>
                  <Input
                    type="text"
                    placeholder="Username"
                    bgColor="whiteAlpha.300"
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                    {...register('username', { required: true })}
                  />
                </FormControl>
                <FormControl id="email" mb={10} isRequired>
                  <Input
                    type="email"
                    placeholder="Email"
                    bgColor="whiteAlpha.300"
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                    {...register('email', { required: true })}
                  />
                </FormControl>

                <FormControl id="password" mb={10}>
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      bgColor="whiteAlpha.300"
                      borderColor="blackAlpha.500"
                      fontSize="xl"
                      h={50}
                      {...register('password')}
                    />

                    <InputRightElement h={'full'}>
                      <Button
                        _hover={{ bg: 'orange.600' }}
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color={'red.400'}>
                    {errors.password?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl id="confirmPassword">
                  <InputGroup>
                    <Input
                      placeholder="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      bgColor="whiteAlpha.300"
                      borderColor="blackAlpha.500"
                      fontSize="xl"
                      h={50}
                      {...register('confirmPassword')}
                    />

                    <InputRightElement h={'full'}>
                      <Button
                        _hover={{ bg: 'orange.600' }}
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color={'red.400'}>
                    {errors.confirmPassword?.message}
                  </FormHelperText>
                </FormControl>
              </FormControl>
            </DrawerBody>

            <DrawerFooter justifyContent={'center'}>
              <Button
                variant="outline"
                bgColor={'white'}
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button colorScheme="orange" type={'submit'}>
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminAddUser;
