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
  IconButton,
} from '@chakra-ui/react';
import { useRef } from 'react';
import Axios from '../../utils/axios/Axios';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/all';

const EditUser = ({ setUsers, userInfo, resetUserToEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    const resp = await Axios.put(`Users/${userInfo.id}`, {
      ...userInfo,
      ...data,
    });
    if (resp.status === 200) {
      resetUserToEdit();
      const resUsers = await Axios.get('users');
      setUsers(resUsers.data);
      onClose();
      toast({
        title: 'Success.',
        description: 'User updated !',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <IconButton
        aria-label="Edit"
        colorScheme={'yellow'}
        icon={<FiEdit />}
        fontSize={30}
        onClick={() => {
          onOpen();
        }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size={'sm'}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={'whiteAlpha'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerCloseButton
              onClick={() => {
                reset();
              }}
            />
            <DrawerHeader bgColor={'orange.400'}>Edit user</DrawerHeader>
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
                      defaultValue={userInfo?.name}
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
                      defaultValue={userInfo?.surname}
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
                    defaultValue={userInfo?.username}
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
                    defaultValue={userInfo?.email}
                    {...register('email', { required: true })}
                  />
                </FormControl>
              </FormControl>
            </DrawerBody>

            <DrawerFooter justifyContent={'center'}>
              <Button
                variant="outline"
                bgColor={'white'}
                mr={3}
                onClick={() => {
                  onClose();
                  //   resetUserToEdit();
                  reset();
                }}
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

export default EditUser;
