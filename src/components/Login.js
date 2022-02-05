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
} from '@chakra-ui/react';
import { HiOutlineKey } from 'react-icons/all';

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>
        Log in
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={500} bgColor="blackAlpha.800" textColor="white">
          <ModalHeader
            bgColor="orange.400"
            textAlign="center"
            textColor="black"
            fontSize={30}
          >
            Log in
            <Icon alignSelf="center" as={HiOutlineKey} w={10} h={7} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={10} mt={5}>
            <FormControl>
              <Input
                bgColor="whiteAlpha.300"
                mt={35}
                mb={50}
                placeholder="Username"
                borderColor="blackAlpha.500"
                id="username"
                type="text"
                fontSize="xl"
                h={50}
              />
              {/* <FormHelperText mb={5}>
                We'll never share your email.
              </FormHelperText> */}

              <Input
                bgColor="whiteAlpha.300"
                placeholder="Password"
                borderColor="blackAlpha.500"
                id="password"
                type="password"
                fontSize="xl"
                h={50}
              />
              {/* <FormHelperText>
                Password must be at least 6 charcters !
              </FormHelperText> */}
            </FormControl>
          </ModalBody>

          <ModalFooter alignSelf="center">
            <Button h={50} mt={-250} bgColor="orange.400" textColor="black">
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
