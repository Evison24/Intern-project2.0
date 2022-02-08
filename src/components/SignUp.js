import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormHelperText,
  Input,
  Icon,
  HStack,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/all';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import Axios from '../utils/axios/Axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

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
      toast({
        title: 'Account created.',
        description: 'Congratulations you are now a user of WeShop !',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      reset();
    } else {
      toast({
        title: 'Account was not created.',
        description: 'Something went wrong !',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toast = useToast();

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} mr={5}>
        Sign up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={650} bgColor="blackAlpha.800" textColor="white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader
              bgColor="orange.400"
              textAlign="center"
              textColor="black"
              fontSize={30}
            >
              Sign up
              <Icon alignSelf="center" as={FiUserPlus} w={10} h={7} />
            </ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody mx={10} mt={5}>
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
            </ModalBody>
            <ModalFooter>
              <Button
                h={50}
                bgColor="orange.400"
                textColor="black"
                type={'submit'}
                mx={'auto'}
              >
                Sign up
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
