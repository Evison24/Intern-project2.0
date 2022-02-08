import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';

import { useState } from 'react';
import axios from 'axios';
import useGetUser from '../../utils/hooks/useGetUser';

const ProductCard = ({ data, cart, handleCartChange }) => {
  const text = `${data.description}`;
  const user = useGetUser();

  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState(null);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    counter > 0 && setCounter(counter - 1);
  };

  //   const addToCart = async () => {
  //     if (counter > 0) {
  //       const copyCart = JSON.parse(JSON.stringify(cart));
  //       if (copyCart) {
  //         const index = copyCart.products.findIndex(p => p.productId === data.id);
  //         if (index >= 0) {
  //           copyCart.products[index].quantity += counter;
  //           const updatedQuantity = await axios.put(
  //             `http://localhost:4000/carts/${copyCart.id}`,
  //             copyCart
  //           );
  //           handleCartChange(updatedQuantity.data);
  //           if (updatedQuantity.status === 200) {
  //             setMessage('Product added successfully !');
  //           } else {
  //             setMessage('Something went wrong !');
  //           }
  //         } else {
  //           copyCart.products.push({ productId: data.id, quantity: counter });
  //           const resCartUpdated = await axios.put(
  //             `http://localhost:4000/carts/${copyCart.id}`,
  //             copyCart
  //           );
  //           handleCartChange(resCartUpdated.data);
  //           if (resCartUpdated.status === 200) {
  //             setMessage('New product added to cart !');
  //           } else {
  //             setMessage('Something went wrong !');
  //           }
  //         }
  //       } else {
  //         const resNewCart = await axios.post('http://localhost:4000/carts', {
  //           userId: user.id,
  //           date: new Date(),
  //           products: [{ productId: data.id, quantity: counter }],
  //         });
  //         handleCartChange(resNewCart.data);
  //         if (resNewCart.status === 201) {
  //           setMessage('You added your first product to your cart !');
  //         } else {
  //           setMessage('Something went wrong !');
  //         }
  //       }
  //       setCounter(0);
  //     }
  //   };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `${data.image}`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit="fill"
            src={data.image}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {data.title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              ${data.price}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
