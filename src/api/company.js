import apiClient from '@/config/axios';
import { getCompanyCache, getCompanyCacheRaw, setCompanyCache, clearCompanyCache as clearStorageCache } from '@/utils/storage';

// Fetch company dropdown data (genders, countries, currencies, mobile prefixes). Uses cached data unless forceRefresh is true.
export const getCompanyData = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = await getCompanyCache();
    if (cached) return { data: cached, fromCache: true };
  }
  const response = await apiClient.get('/company');
  const companyData = response.data;
  await setCompanyCache(companyData);
  return { data: companyData, fromCache: false };
};

// Get raw company data directly from local storage cache
export const getCachedCompanyData = async () => {
  return getCompanyCacheRaw();
};

// Clear cached company data from local storage
export const clearCompanyCache = async () => {
  await clearStorageCache();
};
