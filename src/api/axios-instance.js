import axios from 'axios';

// TODO: token refresh
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHR0LmNvbSIsImlhdCI6MTY2Mzk0NjAzNCwiZXhwIjoxNjYzOTQ5NjM0LCJzdWIiOiIxMDQifQ.XwDhjOYItFsWNhxO5ZHny3G53fIIqL5e-tSkgqvHKoI';

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },

  paramsSerializer: function (params) {
    return new URLSearchParams(params).toString();
  },
  timeout: 3000,
});
