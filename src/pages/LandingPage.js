import {
  Image,
  Container,
  Grid,
  GridItem,
  Icon,
  Center,
  Text,
  Avatar,
  Heading,
} from '@chakra-ui/react';
import weshoplogo from '../images/weshoplogo.png';
import background from '../images/e-commerce.jpg';
import { FiTruck, FiShoppingBag } from 'react-icons/all';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Container
        maxW="1920px"
        bgImage={background}
        bgSize="cover"
        bgRepeat="no-repeat"
        h="70vh"
        color="white"
      >
        <Image src={weshoplogo} pt="150px"></Image>
      </Container>
      <Grid templateColumns="repeat(2, 1fr)" mt="80px">
        <GridItem h="300">
          <Center>
            <Icon as={FiShoppingBag} w={100} h={100} color="blue.300" />
          </Center>
          <Text fontSize="25px" color="black" textAlign="center">
            Wide variety of products !
          </Text>
          <Text
            fontSize="18px"
            w="50%"
            color="black"
            textAlign="center"
            mx="auto"
          >
            You can basicly find everything you want in WeShop. We have a lot of
            product categories like Electronics, Clothing, Jewlery etc...!
          </Text>
        </GridItem>
        <GridItem h="300">
          <Center>
            <Icon as={FiTruck} w={100} h={100} color="blue.300" />
          </Center>
          <Text fontSize="25px" color="black" textAlign="center">
            Fast transportation!
          </Text>
          <Text
            fontSize="18px"
            w="50%"
            color="black"
            textAlign="center"
            mx="auto"
          >
            WeShop is on of the fastest platforms because it delivers products
            within 24 hours !
          </Text>
        </GridItem>
      </Grid>
      <Heading textAlign="center" mb="5">
        Testimonials
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" h="300" bg="blackAlpha.50">
          <Center>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="2xl"
            />
          </Center>
          <Center>
            <Text fontSize="18px" w="50%" color="black" pt="5">
              Wow ! WeShop really has everything. I recently bought a new house
              and i found everything i needed here.
            </Text>
          </Center>
        </GridItem>
        <GridItem w="100%" h="300" bg="blackAlpha.50">
          <Center>
            <Avatar
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
              size="2xl"
            />
          </Center>
          <Center>
            <Text fontSize="18px" w="50%" color="black" pt="5">
              I love the user experience from this website.Everything is so
              simple and the support is very helpful and kind .
            </Text>
          </Center>
        </GridItem>
        <GridItem w="100%" h="300" bg="blackAlpha.50">
          <Center>
            <Avatar
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
              size="2xl"
            />
          </Center>
          <Center>
            <Text fontSize="18px" w="50%" color="black" pt="5">
              I was a little sceptical about the transportation but when i got
              my products i was really happy !
            </Text>
          </Center>
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default LandingPage;
