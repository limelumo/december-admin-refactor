import { axiosInstance } from './axios-instance';

const Api = {
  getAllAccounts: async (params = {}) => {
    const { data } = await axiosInstance.get('/accounts', { params });
    return data;
  },
  getAccountById: async (id) => {
    const { data } = await axiosInstance.get(`/accounts/${id}`);
    return data;
  },
  getAllUsers: async (params = {}) => {
    const { data } = await axiosInstance.get('/users', { params });
    return data;
  },
  getUserById: async (id) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  },
  getAllUserSettings: async () => {
    const { data } = await axiosInstance.get('/usersetting');
    return data;
  },
};

export default Api;
