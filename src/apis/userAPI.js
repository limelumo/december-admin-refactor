import { axiosInstance } from './axios-instance';

const userAPI = {
  getAllUsers: async () => {
    const { data } = await axiosInstance.get('/users');
    return data;
  },
  getOneUsersById: async (id) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  },
  getUserSetting : async () => {
    const { data } = await axiosInstance.get('/usersetting');
    return data;
  },
  updateUser: async (id) => {
    const { data } = await axiosInstance.patch(`/users/${id}`);
    return data;
  },
};

export default userAPI;
