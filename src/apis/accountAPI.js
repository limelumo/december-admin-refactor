import { axiosInstance } from './axios-instance';

const accountsAPI = {
  getAllAccount: async () => {
    const { data } = await axiosInstance.get('/accounts');
    return data;
  },
  getAllAccountByUserId: async ({ userId }) => {
    const params = new URLSearchParams({ user_id: userId });
    const { data } = await axiosInstance.get(`/accounts?${params.toString()}`);
    return data;
  },
  getOneAccountById: async ({ id }) => {
    const { data } = await axiosInstance.get(`/accounts/${id}`);
    return data;
  },
  updateAccountsById: async ({ id }) => {
    const { data } = await axiosInstance.patch(`/accounts/${id}`);
    return data;
  },
};

export default accountsAPI;
