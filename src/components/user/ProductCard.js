import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  ButtonGroup,
  IconButton,
  Flex,
  Button,
} from '@chakra-ui/react';

import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  FaCartArrowDown,
  CgDetailsMore,
} from 'react-icons/all';

import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import useGetUser from '../../utils/hooks/useGetUser';

const ProductCard = ({ data, cart, handleCartChange }) => {
  const text = `${data.title}`;
  const user = useGetUser();

  const [counter, setCounter] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const toast = useToast();
  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    counter > 0 && setCounter(counter - 1);
  };

  const addToCart = async () => {
    if (counter > 0) {
      const copyCart = JSON.parse(JSON.stringify(cart));
      if (copyCart) {
        const index = copyCart.products.findIndex(p => p.productId === data.id);
        if (index >= 0) {
          copyCart.products[index].quantity += counter;
          const updatedQuantity = await axios.put(
            `http://localhost:4000/carts/${copyCart.id}`,
            copyCart
          );
          handleCartChange(updatedQuantity.data);
          if (updatedQuantity.status === 200) {
            showMessage('Success', 'Product added to cart !', 'success');
          } else {
            showMessage('Error', 'Something went wrong !', 'error');
          }
        } else {
          copyCart.products.push({ productId: data.id, quantity: counter });
          const resCartUpdated = await axios.put(
            `http://localhost:4000/carts/${copyCart.id}`,
            copyCart
          );
          handleCartChange(resCartUpdated.data);
          if (resCartUpdated.status === 200) {
            showMessage('Success', 'New product added to cart !', 'success');
          } else {
            showMessage('Error', 'Something went wrong !', 'error');
          }
        }
      } else {
        const resNewCart = await axios.post('http://localhost:4000/carts', {
          userId: user.id,
          date: new Date(),
          products: [{ productId: data.id, quantity: counter }],
        });
        handleCartChange(resNewCart.data);
        if (resNewCart.status === 201) {
          showMessage(
            'Success',
            'You added your first product to your cart !',
            'success'
          );
        } else {
          showMessage('Error', 'Something went wrong !', 'error');
        }
      }
      setCounter(0);
    }
  };

  const showMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
    });
  };
  return (
    <>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxH={'600px'}
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
              mx={'auto'}
              rounded={'lg'}
              height={230}
              width={225}
              objectFit="fill"
              src={data.image}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              Brand
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {showMore ? `${text}` : `${text.substring(0, 20)}`}
              <Button
                variant={'ghost'}
                icon={<CgDetailsMore />}
                onClick={() => setShowMore(!showMore)}
              >
                {' '}
                {showMore ? 'Show less' : '...'}{' '}
              </Button>
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                ${data.price}
              </Text>
              <Text textDecoration={'line-through'} color={'gray.600'}>
                $999
              </Text>
            </Stack>
          </Stack>
          <Center>
            <ButtonGroup variant="ghost" mt={5}>
              <IconButton
                onClick={() => addToCart()}
                fontSize={35}
                icon={<FaCartArrowDown />}
                colorScheme="purple"
              />
              <Flex align={'center'} gap={2}>
                <IconButton
                  fontSize={35}
                  icon={<AiOutlinePlusCircle />}
                  colorScheme="green"
                  onClick={() => handleIncrement()}
                />
                {counter}
                <IconButton
                  fontSize={35}
                  icon={<AiOutlineMinusCircle />}
                  colorScheme="red"
                  onClick={() => handleDecrement()}
                />
              </Flex>
            </ButtonGroup>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default ProductCard;
