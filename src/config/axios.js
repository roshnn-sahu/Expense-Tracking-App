import { Platform } from 'react-native';
import axios from 'axios';
import { API, AUTH_TOKEN } from '@env';

const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'User-Agent': `${Platform.OS === 'ios' ? 'iOS' : 'Android'}`,
  },
});

export default apiClient;
