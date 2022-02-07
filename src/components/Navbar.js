import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  Container,
  Icon,
} from '@chakra-ui/react';
import { FcShop } from 'react-icons/all';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const Navbar = () => {
  return (
    <>
      <Box w="100%" maxH="xs" bgColor="black">
        <Container maxW="container.xl">
          <Flex align="center">
            <Box p="2">
              <Heading size="md" color="orange">
                <Icon as={FcShop} w={8} h={8} />
              </Heading>
            </Box>
            <NavLink p="2" to="/">
              <Heading size="md" color="orange">
                WeShop
              </Heading>
            </NavLink>
            <Spacer />
            <Box>
              <SignUp />
              <Login />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
