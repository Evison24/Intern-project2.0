import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { onCartChange } from '../../utils/store/reducers/carts/cartSlice';

const CartItem = ({ quantity, product }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <Flex align={'center'} mt={7}>
        <Image
          boxSize="150px"
          src={product.image}
          alt="product"
          rounded="lg"
          width="120px"
          height="180px"
          fit="cover"
          draggable="false"
          mr={5}
        />
        <Box>
          <Stack spacing={0.5}>
            <Text maxW={100} fontWeight="medium">
              {product.title}
            </Text>
            <Text fontSize="sm">Category: {product.category}</Text>
          </Stack>
        </Box>
        <Spacer />
        <Box>{quantity}</Box>
        <Spacer />
        <Box>${quantity * product.price}</Box>
        <Spacer />
        <Button
          onClick={() => {
            const copyCart = JSON.parse(JSON.stringify(cart));
            const index = copyCart.products.findIndex(
              p => p.productId === product.id
            );
            if (index >= 0) {
              copyCart.products.splice(index, 1);
              dispatch(onCartChange(copyCart));
              axios.put(`http://localhost:4000/carts/${copyCart.id}`, copyCart);
            }
          }}
        >
          X
        </Button>
      </Flex>
    </>
  );
};

export default CartItem;
