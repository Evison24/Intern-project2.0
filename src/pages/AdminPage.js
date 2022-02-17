import { Heading } from '@chakra-ui/react';
import XYusersChart from '../components/charts/XYusersChart';

const AdminPage = () => {
  return (
    <>
      <Heading textAlign="center">Welcome Admin !</Heading>
      <XYusersChart />
    </>
  );
};

export default AdminPage;
