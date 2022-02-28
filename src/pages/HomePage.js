import AdminPage from './AdminPage';
import useGetUser from '../utils/hooks/useGetUser';
import UserPage from './UserPage';

const HomePage = () => {
  const user = useGetUser();

  return <>{user?.roli === 'Admin' ? <AdminPage /> : <UserPage />}</>;
};

export default HomePage;
