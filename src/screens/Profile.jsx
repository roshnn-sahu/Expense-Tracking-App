import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  PiggyBank,
  Target,
  Download,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Search,
} from 'lucide-react-native';
import styles from '@/styles';
import Header from '@/components/includes/Header';

const menuSections = [
  {
    title: 'Account',
    items: [
      {
        icon: User,
        label: 'Edit Profile',
        route: 'EditProfile',
        color: styles.colors.blue,
        bg: styles.colors.blueLight,
      },

      {
        icon: Bell,
        label: 'Notifications',
        route: 'Notifications',
        color: styles.colors.purple,
        bg: styles.colors.purpleLight,
      },

      {
        icon: Shield,
        label: 'Security',
        route: 'Security',
        color: styles.colors.teal,
        bg: styles.colors.tealLight,
      },
    ],
  },

  {
    title: 'Finance',
    items: [
      {
        icon: CreditCard,
        label: 'Currency & Region',
        route: 'CurrencySettings',
        color: styles.colors.green,
        bg: styles.colors.greenLight,
      },

      {
        icon: PiggyBank,
        label: 'Savings Goals',
        route: 'SavingsGoals',
        color: styles.colors.amber,
        bg: styles.colors.amberLight,
      },

      {
        icon: Target,
        label: 'Budget Settings',
        route: 'BudgetSettings',
        color: styles.colors.pink,
        bg: styles.colors.pinkLight,
      },
    ],
  },

  {
    title: 'Data',
    items: [
      {
        icon: Download,
        label: 'Export Data',
        route: 'ExportData',
        color: styles.colors.blue,
        bg: styles.colors.blueLight,
      },
    ],
  },

  {
    title: 'Support',
    items: [
      {
        icon: HelpCircle,
        label: 'Help Center',
        route: 'Help',
        color: styles.colors.gray,
        bg: styles.colors.surfaceAlt,
      },

      {
        icon: LogOut,
        label: 'Sign Out',
        route: 'Logout',
        color: styles.colors.red,
        bg: styles.colors.redLight,
      },
    ],
  },
];

const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
           <View
                style={[
                  styles.row,
                  styles.justifyBetween,
                  styles.alignCenter,
                  styles.px5,
                  styles.py4,
                ]}
              >
                <TouchableOpacity
                  style={[styles.iconBtn, styles.bgSurfaceAlt]}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.7}
                >
                  <ChevronLeft
                    size={22}
                    color={styles.colors.navy}
                    strokeWidth={2.2}
                  />
                </TouchableOpacity>
      
                <Text style={styles.headerTitle}>Profile</Text>
      
                <View style={{ width: 40 }} />
              </View>

        <ScrollView
          style={[styles.mt3]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentCompact}
        >
          {/* Avatar Card */}
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <User size={36} color={styles.colors.blue} strokeWidth={2} />
              </View>
              <Text style={styles.profileName}>Alex Rivera</Text>
              <Text style={styles.profileEmail}>alex@example.com</Text>
            </View>

            {/* Quick Stats */}
            <View style={[styles.flexRow, styles.mt1]}>
              <View style={[styles.flex1, styles.alignCenter]}>
                <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>
                  142
                </Text>
                <Text
                  style={[
                    styles.fontSM,
                    styles.textGrayLight,
                    styles.fw500,
                    styles.mt1,
                  ]}
                >
                  Transactions
                </Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={[styles.flex1, styles.alignCenter]}>
                <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>
                  8
                </Text>
                <Text
                  style={[
                    styles.fontSM,
                    styles.textGrayLight,
                    styles.fw500,
                    styles.mt1,
                  ]}
                >
                  Categories
                </Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={[styles.flex1, styles.alignCenter]}>
                <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>
                  3
                </Text>
                <Text
                  style={[
                    styles.fontSM,
                    styles.textGrayLight,
                    styles.fw500,
                    styles.mt1,
                  ]}
                >
                  Budgets
                </Text>
              </View>
            </View>
          </View>

          {/* Menu Sections */}
          {menuSections.map((section, sIdx) => (
            <View
              key={section.title}
              style={[styles.px5, sIdx === 0 && styles.mt1]}
            >
              <Text style={[styles.dateHeader, styles.mt4, styles.mb2]}>
                {section.title}
              </Text>
              <View style={styles.cardCompact}>
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  return (
                    <TouchableOpacity
                      key={item.label}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (item.route === 'Logout') {
                      
                          return;
                        }

                        navigation.navigate(item.route);
                      }}
                    >
                      <View style={styles.menuItem}>
                        <View
                          style={[
                            styles.menuIconWrap,
                            { backgroundColor: item.bg },
                          ]}
                        >
                          <Icon
                            size={20}
                            color={item.color}
                            strokeWidth={1.8}
                          />
                        </View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <ChevronRight
                          size={18}
                          color={styles.colors.grayBorder}
                          strokeWidth={2}
                        />
                      </View>
                      {iIdx < section.items.length - 1 && (
                        <View style={styles.menuDivider} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
