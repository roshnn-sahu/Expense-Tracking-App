import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

import DrawerNavigation from './DrawerNavigation';
import EditProfile from '../screens/EditProfile';
import styles from '../styles';

const Stack = createNativeStackNavigator();

// A generic placeholder screen for unbuilt features
const PlaceholderScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.safeArea}>
      <View style={[styles.row, styles.alignCenter, styles.px5, styles.py4]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, styles.bgSurfaceAlt]}
        >
          <ArrowLeft size={20} color={styles.colors.navy} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { marginLeft: 16 }]}>{route.name}</Text>
      </View>
      <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
        <Text style={[styles.fs18, styles.textNavy, styles.fw600]}>Coming Soon</Text>
        <Text style={[styles.textGray, styles.mt2]}>This feature is under development.</Text>
      </View>
    </View>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerRoot" component={DrawerNavigation} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Notifications" component={PlaceholderScreen} />
      <Stack.Screen name="Security" component={PlaceholderScreen} />
      <Stack.Screen name="CurrencySettings" component={PlaceholderScreen} />
      <Stack.Screen name="SavingsGoals" component={PlaceholderScreen} />
      <Stack.Screen name="BudgetSettings" component={PlaceholderScreen} />
      <Stack.Screen name="ExportData" component={PlaceholderScreen} />
      <Stack.Screen name="Help" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
