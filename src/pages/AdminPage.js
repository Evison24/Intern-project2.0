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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from '../utils/axios/Axios';
import { MdDeleteForever } from 'react-icons/all';

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Table
        mx={'auto'}
        maxW={1500}
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
              <Td>{user.lastname}</Td>
              <Td>{user.email}</Td>

              <IconButton
                aria-label="Search database"
                colorScheme={'red'}
                icon={<MdDeleteForever />}
                fontSize={30}
                onClick={onOpen}
              />
            </Tr>
          ))}
          {/* <Tr>
            <Td>Test</Td>
            <Td>Test</Td>
            <Td>Test</Td>
            <Td>Test</Td>
            <Td>Test</Td>
          </Tr> */}
        </Tbody>
      </Table>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={'blackAlpha.200'}>
          <ModalHeader bgColor={'red.400'}>Delete user?</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={'blackAlpha.50'}>
            Any data of the user will be lost !
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button ml={5} variant="solid" bgColor={'red.400'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminPage;
