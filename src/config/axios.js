import axios from 'axios';
import { API, AUTH_TOKEN } from '@env';

const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
  },
});

export default apiClient;
