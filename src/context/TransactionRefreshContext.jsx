import React, { createContext, useContext, useState, useCallback } from 'react';

const TransactionRefreshContext = createContext();

export const useTransactionRefresh = () => useContext(TransactionRefreshContext);

export const TransactionRefreshProvider = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshCount(prev => prev + 1);
  }, []);

  return (
    <TransactionRefreshContext.Provider value={{ refreshCount, triggerRefresh }}>
      {children}
    </TransactionRefreshContext.Provider>
  );
};
