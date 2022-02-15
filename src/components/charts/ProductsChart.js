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
  const [amChartData, setAmChartData] = useState(null);
  const user = useGetUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let data = [];
  let chartData = [];

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const resSoldProd = await axios.get(
        `http://localhost:4000/sold?userId=${user.id}`
      );
      setSoldProducts(resSoldProd.data);
      const soldProds = resSoldProd.data;
      if (soldProds) {
        for (let i = 0; i < soldProds.length; i++) {
          for (let j in soldProds[i].products)
            data.push(soldProds[i].products[j]);
        }
      }
      let groupedByProdId = _.groupBy(data, 'productId');
      let groupedByProdIdArray = _.values(groupedByProdId);

      /* 
          Get products from FakeStoreAPI
          Compare the products id with productId from the sold prods array
          When the id is the same we assign the product title
          Then we add prodTitle to chartData as the first data type
      */

      chartData = groupedByProdIdArray.map(currVal => {
        return {
          productId: currVal[0].productId,
          quantity: currVal.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.quantity,
            0
          ),
        };
      });

      setAmChartData(chartData);
    };

    fetchSoldProducts();
  }, []);
  let series = {
    name: 'Series',
    categoryField: 'productId',
    valueField: 'quantity',
  };
  return (
    <>
      <Button ml={5} colorScheme={'orange'} onClick={onOpen}>
        PieChart
      </Button>
      <Modal
        size={'xl'}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>
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
