import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  Container,
} from '@chakra-ui/react';

const Navbar = () => {
  return (
    <>
      <Box w="100%" maxH="xs" bgColor="black">
        <Container maxW="container.xl">
          <Flex>
            <Box p="2">
              <Heading size="md" color="orange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-bullseye"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </Heading>
            </Box>
            <Box p="2">
              <Heading size="md" color="orange">
                WeShop
              </Heading>
            </Box>
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
