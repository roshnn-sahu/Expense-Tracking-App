import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

/**
 * Store user session data after login/signup.
 */
const USER_ID_KEY = 'user_id'
const AUSER_KEY = 'aUser';

const storeSession = async (userId, token, aUser) => {
  if (userId) await AsyncStorage.setItem(USER_ID_KEY, String(userId));
  if (aUser) await AsyncStorage.setItem(AUSER_KEY, JSON.stringify(aUser));
};

const clearSession = async () => {
  await AsyncStorage.multiRemove([USER_ID_KEY, AUTH_TOKEN_KEY, AUSER_KEY]);
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/login/login', {
    user_id: email,
    password,
  }, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  const data = response.data;

  // Store session data returned by the API
  const userId = data?.data?.user_id || data?.userId
  const aUser = data?.data?.aUser || data?.aUser;
  if (userId) {
    await storeSession(userId, token, aUser);
  }

  return data;
};


export const signupUser = async (payload) => {

  const response = await apiClient.post('/login/signup', payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  const data = response.data;

  // Store session data returned by the API
  const userId = data?.data?.user_id || data?.user_id;
  const token = data?.data?.token || data?.token;
  const aUser = data?.data?.aUser || data?.aUser;
  if (userId) {
    await storeSession(userId, token, aUser);
  }

  return data;
};


export const forgotPassword = async (email) => {
  const response = await apiClient.post('/login/forgot', {
    email_id: email,
  });

  return response.data;
};


export const logoutUser = async () => {
  try {,
    const response = await apiClient.get('/login/logout/');
    return response.data;
  } finally {
    // Always clear session locally regardless of server response
    await clearSession();
  }
};
