import { Container } from '@chakra-ui/react';

import { useEffect, useState, useMemo } from 'react';
import Axios from '../utils/axios/Axios';
import DataTable from '../components/admin/DataTable';

const AdminPage = () => {
  const [data, setData] = useState(null);
  const [cols, setCols] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const resp = await Axios.post('users/AllUsers', {
        pageNumber: 1,
        pageSize: 10,
      });
      console.log(resp.data.columns);
      // console.log(resp.data.columns[1].accessor);
      setCols(resp.data.columns);
    };
    fetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        columns: [
          {
            Header: cols?.Header[1],
            accessor: cols?.accessor[1],
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Container maxW={1500} mb={20}>
        <DataTable columns={columns} />
      </Container>
    </>
  );
};

export default AdminPage;
