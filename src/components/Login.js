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
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, AtSignIcon } from '@chakra-ui/icons';

import { HiOutlineKey, BiLockAlt } from 'react-icons/all';
import { useState } from 'react';
import Axios from '../utils/axios/Axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  onUserLogin,
  onUserLogout,
} from '../utils/store/reducers/users/userSlice';
import TokenManager from '../utils/helpers/TokenManager';
import useGetUser from '../utils/hooks/useGetUser';

const Login = () => {
  let user = useGetUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginButtonClick = async () => {
    try {
      const res = await Axios.post('auth/login', { email, password });
      if (res.status === 200) {
        dispatch(onUserLogin(res.data.user));
        TokenManager.setToken(res.data.token);
        navigate('/', { replace: true });
        onClose();
      }
    } catch {
      setMessage('Email or password is incorrect !');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const onLogout = () => {
    dispatch(onUserLogout());
    setEmail(null);
    setPassword(null);
    setMessage(null);
  };

  return (
    <>
      {user ? (
        <Button ml={5} colorScheme={'orange'} onClick={() => onLogout()}>
          Log out
        </Button>
      ) : (
        <Button ml={5} colorScheme={'orange'} onClick={onOpen}>
          Log in
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          h={450}
          bgColor={'blackAlpha.800'}
          textColor={'white'}
          onKeyPress={e => {
            e.key === 'Enter' && onLoginButtonClick();
          }}
        >
          <ModalHeader
            bgColor={'orange.400'}
            textAlign={'center'}
            textColor={'black'}
            fontSize={30}
          >
            Log in
            <Icon alignSelf={'center'} as={HiOutlineKey} w={10} h={7} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={10} mt={5}>
            <FormControl>
              <InputGroup mt={35}>
                <InputLeftElement h={'full'} fontSize={23}>
                  <Icon as={AtSignIcon} />
                </InputLeftElement>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  bgColor={'whiteAlpha.300'}
                  placeholder={'Email'}
                  borderColor={'blackAlpha.500'}
                  id={'email'}
                  type={'email'}
                  fontSize={'xl'}
                  h={50}
                />
              </InputGroup>
              {message && <FormHelperText>{message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <InputGroup mt={35}>
                <InputLeftElement h={'full'} fontSize={25}>
                  <Icon as={BiLockAlt} />
                </InputLeftElement>
                <Input
                  onChange={e => setPassword(e.target.value)}
                  placeholder={'Password'}
                  type={showPassword ? 'text' : 'password'}
                  bgColor={'whiteAlpha.300'}
                  borderColor={'blackAlpha.500'}
                  fontSize={'xl'}
                  h={50}
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
              {message && <FormHelperText>{message}</FormHelperText>}
            </FormControl>
          </ModalBody>

          <ModalFooter alignSelf={'center'}>
            <Button
              onClick={() => onLoginButtonClick()}
              h={50}
              bgColor={'orange.400'}
              textColor={'black'}
              mt={-20}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
