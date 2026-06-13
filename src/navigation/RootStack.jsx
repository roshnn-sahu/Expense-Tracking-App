import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  ArrowLeft,
} from 'lucide-react-native';

import DrawerNavigation from './DrawerNavigation';

import EditProfile from '@/screens/EditProfile';

import Profile from '@/screens/Profile';

import LoadingScreen from '@/screens/LoadingScreen';

import styles from '@/styles';

const Stack = createNativeStackNavigator();

const PlaceholderScreen = ({ route }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View
          style={[
            styles.row,
            styles.alignCenter,
            styles.justifyBetween,
            styles.px5,
            styles.py4,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={[
              styles.iconBtn,
              styles.bgSurfaceAlt,
            ]}
          >
            <ArrowLeft
              size={20}
              color={styles.colors.navy}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {route.name}
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* BODY */}

        <View
          style={[
            styles.flex1,
            styles.alignCenter,
            styles.justifyCenter,
            styles.px5,
          ]}
        >
          <Text
            style={[
              styles.fs24,
              styles.fw700,
              styles.textNavy,
            ]}
          >
            Coming Soon
          </Text>

          <Text
            style={[
              styles.textGray,
              styles.mt2,
              styles.textCenter,
            ]}
          >
            This feature is under development.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* LOADING */}

      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
      />

      {/* MAIN APP */}

      <Stack.Screen
        name="DrawerRoot"
        component={DrawerNavigation}
      />

      {/* PROFILE */}

      <Stack.Screen
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />

      {/* SETTINGS */}

      <Stack.Screen
        name="Notifications"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="Security"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="CurrencySettings"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="SavingsGoals"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="BudgetSettings"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="ExportData"
        component={PlaceholderScreen}
      />

      <Stack.Screen
        name="Help"
        component={PlaceholderScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStack;