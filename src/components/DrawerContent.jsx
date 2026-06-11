import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Home,
  ArrowUpDown,
  PieChart,
  User,
  Settings,
  LogOut,
} from 'lucide-react-native';
import styles from '../styles/style';
import { SafeAreaView } from 'react-native-safe-area-context';

const menus = [
  { title: 'Home', icon: Home, screen: 'Home' },
  { title: 'Transactions', icon: ArrowUpDown, screen: 'Transactions' },
  { title: 'Analytics', icon: PieChart, screen: 'Analytics' },
  { title: 'Profile', icon: User, screen: 'Profile' },
  { title: 'Settings', icon: Settings, screen: 'Settings' },
];

const DrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView >

        {/* User Info */}
        <View style={styles.drawerHeader}>
          <View style={styles.drawerAvatar}>
            <Text style={[styles.textBlack, styles.fw700]}>A</Text>
          </View>
          <Text style={styles.drawerUserName}>Alex Morgan</Text>
          <Text style={styles.drawerUserEmail}>alex@email.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.drawerSection}>
          {menus.map(item => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.screen}
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => {
                  if (item.screen === 'Settings') {
                    navigation.navigate('Settings');
                  } else {
                    navigation.navigate('Main', { screen: item.screen });
                  }
                  navigation.closeDrawer();
                }}
              >
                <View style={styles.drawerItemIcon}>
                  <Icon size={20} color={styles.colors.blue} />
                </View>
                <Text style={styles.drawerItemLabel}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.flex1} />
        <TouchableOpacity style={[styles.drawerFooter, styles.row]}>
          <LogOut size={20} color={styles.colors.red} />
          <Text style={[styles.textRed, styles.fw700, styles.ml2]}>Logout</Text>
        </TouchableOpacity>
   
      </SafeAreaView>
  
  );
};

export default DrawerContent;
