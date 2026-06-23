import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { CurrencyProvider } from '@/context/CurrencyContext';
import { CompanyProvider } from '@/context/CompanyContext';
import { TransactionRefreshProvider } from '@/context/TransactionRefreshContext';
import { UserProvider } from '@/context/UserContext';
import { toastConfig } from '@/config/toast';
import RootStack from '@/navigation/RootStack';


export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <CurrencyProvider>
            <CompanyProvider>
              <UserProvider>
                <TransactionRefreshProvider>
                  <NavigationContainer>
                    <RootStack />
                  </NavigationContainer>
                </TransactionRefreshProvider>
              </UserProvider>
            </CompanyProvider>
          </CurrencyProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast
        config={toastConfig}
        position="top"
        topOffset={60}
        autoHide={true}
      />
    </>
  );
}
