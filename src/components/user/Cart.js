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
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/all';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { onCartChange } from '../../utils/store/reducers/carts/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart);
  const [products, setProducts] = useState(null);
  const [firstLoad, setFirstLoad] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart && !firstLoad) {
        const copyProducts = [];
        let price = 0;
        if (cart.products?.length > 0) {
          for (let i = 0; i < cart.products.length; i++) {
            const respProd = await axios.get(
              `https://fakestoreapi.com/products/${cart.products[i].productId}`
            );
            copyProducts.push(respProd.data);
            price += respProd.data.price * cart.products[i].quantity;
          }
          setTotalPrice(price);
          setProducts(copyProducts);
        } else {
          setProducts([]);
          setTotalPrice(0);
        }
        setFirstLoad(true);
      }
    };
    fetchProducts();
  }, [cart]);

  useEffect(() => {
    const fetch = async () => {
      if (cart && firstLoad) {
        const newProducts = [];
        let price = 0;
        if (cart.products?.length > 0) {
          for (let i = 0; i < cart.products.length; i++) {
            let copyProducts = [...products];
            const foundProduct = copyProducts.find(
              p => p.id === cart.products[i].productId
            );
            let productToAdd;
            if (foundProduct) {
              productToAdd = foundProduct;
            } else {
              const respProd = await axios.get(
                `https://fakestoreapi.com/products/${cart.products[i].productId}`
              );
              productToAdd = respProd.data;
            }
            newProducts.push(productToAdd);
            price += productToAdd.price * cart.products[i].quantity;
          }

          setTotalPrice(price);
          setProducts(newProducts);
        } else {
          setProducts([]);
          setTotalPrice(0);
        }
      }
    };
    fetch();
  }, [cart]);

  // get cart
  // copy cart data
  // add cart data to sold
  // delete cart

  const buyProducts = async () => {
    const soldCart = JSON.parse(JSON.stringify(cart));
    console.log(soldCart);
    if (cart.products.length > 0) {
      await axios.put(`http://localhost:4000/sold/${soldCart.id}`, soldCart);
      await axios.delete(`http://localhost:4000/carts/${soldCart.id}`);

      dispatch(onCartChange(soldCart));
    }
  };

  return (
    <>
      <Button variant={'unstyled'} bgColor={'black'} onClick={onOpen} ml={5}>
        {' '}
        <Icon fontSize={35} color={'orange'} as={TiShoppingCart} />
      </Button>

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
            {products && products?.length === 1
              ? `${products?.length} item `
              : `${products?.length} items `}
            ){' '}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex>
              <Box w={600}>
                {products?.map((product, index) => {
                  const productQuantity = cart.products.find(
                    p => p.productId === product.id
                  )?.quantity;
                  return (
                    <CartItem
                      product={product}
                      key={index}
                      quantity={productQuantity}
                    />
                  );
                })}
              </Box>
              <Spacer />
              <Box
                bgColor={'blackAlpha.50'}
                mt={7}
                h={350}
                w={300}
                border={'1px'}
                borderColor={'blackAlpha.300'}
                borderRadius={'lg'}
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