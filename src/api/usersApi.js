import { axiosInstance } from './axios-instance';

const usersApi = {
  getUsersData: async (params = {}) => await axiosInstance.get('/users', { params }),

  getUserSettingData: async () => await axiosInstance.get('/userSetting'),

  getAccountsData: async () => await axiosInstance.get('/accounts'),

  getSearchData: async (params = {}) => await axiosInstance.get('/users', { params }),

  addNewUserData: async (config) => await axiosInstance.post('/users', config),

  updateUserData: async (targetId, config) => await axiosInstance.patch(`/users/${targetId}`, { name: config }),

  removeUser: async (targetId) => await axiosInstance.delete(`/users/${targetId}`),
};

export default usersApi;
