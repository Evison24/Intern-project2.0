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
              <Button colorScheme="orange" mr="4">
                Sign Up
              </Button>
              <Button colorScheme="orange">Log in</Button>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;

{
  /* <NavLink p="2" bgColor="orange" to="/">
                Log in
              </NavLink> */
}
