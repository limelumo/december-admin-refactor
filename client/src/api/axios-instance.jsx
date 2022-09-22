import axios from "axios";
import { getToken } from "../utils/storage";

const DEFAULT_AXIOS_TIMEOUT_MILLISECONDS = 5 * 1000;

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,

  timeout: DEFAULT_AXIOS_TIMEOUT_MILLISECONDS,

  paramsSerializer: function (params) {
    return new URLSearchParams(params).toString();
  },
});