import React, { createContext, useContext, useState, useCallback } from 'react';

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr ',
  CNY: '¥',
  KRW: '₩',
  BRL: 'R$',
  AED: 'د.إ ',
};

export const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', label: 'USD - US Dollar' },
  { code: 'EUR', symbol: '€', label: 'EUR - Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP - British Pound' },
  { code: 'INR', symbol: '₹', label: 'INR - Indian Rupee' },
  { code: 'JPY', symbol: '¥', label: 'JPY - Japanese Yen' },
  { code: 'AUD', symbol: 'A$', label: 'AUD - Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'CAD - Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr ', label: 'CHF - Swiss Franc' },
  { code: 'CNY', symbol: '¥', label: 'CNY - Chinese Yuan' },
  { code: 'KRW', symbol: '₩', label: 'KRW - South Korean Won' },
  { code: 'BRL', symbol: 'R$', label: 'BRL - Brazilian Real' },
  { code: 'AED', symbol: 'د.إ ', label: 'AED - UAE Dirham' },
];

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const formatCurrency = useCallback(
    (amount, showSymbol = true) => {
      const number = Number(amount || 0);
      const formatted = number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return showSymbol ? `${currencySymbol}${formatted}` : formatted;
    },
    [currencySymbol],
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, currencySymbol, formatCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
