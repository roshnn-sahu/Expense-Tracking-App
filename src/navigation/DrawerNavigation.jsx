import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import DrawerContent from '../components/DrawerContent';
import SettingsScreen from '../screens/Settings';

const Drawer = createDrawerNavigator();

const renderDrawerContent = (props) => <DrawerContent {...props} />;

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(15,23,42,0.2)',
        drawerStyle: {
          width: 270,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Drawer.Screen name="Main" component={BottomNavigation} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
