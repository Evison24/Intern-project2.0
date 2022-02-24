import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  Flex,
  Box,
  Spacer,
  Heading,
  Divider,
  Text,
  Center,
  useToast,
  Tooltip,
  Spinner,
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/all';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { onCartChange } from '../../../utils/store/reducers/carts/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import useGetUser from '../../../utils/hooks/useGetUser';

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const dispatch = useDispatch();
  const user = useGetUser();
  const toast = useToast();

  useEffect(() => {
    let cProducts = [];
    let tPrice = 0;
    cart?.products?.forEach(cp => {
      const foundProduct = products?.find(p => p.id === cp.productId);
      if (foundProduct) {
        cProducts.push(foundProduct);
        tPrice += foundProduct.price * cp.quantity;
      }
    });
    setCartProducts(cProducts);
    setTotalPrice(tPrice);
  }, [cart, products]);

  const buyProducts = async () => {
    if (cart && cart.products.length > 0) {
      await axios.post('http://localhost:4000/sold', {
        userId: user.id,
        date: new Date(),
        products: cart.products,
        totalPrice,
      });

      await axios.delete(`http://localhost:4000/carts/${cart.id}`);
      dispatch(onCartChange(null));
      setTotalPrice(0);
      toast({
        title: 'Success',
        description:
          'Your products will arrive to your address within 24 hours !',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {cart?.products.length > 0 ? (
        <Button variant={'unstyled'} bgColor={'black'} onClick={onOpen} ml={5}>
          {' '}
          <Icon fontSize={35} color={'orange'} as={TiShoppingCart} />
        </Button>
      ) : (
        <Tooltip
          label="You don't have any products in your cart !"
          aria-label="A tooltip"
        >
          <Box>
            <Button
              isDisabled
              variant={'unstyled'}
              bgColor={'black'}
              onClick={onOpen}
            >
              {' '}
              <Icon fontSize={35} color={'orange'} as={TiShoppingCart} />
            </Button>
          </Box>
        </Tooltip>
      )}

      <Modal
        closeOnOverlayClick={false}
        size={'xl'}
        maxW={1600}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent maxW={1100} maxH={700}>
          <ModalHeader bgColor={'orange.400'}>
            Shopping Cart (
            {!cart?.products
              ? '0 items'
              : cart.products?.length === 1
              ? `${cart.products?.length} item `
              : `${cart.products?.length} items `}
            ){' '}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex>
              <Box w={600}>
                {cartProducts ? (
                  cartProducts.map((cp, index) => (
                    <CartItem
                      product={cp}
                      key={index}
                      quantity={
                        cart?.products.find(p => p.productId === cp.id)
                          ?.quantity
                      }
                    />
                  ))
                ) : (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="orange.500"
                    size="xl"
                  />
                )}
              </Box>
              <Spacer />
              <Box
                bgColor={'blackAlpha.50'}
                top={7}
                h={350}
                w={300}
                border={'1px'}
                borderColor={'blackAlpha.300'}
                borderRadius={'lg'}
                position={'sticky'}
              >
                <Heading size={'md'} mt={5} ml={5}>
                  Order Summary
                </Heading>
                <Divider mt={5} />
                <Box maxW={250} mx={'auto'}>
                  <Flex mt={7} justify={'space-between'}>
                    <Text fontSize={20}>Products</Text>
                    <Text fontSize={20}>${totalPrice.toFixed(2)}</Text>
                  </Flex>
                  <Flex mt={2} justify={'space-between'}>
                    <Text fontSize={20}>Shipping</Text>
                    <Text fontSize={20}>Gratis</Text>
                  </Flex>
                  <Divider mt={5} />
                  <Flex mt={5} justify={'space-between'}>
                    <Heading size={'sm'} fontSize={20}>
                      Total amount
                    </Heading>
                    <Heading fontSize={20}>${totalPrice.toFixed(2)}</Heading>
                  </Flex>
                  <Center>
                    <Button
                      onClick={() => buyProducts()}
                      colorScheme={'orange'}
                      mx={5}
                      w={'100%'}
                      mt={10}
                    >
                      Buy
                    </Button>
                  </Center>
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Cart;
