import axios from 'axios';

const token = localStorage.getItem('accessToken');
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer ' + token,
    withCredentials: true,
  },
});
