import apiClient from '@/config/axios';
import { getCompanyCache, getCompanyCacheRaw, setCompanyCache, clearCompanyCache as clearStorageCache } from '@/utils/storage';

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

export const getCachedCompanyData = async () => {
  return getCompanyCacheRaw();
};

export const clearCompanyCache = async () => {
  await clearStorageCache();
};
