import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  Home,
  TrendingDown,
  List,
  TrendingUp,
  PieChart,
  FileText,
  User,
  Settings,
  LogOut,
} from 'lucide-react-native';
import styles from '@/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logoutUser } from '@/api/auth';
import { useUser } from '@/context/UserContext';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Toast from 'react-native-toast-message';

const sections = [
  {
    title: 'Overview',
    items: [{ title: 'Home', icon: Home, screen: 'Home', tab: true }],
  },
  {
    title: 'Transactions',
    items: [
      {
        title: 'Add Expense',
        icon: TrendingDown,
        screen: 'AddTransaction',
        tab: true,
        params: { type: 'Expense' },
      },
      {
        title: 'Expense List',
        icon: List,
        screen: 'Transactions',
        tab: true,
        params: { initialFilter: 'Expense' },
      },
      {
        title: 'Add Income',
        icon: TrendingUp,
        screen: 'AddTransaction',
        tab: true,
        params: { type: 'Income' },
      },
      {
        title: 'Income List',
        icon: List,
        screen: 'Transactions',
        tab: true,
        params: { initialFilter: 'Income' },
      },
    ],
  },
  {
    title: 'Reports',
    items: [
      { title: 'Analytics', icon: PieChart, screen: 'Analytics', tab: true },
      { title: 'Statement', icon: FileText, screen: 'Statement', tab: true },
    ],
  },
  {
    title: 'Account',
    items: [{ title: 'Settings', icon: Settings, screen: 'Profile' }],
  },
];

const DrawerContent = ({ navigation }) => {
  const { userName, userEmail, clearUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogOut = () => setShowLogoutModal(true);

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      const res = await logoutUser();
      console.log(res, 'LOGOUT');
      Toast.show({
        type: 'info',
        text1: 'Logged out successfully',
        visibilityTime: 3000,
      });
    } catch (err) {
      console.log(err, 'LOGOUT');
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Logout failed, clearing session locally.',
        visibilityTime: 3000,
      });
    }
    clearUser();

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
          <Text style={[styles.textBlack, styles.fw700]}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.drawerUserName}>{userName}</Text>
        <Text style={styles.drawerUserEmail}>{userEmail}</Text>
      </View>

      {/* Menu Items */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.drawerSection}
      >
        {sections.map((section, sIdx) => (
          <View key={section.title}>
            {/* Section Header */}
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: 1,
                paddingHorizontal: 16,
                paddingTop: sIdx === 0 ? 4 : 20,
                paddingBottom: 6,
              }}
            >
              {section.title}
            </Text>

            {section.items.map(item => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={
                    item.screen +
                    (item.params?.type || item.params?.initialFilter || '')
                  }
                  activeOpacity={0.7}
                  style={styles.drawerItem}
                  onPress={() => {
                    if (item.params) {
                      navigation.navigate('Main', {
                        screen: item.screen,
                        params: item.params,
                      });
                    } else if (item.tab) {
                      navigation.navigate('Main', { screen: item.screen });
                    } else {
                      navigation.navigate(item.screen);
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
        ))}
      </ScrollView>

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
