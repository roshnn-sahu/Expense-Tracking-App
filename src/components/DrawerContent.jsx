import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Home,
  ArrowUpDown,
  PieChart,
  User,
  Settings,
  LogOut,
  FileText,
} from 'lucide-react-native';
import styles from '@/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logoutUser } from '@/api/auth';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Toast from 'react-native-toast-message';

const menus = [
  { title: 'Home', icon: Home, screen: 'Home' },
  { title: 'Transactions', icon: ArrowUpDown, screen: 'Transactions' },
  { title: 'Analytics', icon: PieChart, screen: 'Analytics' },
  { title: 'Statement', icon: FileText, screen: 'Statement' },
  { title: 'Profile', icon: User, screen: 'Profile' },
  { title: 'Settings', icon: Settings, screen: 'Settings' },
];

const DrawerContent = ({ navigation }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogOut = () => setShowLogoutModal(true);

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await logoutUser();
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        visibilityTime: 3000,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Logout failed, clearing session locally.',
        visibilityTime: 3000,
      });
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.flex1}>
      {/* User Info */}
      <View style={[styles.drawerHeader]}>
        <View style={styles.drawerAvatar}>
          <Text style={[styles.textBlack, styles.fw700]}>A</Text>
        </View>
        <Text style={styles.drawerUserName}>Alex Morgan</Text>
        <Text style={styles.drawerUserEmail}>alex@email.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.drawerSection}>
        {menus.map((item, index) => {
          const Icon = item.icon;
          return (
            <View key={item.screen}>
              <TouchableOpacity
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

              {/* Divider between items */}
              {index !== menus.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}
      </View>

      {/* Flexible Spacer pushes footer to the bottom */}
      <View style={styles.flex1} />

      {/* Footer */}
      <TouchableOpacity
        style={[styles.drawerFooter, styles.row]}
        onPress={handleLogOut}
      >
        <LogOut size={20} color={styles.colors.red} />
        <Text style={[styles.textRed, styles.fw700, styles.ml2]}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Confirmation Modal */}
      <ConfirmDialog
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        confirmVariant="danger"
      />
    </SafeAreaView>
  );
};

export default DrawerContent;
