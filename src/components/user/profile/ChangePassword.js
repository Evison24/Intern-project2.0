import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangePassword = ({ onSubmit, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPasswordCheck, setOldPasswordCheck] = useState(null);
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

  return (
    <>
      <Button colorScheme={'teal'} onClick={onOpen}>
        Change password
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'teal.400'}>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl my={5} isRequired>
                <FormLabel htmlFor="old-password">Old password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={e => setOldPasswordCheck(e.target.value)}
                    isRequired
                    id="old-password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      _hover={{ bg: 'teal.400' }}
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  {oldPasswordCheck === user.password
                    ? 'Passwords match'
                    : 'Passwords must match !'}
                </FormHelperText>
              </FormControl>
              <FormControl mb={5}>
                <FormLabel htmlFor="new-password">New password</FormLabel>
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                />
                <FormHelperText color={'red.400'}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <FormControl mb={5}>
                <FormLabel htmlFor="confirm-new-password">
                  Old password
                </FormLabel>
                <Input
                  id="confirm-new-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword', { required: true })}
                />
                <FormHelperText color={'red.400'}>
                  {errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Close
            </Button>
            <Button colorScheme={'teal'} ml={'10px'} type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
