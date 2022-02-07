import { Navigate } from 'react-router-dom';
import useGetUser from '../utils/hooks/useGetUser';

const PrivateRoute = ({ children }) => {
  const user = useGetUser();

  return user ? children : <Navigate replace to="/landing" />;
};

export default PrivateRoute;
