import axios from "axios";
import { getToken } from "../reducers/auth";
// import { getToken } from '../utils/Common';

const axiosClient = axios.create({
   baseURL: process.env.REACT_APP_API_ENDPOINT,
   headers: {
      "content-type": "application/json",
      Authorization: getToken() as string,
   },
});

axiosClient.interceptors.request.use(async (config) => {
   return config;
});

axiosClient.interceptors.response.use();

export default axiosClient;
