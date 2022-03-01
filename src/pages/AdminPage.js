import { Container } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import Axios from '../utils/axios/Axios';
import DataTable from '../components/admin/DataTable';
import { COLUMNS } from '../components/admin/Columns';

const AdminPage = () => {
  let dataArray = [];

  useEffect(() => {
    const fetch = async () => {
      const resp = await Axios.post('users/AllUsers', {
        pageNumber: 1,
        pageSize: 10,
      });
      console.log(resp.data.data.data);
      for (let i = 0; i < resp.data.data.data.length; i++) {
        dataArray.push(resp.data.data.data[i]);
      }
    };
    fetch();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataArray, []);
  console.log(dataArray);

  return (
    <>
      <Container maxW={1500} mt={'30px'}>
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
};

export default AdminPage;
