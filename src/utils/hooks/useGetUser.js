import { useSelector } from 'react-redux';

const useGetUser = () => {
  const user = useSelector(state => state.user);
  return user;
};

export default useGetUser;
