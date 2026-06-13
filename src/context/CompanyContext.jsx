import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCompanyData, clearCompanyCache } from '@/api/company';

const CompanyContext = createContext(null);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompany = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCompanyData(forceRefresh);
      setCompany(result.data);
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
    <CompanyContext.Provider value={{ company, loading, error, refreshCompany, clearCache }}>
      {children}
    </CompanyContext.Provider>
  );
};