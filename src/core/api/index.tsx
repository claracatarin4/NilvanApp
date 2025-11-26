import axios from 'axios';
import StorageService from '../../shared/service/storage';

const api = axios.create({

  baseURL: 'http://localhost:8410/api', 
  headers: {

    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = StorageService.returnToken();
    
    if (token) {

      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;