import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
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

// Helper: parse API's aGender object -> dropdown options array
const parseGenderOptions = raw => {
  if (!raw || typeof raw !== 'object') return [];
  return Object.values(raw).map(label => ({ label, value: label }));
};

// Helper: parse API's aCountry object -> dropdown options array
const parseCountryOptions = raw => {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw).map(([code, info]) => ({
    label: info.name,
    value: code,
  }));
};

// Helper: parse API's aCurrency object -> dropdown options array
const parseCurrencyOptions = raw => {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw).map(([code, info]) => ({
    label: `${info.symbol || ''}  ${info.name}`,
    value: code,
    emoji: info.symbol || '',
  }));
};

// Helper: parse aCountry into mobile prefix options (prefix + country name)
const parseMobilePrefixOptions = raw => {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw).map(([code, info]) => ({
    label: `${info.prefix}  (${info.name})`,
    value: info.prefix,
  }));
};

export const CompanyProvider = ({ children }) => {
  const [aSite, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse API data into dropdown-friendly arrays
  const genderOptions = useMemo(() => parseGenderOptions(aSite?.aGender), [aSite?.aGender]);
  const countryOptions = useMemo(() => parseCountryOptions(aSite?.aCountry), [aSite?.aCountry]);
  const currencyOptions = useMemo(() => parseCurrencyOptions(aSite?.aCurrency), [aSite?.aCurrency]);
  const mobilePrefixOptions = useMemo(() => parseMobilePrefixOptions(aSite?.aCountry), [aSite?.aCountry]);

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
      value={{
        aSite,
        loading,
        error,
        refreshCompany,
        clearCache,
        genderOptions,
        countryOptions,
        currencyOptions,
        mobilePrefixOptions,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
