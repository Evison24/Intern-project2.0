import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PieChart from './PieChart';
import useGetUser from '../../utils/hooks/useGetUser';
import { Center } from '@chakra-ui/react';
import _ from 'lodash';

const ProductsChart = () => {
  const [amChartData, setAmChartData] = useState(null);
  const user = useGetUser();
  const products = useSelector(state => state.products);

  let data = [];
  let chartData = [];
  const titleVal = productId => {
    return products.map(product => {
      if (product.id === productId) {
        return product.title.slice(0, 20);
      }
    });
  };
  useEffect(() => {
    const fetchSoldProducts = async () => {
      const resSoldProd = await axios.get(
        `http://localhost:4000/sold?userId=${user.id}`
      );
      const soldProds = resSoldProd.data;
      if (soldProds) {
        for (let i = 0; i < soldProds.length; i++) {
          for (let j in soldProds[i].products)
            data.push(soldProds[i].products[j]);
        }
      }
      let groupedByProdId = _.groupBy(data, 'productId');
      let groupedByProdIdArray = _.values(groupedByProdId);
      console.log(groupedByProdIdArray);
      chartData = groupedByProdIdArray.map(currVal => {
        return {
          title: titleVal(currVal[0].productId),
          productId: currVal[0].productId,
          quantity: currVal.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.quantity,
            0
          ),
        };
      });

      console.log(chartData);
      setAmChartData(chartData);
    };

    fetchSoldProducts();
  }, []);

  let series = {
    name: 'Series',
    categoryField: 'title',
    valueField: 'quantity',
  };
  return (
    <>
      <Center>
        {amChartData && <PieChart data={amChartData} chartSeries={series} />}
      </Center>
    </>
  );
};

export default ProductsChart;
