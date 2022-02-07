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
  FormErrorMessage,
  FormHelperText,
  Input,
  Icon,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/all';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} mr={5}>
        Sign up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={630} bgColor="blackAlpha.800" textColor="white">
          <ModalHeader
            bgColor="orange.400"
            textAlign="center"
            textColor="black"
            fontSize={30}
          >
            Sign up
            <Icon alignSelf="center" as={FiUserPlus} w={10} h={7} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={10} mt={5}>
            <FormControl>
              <HStack>
                <FormControl id="firstName" isRequired>
                  <Input
                    type="text"
                    placeholder="First name"
                    bgColor="whiteAlpha.300"
                    mt={35}
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                  />
                </FormControl>
                <FormControl id="lastName">
                  <Input
                    type="text"
                    placeholder="Last name"
                    bgColor="whiteAlpha.300"
                    mt={35}
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                  />
                </FormControl>
              </HStack>
              <FormControl id="username" isRequired>
                <Input
                  type="text"
                  placeholder="Username"
                  bgColor="whiteAlpha.300"
                  mt={35}
                  borderColor="blackAlpha.500"
                  fontSize="xl"
                  h={50}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <Input
                  type="email"
                  placeholder="Email"
                  bgColor="whiteAlpha.300"
                  mt={35}
                  borderColor="blackAlpha.500"
                  fontSize="xl"
                  h={50}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup mt={35}>
                  <Input
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    bgColor="whiteAlpha.300"
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <InputGroup mt={35}>
                  <Input
                    placeholder="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    bgColor="whiteAlpha.300"
                    borderColor="blackAlpha.500"
                    fontSize="xl"
                    h={50}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </FormControl>
          </ModalBody>

          <ModalFooter alignSelf="center">
            <Button h={50} bgColor="orange.400" textColor="black">
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
