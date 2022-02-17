import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import ProductCard from '../components/user/ProductCard';

import axios from 'axios';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import useGetUser from '../utils/hooks/useGetUser';
import { useDispatch, useSelector } from 'react-redux';
import { onCartChange } from '../utils/store/reducers/carts/cartSlice';
import { onProductsFetch } from '../utils/store/reducers/products/productsSlice';

const UserPage = () => {
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);
  const user = useGetUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRes = await axios.get('https://fakestoreapi.com/products');
      if (productsRes && productsRes.data) {
        dispatch(onProductsFetch(productsRes.data));
      }
    };
    fetchProducts();

    const fetchCart = async () => {
      const resCart = await axios.get(
        `http://localhost:4000/carts/?&userId=${user.id}`
      );
      if (resCart.data && resCart.data.length > 0) {
        handleCartChange(resCart.data[0]);
      }
    };
    fetchCart();
  }, []);

  const handleCartChange = newData => {
    dispatch(onCartChange(newData));
  };

  return (
    <>
      {products ? (
        <Container maxW={1600} mt={20}>
          <SimpleGrid minChildWidth="330px" spacing={'40px'}>
            {products.map((product, index) => (
              <ProductCard
                key={index}
                data={product}
                handleCartChange={handleCartChange}
                cart={cart}
              />
            ))}
          </SimpleGrid>
        </Container>
      ) : (
        <Center my={20}>
          {' '}
          <Spinner
            mx={'auto'}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      <Footer />
    </>
  );
};

export default UserPage;
