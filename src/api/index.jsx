import { getToken } from "../utils/storage";
import { axiosInstance } from "./axios-instance";



const authSignIn = {
  url: '/login',
  async request(email, password, config) {
    return axiosInstance.post(this.url, {email, password}, config);
  },
};

const getManyAccount = {
  url: '/accounts',
  async request(config) {
    return axiosInstance.get(this.url, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      ...config
    });
  },
};

const getAccountUser = {
  url: '/accounts',
  async request(query, config) {
    return axiosInstance.get(this.url, {
      params: query,
      ...config
    });
  },
};

const getOneAccount = {
  url: (id) => `/accounts/${id}`,
  async request(params, config) {
    return axiosInstance.get(this.url(params.id), {
      ...config
    });
  },
};

const getOneUser = {
  url: (userId) => `/users/${userId}`,
  async request(params, config) {
    return axiosInstance.get(this.url(params.userId), {
      ...config
    });
  },
};

const getOneUserSetting = {
  url: '/userSetting',
  async request(query, config) {
    return axiosInstance.get(this.url, {
      params: query,
      ...config
    });
  },
};

export const Api = {
  authSignIn,
  getManyAccount,
  getOneAccount,
  getOneUser,
  getAccountUser,
  getOneUserSetting
};
