import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, PieChart, PlusCircle } from 'lucide-react-native';

import Dashboard from './src/screens/Dashboard';
import Analytics from './src/screens/Analytics';
import AddTransaction from './src/screens/AddTransaction';

const Tab = createBottomTabNavigator();

const TabIcon = ({ Icon, color, size }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 0,
              elevation: 10,
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.06,
              shadowRadius: 16,
              paddingTop: 8,
              paddingBottom: 24,
              height: 72,
            },
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              marginTop: 2,
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <TabIcon Icon={LayoutDashboard} color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={Analytics}
            options={{
              tabBarLabel: 'Analytics',
              tabBarIcon: ({ color, size }) => (
                <TabIcon Icon={PieChart} color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{
              tabBarLabel: 'Add',
              tabBarIcon: ({ color, size }) => (
                <TabIcon Icon={PlusCircle} color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
