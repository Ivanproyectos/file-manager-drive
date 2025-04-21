import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 50000,
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

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        alert('Sesión expirada o no válida. vuelve a iniciar sesión.');
        console.log('Token expirado o no válido. Redirigiendo al login...');   
         window.location.href = '/login'; 
         Cookies.remove('auth_token');
  
      }
      return Promise.reject(error); 
    }
  );