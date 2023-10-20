import Axios from 'axios';
import { API_URL } from 'config';
import { refreshTokens } from 'features/auth';

const axios = Axios.create({ baseURL: API_URL, withCredentials: true });
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      await refreshTokens();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axios;
