import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const aSite = 'aCompany';
const CACHE_EXPIRY_KEY = 'company_cache_expiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCompanyData = async (forceRefresh = false) => {
  try {
    if (!forceRefresh) {
      const cachedData = await AsyncStorage.getItem(aSite);
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

    await AsyncStorage.setItem(aSite, JSON.stringify(companyData));
    await AsyncStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION));

    return { data: companyData, fromCache: false };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch company data');
  }
};

export const clearCompanyCache = async () => {
  await AsyncStorage.removeItem(aSite);
  await AsyncStorage.removeItem(CACHE_EXPIRY_KEY);
};

export const getCachedCompanyData = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(aSite);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Data should be a company object, not a plain string
      if (typeof parsed === 'object' && parsed !== null) {
        return { data: parsed, fromCache: true };
      }
      // Bad/invalid cached data — clear it so fresh data is fetched
      await AsyncStorage.multiRemove([aSite, CACHE_EXPIRY_KEY]);
    }
    return null;
  } catch (error) {
    return null;
  }
};
