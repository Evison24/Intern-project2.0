import axios from 'axios';
import TokenManager from '../helpers/TokenManager';

const Axios = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:48830/api/',
  });
  axiosInstance.interceptors.request.use(async request => {
    const jwt = TokenManager.getToken();
    if (jwt) {
      request.headers['Authorization'] = `Bearer ${jwt}`;
    }
    return request;
  });
  return axiosInstance;
};

export default Axios();
