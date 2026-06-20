import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getCompanyData,
  getCachedCompanyData,
  clearCompanyCache,
} from '@/api/company';

const CompanyContext = createContext(null);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [aSite, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompany = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      if (forceRefresh) {
        await getCompanyData(true);
      }
  
      const result = await getCachedCompanyData();
      if (result) {
        setCompany(result.data.data);
      } else {
        await getCompanyData();

        const refreshed = await getCachedCompanyData();
        if (refreshed) {
          setCompany(refreshed.data.data);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const refreshCompany = () => fetchCompany(true);
  const clearCache = () => clearCompanyCache();

  return (
    <CompanyContext.Provider
      value={{ aSite, loading, error, refreshCompany, clearCache }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
