import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserData, setUserData as storeUserData } from '@/utils/storage';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch {
        // User not logged in yet
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateUser = useCallback(async (userData) => {
    setUser(userData);
    if (userData) {
      await storeUserData(userData);
    }
  }, []);

  const clearUser = useCallback(async () => {
    setUser(null);
  }, []);

  const userName = user?.name || user?.user_name || 'User';
  const userEmail = user?.email_id || user?.email || '';

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userName,
        userEmail,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
