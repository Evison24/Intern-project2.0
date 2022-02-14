import { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import useGetUser from '../../utils/hooks/useGetUser';
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
} from '@chakra-ui/react';
import { FcShop } from 'react-icons/all';
import _ from 'lodash';

const ProductsChart = () => {
  const [soldProducts, setSoldProducts] = useState(null);
  const [totalProdQuantity, setTotalProdQuantity] = useState(0);
  const [amChartData, setAmChartData] = useState(null);
  const user = useGetUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let series = {
    name: 'Series',
    categoryField: 'Product',
    valueField: 'totalQuantity',
  };
  let data = [];

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const resSoldProd = await axios.get(
        `http://localhost:4000/sold?userId=${user.id}`
      );
      setSoldProducts(resSoldProd.data);

      // let groupedSoldProducts = _.groupBy(resSoldProd.data, 'id');
      // console.log(groupedSoldProducts);

      debugger;

      //TODO access productId in all the objects in sold table

      setAmChartData(data);
    };
    fetchSoldProducts();
  }, []);

  if (resSoldProd.data) {
    for (let i = 0; i < resSoldProd.data.length; i++) {
      for (let j in resSoldProd.data?.products) {
        let x = resSoldProd.data?.products[j];
        console.log(x);
      }
    }
  }
  return (
    <>
      <Button ml={5} colorScheme={'orange'} onClick={onOpen}>
        PieChart
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            This chart shows how many times each product is purchased !
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {amChartData && (
              <PieChart data={amChartData} chartSeries={series} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductsChart;
