import axios from "axios";

const DEFAULT_AXIOS_TIMEOUT_MILLISECONDS = 5 * 1000;

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {},
  timeout: DEFAULT_AXIOS_TIMEOUT_MILLISECONDS,

  paramsSerializer: function (params) {
    return new URLSearchParams(params).toString();
  },
});