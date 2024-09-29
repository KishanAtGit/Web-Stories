import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  //baseURL: 'http://localhost:3000/api/',
  baseURL: 'https://web-stories-backend.onrender.com/api/',
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const notifyOnSuccess = message => {
  toast.success(message);
};

export const notifyOnFail = message => {
  toast.error(message);
};

export default apiClient;
