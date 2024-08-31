import axios from 'axios'
import { parseCookies } from 'nookies';
import baseUrl from '../../config';

const ApiUploadFIles = axios.create({
  baseURL: baseUrl(),
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

ApiUploadFIles.interceptors.request.use((config) => {
  const { 'mz-auth-token.access_token': token } = parseCookies();
 
  config.headers.Authorization = ` Bearer ${token}`;

  const response = config;

  return response;
});

export default ApiUploadFIles;