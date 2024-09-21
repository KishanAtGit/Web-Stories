import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
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

export default apiClient;
