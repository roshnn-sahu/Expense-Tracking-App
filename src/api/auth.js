import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const USER_ID_KEY = 'user_id';
const AUSER_KEY = 'aUser';

const storeSession = async (userId, aUser) => {
  if (userId) await AsyncStorage.setItem(USER_ID_KEY, String(userId));
  if (aUser) await AsyncStorage.setItem(AUSER_KEY, JSON.stringify(aUser));
};

const clearSession = async () => {
  await AsyncStorage.multiRemove([USER_ID_KEY, AUSER_KEY]);
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/login/login',
    { user_id: email, password: password },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  const data = response.data;
  const userId = data?.data?.user_id || data?.user_id;
  const aUser = data?.data?.aUser || data?.aUser;
  if (userId) await storeSession(userId, aUser);

  return data;
};

export const signupUser = async (payload) => {
  const response = await apiClient.post('/login/signup', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const data = response.data;
  const userId = data?.data?.user_id || data?.user_id;
  const aUser = data?.data?.aUser || data?.aUser;
  if (userId) await storeSession(userId, aUser);

  return data;
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post('/login/forgot', { email_id: email });
  return response.data;
};

export const logoutUser = async () => {
  try {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    const response = await apiClient.post('/login/logout/', {}, {
      headers: { user_id: userId || '' },
    });
    return response.data;
  } finally {
    await clearSession();
  }
};
