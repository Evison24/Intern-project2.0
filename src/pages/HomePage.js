import AdminPage from './AdminPage';
import useGetUser from '../utils/hooks/useGetUser';
import UserPage from './UserPage';

const HomePage = () => {
  const user = useGetUser();

  return <>{user.isAdmin ? <AdminPage /> : <UserPage />}</>;
};

export default HomePage;
