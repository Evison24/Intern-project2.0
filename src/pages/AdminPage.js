import {
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
  Box,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from '../utils/axios/Axios';
import AdminAddUser from '../components/admin/AdminAddUser';
import EditUser from '../components/admin/EditUser';
import { MdDeleteForever } from 'react-icons/all';

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onUserEdit = userId => {
    const selectedUser = users.find(user => user.id === userId);
    setUserToEdit(selectedUser);
  };

  const resetUserToEdit = () => {
    setUserToEdit(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const resUsers = await Axios.get('Users');
      setUsers(resUsers.data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Container maxW={1500} mb={20}>
        <Table
          borderRadius={'20px'}
          overflow={'hidden'}
          mx={'auto'}
          mt={10}
          variant="simple"
          bgColor={'blackAlpha.200'}
          colorScheme={'blackAlpha'}
        >
          <Thead bgColor={'orange.400'}>
            <Tr>
              <Th fontSize={15}>#</Th>
              <Th fontSize={15}>Username</Th>
              <Th fontSize={15}>First Name</Th>
              <Th fontSize={15}>Last Name</Th>
              <Th fontSize={15}>Email</Th>
              <Th fontSize={15}>
                <AdminAddUser setUsers={setUsers} />
              </Th>
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
                  <Flex>
                    <Box
                      onClick={() => {
                        onUserEdit(user.id);
                      }}
                    >
                      <EditUser
                        userInfo={userToEdit}
                        setUsers={setUsers}
                        resetUserToEdit={resetUserToEdit}
                      />
                    </Box>
                    <Box>
                      <IconButton
                        ml={'60px'}
                        aria-label="Delete"
                        colorScheme={'red'}
                        icon={<MdDeleteForever />}
                        fontSize={30}
                        onClick={() => {
                          setUserToDelete(user.id);
                          onOpen();
                        }}
                      />
                    </Box>
                  </Flex>
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
