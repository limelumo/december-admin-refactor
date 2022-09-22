import axios from 'axios';

const BASE_URL = 'http://localhost:4000';
// const token = localStorage.getItem('accessToken');
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNjYzODM5OTY3LCJleHAiOjE2NjM4NDM1NjcsInN1YiI6IjEwMiJ9.IwX670wJBh0TF9fZGDBJvgEOO6TUDDZIxb3PKu6QUlI';

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: 'Bearer ' + token
    Authorization: token,
    withCredentials: true,
  },
});
