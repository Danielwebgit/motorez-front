import axios from 'axios'
import getBaseUrl from '../../config';

const ApiAuth = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

export default ApiAuth;