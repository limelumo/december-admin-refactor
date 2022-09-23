import axios from 'axios';
import { clearStorage } from '../utils/storage';

const token = localStorage.getItem('accessToken');

export const axiosInstance = axios.create({
  headers: {
    Authorization: token,
    withCredentials: true,
  },
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    try {
      const errResponseStatus = error.response.status;
      if (errResponseStatus === 401) {
        clearStorage();
        window.location.replace('/')
      }
    } catch (e) {
      console.error(e)
    }
  }
);
