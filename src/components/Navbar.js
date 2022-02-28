import {
  Flex,
  Spacer,
  Box,
  Container,
  Icon,
  Button,
  Image,
} from '@chakra-ui/react';
import { FcShop } from 'react-icons/all';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Cart from './user/cart/Cart';
import useGetUser from '../utils/hooks/useGetUser';
import weshoplogo from '../images/weshoplogo.png';

const Navbar = () => {
  let user = useGetUser();

  return (
    <>
      <Box
        w={'100%'}
        maxH={'xs'}
        bgColor={'black'}
        position={'sticky'}
        top={0}
        zIndex={10}
      >
        <Container maxW={'1600px'}>
          <Flex align={'center'}>
            <Box mr={-7} mt={'5px'}>
              <NavLink to={user ? '/' : '/landing'}>
                <Icon as={FcShop} w={8} h={8} />
              </NavLink>
            </Box>
            <Box>
              <NavLink to={user ? '/' : '/landing'}>
                <Image src={weshoplogo} h={100} my={-25} />
              </NavLink>
            </Box>

            <Spacer />
            {user?.roli !== 'Admin' && <Cart />}
            <Box>
              {!user && <SignUp />}
              {user?.roli !== 'Admin' ? (
                <Button ml={5} colorScheme={'orange'}>
                  <NavLink to={'/user-chart'}>User Chart</NavLink>
                </Button>
              ) : (
                ' '
              )}
              {user?.roli !== 'Admin' ? (
                <Button ml={5} colorScheme={'orange'}>
                  <NavLink to={'/my-profile'}>My profile</NavLink>
                </Button>
              ) : (
                ' '
              )}
              {user?.roli === 'Admin' ? (
                <Button ml={5} colorScheme={'orange'}>
                  <NavLink to={'/all-users-chart'}>All users XYChart</NavLink>
                </Button>
              ) : (
                ''
              )}
              <Login />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
