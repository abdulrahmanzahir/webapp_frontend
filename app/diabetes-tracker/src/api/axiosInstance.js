import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://webapp-diabtrack-1-dpxw.onrender.com/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // If /chat, skip Authorization header
    if (!config.url.includes('/chat')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
