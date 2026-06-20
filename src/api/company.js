import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const aSite = 'aCompany';
const CACHE_EXPIRY_KEY = 'company_cache_expiry';
const CACHE_DURATION = 5 * 60 * 1000;

const getFromCache = async () => {
  const [cached, expiry] = await Promise.all([
    AsyncStorage.getItem(aSite),
    AsyncStorage.getItem(CACHE_EXPIRY_KEY),
  ]);
  if (cached && expiry && Date.now() < parseInt(expiry, 10)) {
    return JSON.parse(cached);
  }
  return null;
};

const saveToCache = async (data) => {
  await Promise.all([
    AsyncStorage.setItem(aSite, JSON.stringify(data)),
    AsyncStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION)),
  ]);
};

export const getCompanyData = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = await getFromCache();
    if (cached) return { data: cached, fromCache: true };
  }

  const response = await apiClient.get('/company');
  const companyData = response.data;
  await saveToCache(companyData);
  return { data: companyData, fromCache: false };
};

export const getCachedCompanyData = async () => {
  try {
    const cached = await AsyncStorage.getItem(aSite);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (typeof parsed === 'object' && parsed !== null) {
        return { data: parsed, fromCache: true };
      }
      await AsyncStorage.multiRemove([aSite, CACHE_EXPIRY_KEY]);
    }
    return null;
  } catch {
    return null;
  }
};

export const clearCompanyCache = async () => {
  await AsyncStorage.multiRemove([aSite, CACHE_EXPIRY_KEY]);
};
