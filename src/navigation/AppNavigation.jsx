import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  ArrowUpDown,
  PlusCircle,
  PieChart,
  User,
} from 'lucide-react-native';

import HomeScreen from '../screens/Home';
import Transactions from '../screens/Transactions';
import Analytics from '../screens/Analytics';
import AddTransaction from '../screens/AddTransaction';
import Profile from '../screens/Profile';
import styles from '../styles';

const Tab = createBottomTabNavigator();

const CENTER_ADD_SIZE = 28;

const TabIcon = ({ Icon, color, size, focused }) => (
  <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 1.8} />
);

const AddButton = ({ focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', top: -12 }}>
    <View
      style={{
        width: 58,
        height: 58,
        borderRadius: 20,
        backgroundColor: styles.colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: styles.blue,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      }}
    >
      <PlusCircle size={CENTER_ADD_SIZE} color="#FFFFFF" strokeWidth={2.5} />
    </View>
  </View>
);

// Extracted tab icon render functions to avoid nested component warnings
const renderHomeIcon = ({ color, size, focused }) => (
  <TabIcon Icon={Home} color={color} size={22} focused={focused} />
);

const renderTransactionsIcon = ({ color, size, focused }) => (
  <TabIcon Icon={ArrowUpDown} color={color} size={22} focused={focused} />
);

const renderAnalyticsIcon = ({ color, size, focused }) => (
  <TabIcon Icon={PieChart} color={color} size={22} focused={focused} />
);

const renderProfileIcon = ({ color, size, focused }) => (
  <TabIcon Icon={User} color={color} size={22} focused={focused} />
);

const renderAddButton = ({ focused }) => <AddButton focused={focused} />;

const renderEmptyLabel = () => null;

// Extracted style objects to avoid inline styles
const tabBarStyle = {
  backgroundColor: '#FFFFFF',
  borderTopWidth: 0,
  elevation: 16,
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  paddingTop: 8,
  paddingBottom: 28,
  height: 78,
};

const tabBarLabelStyle = {
  fontSize: 11,
  fontWeight: '600',
  marginTop: 2,
};

const AppNavigation = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle,
      tabBarActiveTintColor: styles.colors.blue,
      tabBarInactiveTintColor: styles.colors.grayLight,
      tabBarLabelStyle,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: renderHomeIcon,
      }}
    />
    <Tab.Screen
      name="Transactions"
      component={Transactions}
      options={{
        tabBarLabel: 'Transactions',
        tabBarIcon: renderTransactionsIcon,
      }}
    />
    <Tab.Screen
      name="AddTransaction"
      component={AddTransaction}
      options={{
        tabBarLabel: renderEmptyLabel,
        tabBarIcon: renderAddButton,
      }}
    />
    <Tab.Screen
      name="Analytics"
      component={Analytics}
      options={{
        tabBarLabel: 'Analytics',
        tabBarIcon: renderAnalyticsIcon,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: renderProfileIcon,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigation;
