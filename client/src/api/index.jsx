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

const getOneAccount = {
  url: (id) => `/accounts/${id}`,
  async request(params, config) {
    return axiosInstance.get(this.url(params.id), {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      ...config
    });
  },
};

const getOneUser = {
  url: (userId) => `/users/${userId}`,
  async request(params, config) {
    return axiosInstance.get(this.url(params.userId), {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      ...config
    });
  },
};

export const Api = {
  authSignIn,
  getManyAccount,
  getOneAccount,
  getOneUser
};
