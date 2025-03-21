import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7095/api', 
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('auth_token');
      if (token) {
        // Agregar el token al header de la solicitud
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );