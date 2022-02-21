import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Container,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from '../utils/axios/Axios';
import AdminAddUser from '../components/admin/AdminAddUser';
import { MdDeleteForever } from 'react-icons/all';

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const resUsers = await Axios.get('Users');
      setUsers(resUsers.data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Heading textAlign="center">Welcome Admin !</Heading>
      <AdminAddUser setUsers={setUsers} />

      <Container maxW={1500} mb={20}>
        <Table
          mx={'auto'}
          mt={10}
          variant="simple"
          bgColor={'blackAlpha.50'}
          colorScheme={'blackAlpha'}
        >
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Username</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => (
              <Tr key={index}>
                <Td>{index}</Td>
                <Td>{user.username}</Td>
                <Td>{user.name}</Td>
                <Td>{user.surname}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <IconButton
                    aria-label="Search database"
                    colorScheme={'red'}
                    icon={<MdDeleteForever />}
                    fontSize={30}
                    onClick={() => {
                      setUserToDelete(user.id);
                      onOpen();
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={'blackAlpha'}>
          <ModalHeader bgColor={'red.400'}>Delete user?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Any data of the user will be lost !</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              ml={5}
              variant="solid"
              bgColor={'red.400'}
              onClick={() => {
                Axios.delete(`Users/${userToDelete}`);
                const copyUsers = [...users];
                const index = users.findIndex(u => u.id === userToDelete);
                copyUsers.splice(index, 1);
                setUsers(copyUsers);
                setUserToDelete(null);
                onClose();
                toast({
                  title: 'Success.',
                  description: 'User deleted!',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminPage;
