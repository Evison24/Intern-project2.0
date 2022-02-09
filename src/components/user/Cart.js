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
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/all';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart);
  const [products, setProducts] = useState(null);
  const [firstLoad, setFirstLoad] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart && !firstLoad) {
        const copyProducts = [];
        let price = 0;
        if (cart.products.length > 0) {
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
        if (cart.products.length > 0) {
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

  return (
    <>
      <Button _hover={'none'} bgColor={'black'} onClick={onOpen} ml={5}>
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
      >
        <ModalOverlay />
        <ModalContent maxW={1400}>
          <ModalHeader>
            Cart
            {/* Shopping Cart (
            {products && products.length === 1
              ? `${products.length} item `
              : `${products.length} items `}
            ){' '} */}
          </ModalHeader>
          <ModalCloseButton />
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
              <Box></Box>
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
