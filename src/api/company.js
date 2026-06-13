import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const COMPANY_CACHE_KEY = 'company_data';
const CACHE_EXPIRY_KEY = 'company_cache_expiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCompanyData = async (forceRefresh = false) => {
  try {
    if (!forceRefresh) {
      const cachedData = await AsyncStorage.getItem(COMPANY_CACHE_KEY);
      const cacheExpiry = await AsyncStorage.getItem(CACHE_EXPIRY_KEY);

      if (cachedData && cacheExpiry) {
        const expiryTime = parseInt(cacheExpiry, 10);
        if (Date.now() < expiryTime) {
          return { data: JSON.parse(cachedData), fromCache: true };
        }
      }
    }

    const response = await apiClient.get('/company');
    const companyData = response.data;

    await AsyncStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(companyData));
    await AsyncStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION));

    return { data: companyData, fromCache: false };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch company data');
  }
};

export const clearCompanyCache = async () => {
  await AsyncStorage.removeItem(COMPANY_CACHE_KEY);
  await AsyncStorage.removeItem(CACHE_EXPIRY_KEY);
};

export const getCachedCompanyData = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(COMPANY_CACHE_KEY);
    if (cachedData) {
      return { data: JSON.parse(cachedData), fromCache: true };
    }
    return null;
  } catch (error) {
    return null;
  }
};