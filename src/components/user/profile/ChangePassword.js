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
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Axios from '../../../utils/axios/Axios';

const ChangePassword = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPasswordCheck, setOldPasswordCheck] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [confirmNewPasswordCheck, setConfirmNewPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const { register, reset, handleSubmit } = useForm();

  const onSubmit = async data => {
    const resp = await Axios.put(`Users/${user.id}`, {
      ...user,
      ...data,
    });
    if (resp.status === 200) {
      toast({
        title: 'Success.',
        description: 'Password was changed successfully !',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      reset();
      setOldPasswordCheck('');
      setNewPasswordCheck('');
      setConfirmNewPasswordCheck('');
    }
  };

  return (
    <>
      <Button colorScheme={'teal'} onClick={onOpen}>
        Change password
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader bgColor={'teal.400'}>Change password</ModalHeader>
            <ModalCloseButton
              onClick={() => {
                reset();
                setOldPasswordCheck('');
                setNewPasswordCheck('');
                setConfirmNewPasswordCheck('');
              }}
            />
            <ModalBody>
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
                  {oldPasswordCheck === user.password &&
                  oldPasswordCheck !== ' '
                    ? 'Old password is correct.'
                    : ''}
                </FormHelperText>
              </FormControl>

              <FormControl mb={5}>
                <FormLabel htmlFor="new-password">New password</FormLabel>
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    onChange: e => setNewPasswordCheck(e.target.value),
                    min: 6,
                    required: true,
                  })}
                />
                <FormHelperText color={'red.400'}>
                  {newPasswordCheck === user.password &&
                    'Please use a different password than your old password !'}
                </FormHelperText>
              </FormControl>

              <FormControl mb={5}>
                <FormLabel htmlFor="confirm-new-password">
                  Confirm new password
                </FormLabel>
                <Input
                  id="confirm-new-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    onChange: e => setConfirmNewPasswordCheck(e.target.value),
                    required: true,
                  })}
                />
                <FormHelperText>
                  {confirmNewPasswordCheck === newPasswordCheck &&
                  confirmNewPasswordCheck !== '' &&
                  newPasswordCheck !== user.password
                    ? 'Passwords match !'
                    : ' '}
                </FormHelperText>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                  setOldPasswordCheck('');
                  setNewPasswordCheck('');
                  setConfirmNewPasswordCheck('');
                }}
              >
                Close
              </Button>
              {oldPasswordCheck === user.password &&
              newPasswordCheck !== '' &&
              newPasswordCheck !== user.password &&
              newPasswordCheck === confirmNewPasswordCheck ? (
                <Button colorScheme={'teal'} ml={'10px'} type="submit">
                  Save
                </Button>
              ) : (
                <Button
                  isDisabled
                  colorScheme={'teal'}
                  ml={'10px'}
                  type="submit"
                >
                  Save
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
