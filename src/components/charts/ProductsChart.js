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
  IconButton,
} from '@chakra-ui/react';
import { FcShop } from 'react-icons/all';

const ProductsChart = () => {
  const [soldProducts, setSoldProducts] = useState(null);
  const [amChartData, setAmChartData] = useState(null);
  const user = useGetUser();
  let totalProdQuantity = 0;

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchSoldProducts = async () => {
      const resSoldProd = await axios.get(
        `http://localhost:4000/sold?userId=${user.id}`
      );
      setSoldProducts(resSoldProd.data);
      console.log(resSoldProd.data);
    };
    fetchSoldProducts();
  }, []);

  useEffect(() => {
    let data = [
      {
        TodoState: 'Completed',
        value: completedTodos,
      },
    ];
    setAmChartData(data);
  }, []);

  let series = {
    name: 'Series',
    valueField: 'totalProductQuantity',
    categoryField: 'ProductTitle',
  };
  return (
    <>
      <Button onClick={onOpen}>PieChart</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            This chart shows how many times each product is purchased !
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {amChartData && <PieChart data={amChartData} chartSeries={series} />} */}
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
