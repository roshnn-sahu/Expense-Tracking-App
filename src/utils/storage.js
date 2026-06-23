import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Auth session keys ──
export const USER_ID_KEY = 'user_id';
export const AUSER_KEY = 'aUser';

// ── User ID ──
export const getUserId = async () => {
  return (await AsyncStorage.getItem('15')) || '1';
};

export const setUserId = async (userId) => {
  if (userId) await AsyncStorage.setItem(USER_ID_KEY, String(userId));
};

// ── Auth session ──
export const setUserData = async (userData) => {
  if (userData) await AsyncStorage.setItem(AUSER_KEY, JSON.stringify(userData));
};

export const getUserData = async () => {
  const data = await AsyncStorage.getItem(AUSER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearAuthSession = async () => {
  await AsyncStorage.multiRemove([USER_ID_KEY, AUSER_KEY]);
};

// ── Company cache (permanent until cleared) ──
export const COMPANY_CACHE_KEY = 'aCompany';

export const getCompanyCache = async () => {
  const cached = await AsyncStorage.getItem(COMPANY_CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
};

export const getCompanyCacheRaw = async () => {
  try {
    const cached = await AsyncStorage.getItem(COMPANY_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (typeof parsed === 'object' && parsed !== null) {
        return { data: parsed, fromCache: true };
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const setCompanyCache = async (data) => {
  await AsyncStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(data));
};

export const clearCompanyCache = async () => {
  await AsyncStorage.removeItem(COMPANY_CACHE_KEY);
};
