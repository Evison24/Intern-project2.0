import {
  Container,
  Grid,
  GridItem,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

import { useState } from 'react';
import useGetUser from '../../../utils/hooks/useGetUser';
import { useForm } from 'react-hook-form';
import Axios from '../../../utils/axios/Axios';
import ChangePassword from './ChangePassword';

const UserProfile = () => {
  const user = useGetUser();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [editState, setEditState] = useState(false);

  const onSubmit = async data => {
    const resp = await Axios.put(`Users/${user.id}`, {
      ...user,
      ...data,
    });
    setEditState(false);
    if (resp.status === 200) {
      toast({
        title: 'Success.',
        description: 'Info updated successfully !',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Container maxW={'900px'} mt={'50px'}>
        <Grid
          border={'black'}
          borderRadius={'30px'}
          bgColor={'teal.50'}
          h="500px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={5}
        >
          <GridItem
            justifySelf={'center'}
            alignSelf={'center'}
            rowSpan={1}
            colSpan={1}
          >
            <Image
              ml={'100px'}
              mt={'100px'}
              borderRadius="full"
              boxSize="180px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
          </GridItem>

          <GridItem
            ml={'100px'}
            rowSpan={2}
            colSpan={2}
            mt={'30px'}
            maxW={'400px'}
          >
            {editState ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={5}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    bgColor={'white'}
                    id="username"
                    type="text"
                    defaultValue={user?.username}
                    {...register('username', { required: true })}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    bgColor={'white'}
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    {...register('email', { required: true })}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <Input
                    bgColor={'white'}
                    id="firstname"
                    type="text"
                    defaultValue={user?.name}
                    {...register('name', { required: true })}
                  />
                </FormControl>
                <FormControl mb={10}>
                  <FormLabel htmlFor="lastname">Last name</FormLabel>
                  <Input
                    bgColor={'white'}
                    id="lastname"
                    type="text"
                    defaultValue={user?.surname}
                    {...register('surname', { required: true })}
                  />
                </FormControl>
                <ChangePassword user={user} />
                <Button
                  mx={'10px'}
                  colorScheme="teal"
                  onClick={() => {
                    setEditState(false);
                  }}
                >
                  Cancel
                </Button>
                <Button colorScheme="teal" type={'submit'}>
                  Save
                </Button>
              </form>
            ) : (
              <>
                <FormControl mb={5}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    bgColor="teal.50"
                    id="username"
                    type="text"
                    isReadOnly
                    defaultValue={user?.username}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    isReadOnly
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <Input
                    isReadOnly
                    id="firstname"
                    type="text"
                    defaultValue={user?.name}
                  />
                </FormControl>
                <FormControl mb={10}>
                  <FormLabel htmlFor="lastname">Last name</FormLabel>
                  <Input
                    isReadOnly
                    id="lastname"
                    type="text"
                    defaultValue={user?.surname}
                  />
                </FormControl>
                <ChangePassword onSubmit={onSubmit} user={user} />
                <Button
                  mx={'10px'}
                  onClick={() => {
                    setEditState(true);
                    toast({
                      description: 'You can now edit your info !',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                  colorScheme="teal"
                >
                  Edit
                </Button>
              </>
            )}
          </GridItem>

          <GridItem ml={'100px'} justifySelf={'center'} rowSpan={1} colSpan={1}>
            <Button colorScheme={'teal'}>Change profile picture</Button>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
