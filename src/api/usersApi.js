import { axiosInstance } from './axios-instance';

const usersApi = {
  getUsersData: async ({ params }) => await axiosInstance.get('/users', { params }),

  getUserSettingData: async () => await axiosInstance.get('/userSetting'),

  getSearchData: async ({ params }) => await axiosInstance.get('/users', { params }),

  addNewUserData: async (config) => await axios.post('/users', config),

  updateUserData: async ({ params }) => await axios.patch('/users', { params }),

  removeUser: async (targetId) => await axiosInstance.delete(`/users/${targetId}`),
};

export default usersApi;
