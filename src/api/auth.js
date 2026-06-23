import apiClient from '@/config/axios';
import { getUserId, setUserId, setUserData, clearAuthSession } from '@/utils/storage';

const storeSession = async (userId, aUser) => {
  if (userId) await setUserId(userId);
  if (aUser) await setUserData(aUser);
};

const clearSession = async () => {
  await clearAuthSession();
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

export const forgotPassword = async (email, mobile) => {
  const response = await apiClient.post('/login/forgot', {
    email_id: email,
    mobile: mobile,
  }, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await apiClient.post('/login/update', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      user_id: await getUserId(),
    },
  });
  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/login/logout/', {
      headers: { user_id: await getUserId() },
    });
    return response.data;
  } finally {
    await clearSession();
  }
};
