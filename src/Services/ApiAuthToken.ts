import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import baseUrl from '../../config';

const ApiAuthToken = axios.create({
  baseURL: baseUrl(),
});

ApiAuthToken.interceptors.request.use(
  async (config) => {
    const { 'mz-auth-token.access_token': token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiAuthToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { 'mz-auth-token.session_id': mzAuthTokenSessionId } = parseCookies();

      const { data } = await axios.post(`${baseUrl()}/api/v1/auth/user/refresh-token`, { session_id: mzAuthTokenSessionId });

      setCookie(undefined, 'mz-auth-token.access_token', data.access_token, {
        maxAge: 60 * 60 * 12
      });

      setCookie(undefined, 'mz-auth-token.session_id', data.session_id, {
        maxAge: 60 * 60 * 24
      });

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
      return ApiAuthToken(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default ApiAuthToken;
