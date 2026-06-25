import apiClient from '@/config/axios';
import { getUserId, setUserId, setUserData, clearAuthSession } from '@/utils/storage';

// Helper: Save user ID and user data to local storage after login/signup
const storeSession = async (userId, aUser) => {
  if (userId) await setUserId(userId);
  if (aUser) await setUserData(aUser);
};

// Helper: Clear all auth session data from local storage on logout
const clearSession = async () => {
  await clearAuthSession();
};

// Log in user with email/mobile and password, stores session on success
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

// Register a new user with full profile payload, stores session on success
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

// Send password reset request for given email and mobile number
export const forgotPassword = async (email, mobile) => {
  const response = await apiClient.post('/login/forgot', {
    email_id: email,
    mobile: mobile,
  }, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Log out user from server and clear local auth session
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/login/logout/', {}, {
      headers: { user_id: await getUserId() },
    });
    return response.data;
  } finally {
    await clearSession();
  }
};

// Update user profile (name, email, mobile, currency, gender, country, etc.)
export const updateProfile = async (payload) => {

  const response = await apiClient.post('/login/update', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      user_id: await getUserId(),
    },
  });
  return response.data;
};
// Change user password by providing old password, new password, and confirmation
export const changePassword = async (payload) => {

  const response = await apiClient.post('/login/change-password', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      user_id: await getUserId(),
    },
  });
  return response.data;
};