import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
  Divider,
  IconButton,
} from '@chakra-ui/react';

import { CgDetailsMore, MdRemoveShoppingCart } from 'react-icons/all';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { onCartChange } from '../../utils/store/reducers/carts/cartSlice';
import { useState } from 'react';

const CartItem = ({ quantity, product }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const text = `${product.title}`;

  return (
    <>
      <Flex align={'center'} mt={7}>
        <Image
          boxSize="150px"
          src={product.image}
          alt="product"
          rounded="lg"
          maxW="120px"
          maxH="120px"
          fit="contain"
          draggable="false"
          mr={5}
        />
        <Box>
          <Stack spacing={0.5}>
            <Text maxW={100} fontWeight="medium">
              {showMore ? `${text}` : `${text.substring(0, 20)}`}
              <Button
                variant={'ghost'}
                icon={<CgDetailsMore />}
                onClick={() => setShowMore(!showMore)}
              >
                {' '}
                {showMore ? 'Show less' : '...'}{' '}
              </Button>
            </Text>
            <Text fontSize="sm">Category: {product.category}</Text>
          </Stack>
        </Box>
        <Spacer />
        <Box>{quantity}</Box>
        <Spacer />
        <Box>${quantity * product.price}</Box>
        <Spacer />
        <IconButton
          fontSize={25}
          bgColor={'red.400'}
          icon={<MdRemoveShoppingCart />}
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
        </IconButton>
      </Flex>
      <Divider mt={5} />
    </>
  );
};

export default CartItem;
