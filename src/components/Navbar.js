import {
  Flex,
  Spacer,
  Box,
  Heading,
  Container,
  Icon,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { FcShop } from 'react-icons/all';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Cart from './user/Cart';
import useGetUser from '../utils/hooks/useGetUser';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Navbar = () => {
  let user = useGetUser();
  const cart = useSelector(state => state.cart);
  const [isDisabled, setIsDisabled] = useState(false);

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
            <Box p={'2'}>
              <Heading size={'md'} color={'orange'}>
                <Icon as={FcShop} w={8} h={8} />
              </Heading>
            </Box>
            <NavLink p={'2'} to={'/'}>
              <Heading size={'md'} color={'orange'}>
                WeShop
              </Heading>
            </NavLink>
            <Spacer />
            <Box>
              <Login />
              {!user && <SignUp />}

              {user?.isAdmin === false && cart?.products.length > 0 ? (
                <Cart />
              ) : user?.isAdmin === false && cart?.products.length < 0 ? (
                setIsDisabled(true) && <Cart isDisabledCheck={isDisabled} />
              ) : (
                ' '
              )}
              {user?.isAdmin === false ? (
                <Button ml={5} colorScheme={'orange'}>
                  <NavLink to={'/user-chart'}>User Chart</NavLink>
                </Button>
              ) : (
                ' '
              )}
              {user?.isAdmin ? (
                <Button ml={5} colorScheme={'orange'}>
                  <NavLink to={'/all-users-chart'}>All users XYChart</NavLink>
                </Button>
              ) : (
                ''
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
