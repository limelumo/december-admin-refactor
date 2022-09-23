import axios from 'axios';

// TODO: token refresh
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHR0LmNvbSIsImlhdCI6MTY2MzkxMzUzNSwiZXhwIjoxNjYzOTE3MTM1LCJzdWIiOiIxMDQifQ.sRxUlOQgV78uC8wJPI7fbVOHgQSOkOazuEG1IXqgqCo';

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },

  paramsSerializer: function (params) {
    return new URLSearchParams(params).toString();
  },
  timeout: 3000,
});
