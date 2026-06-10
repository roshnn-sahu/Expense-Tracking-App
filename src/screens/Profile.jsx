import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
} from 'lucide-react-native';
import styles from '../styles/style';
import custom, { colors } from '../styles/custom';
import Header from '../components/Header';

const menuSections = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', color: colors.blue, bg: colors.blueLight },
      { icon: Shield, label: 'Privacy & Security', color: colors.purple, bg: colors.purpleLight },
      { icon: CreditCard, label: 'Payment Methods', color: colors.teal, bg: colors.tealLight },
    ],
  },
  {
    title: 'Finance',
    items: [
      { icon: PiggyBank, label: 'Savings Goals', color: colors.amber, bg: colors.amberLight },
      { icon: Target, label: 'Budgets', color: colors.pink, bg: colors.pinkLight },
      { icon: Download, label: 'Export Data', color: colors.green, bg: colors.greenLight },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & FAQ', color: colors.gray, bg: colors.surfaceAlt },
      { icon: LogOut, label: 'Sign Out', color: colors.red, bg: colors.redLight },
    ],
  },
];

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentCompact}
      >
        {/* Avatar Card */}
        <View style={custom.cardCompact}>
          <View style={custom.profileHeader}>
            <View style={custom.profileAvatar}>
              <User size={36} color={colors.blue} strokeWidth={2} />
            </View>
            <Text style={custom.profileName}>Alex Rivera</Text>
            <Text style={custom.profileEmail}>alex@example.com</Text>
          </View>

          {/* Quick Stats */}
          <View style={[styles.flexRow, styles.mt1]}>
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>142</Text>
              <Text style={[styles.fontSM, styles.textGrayLight, styles.fw500, styles.mt1]}>Transactions</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>8</Text>
              <Text style={[styles.fontSM, styles.textGrayLight, styles.fw500, styles.mt1]}>Categories</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text style={[styles.fontLG, styles.fw700, styles.textNavy]}>3</Text>
              <Text style={[styles.fontSM, styles.textGrayLight, styles.fw500, styles.mt1]}>Budgets</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sIdx) => (
          <View key={section.title} style={[styles.px5, sIdx === 0 && styles.mt1]}>
            <Text style={[custom.dateHeader, styles.mt4, styles.mb2]}>{section.title}</Text>
            <View style={custom.cardCompact}>
              {section.items.map((item, iIdx) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity key={item.label} activeOpacity={0.7}>
                    <View style={custom.menuItem}>
                      <View style={[custom.menuIconWrap, { backgroundColor: item.bg }]}>
                        <Icon size={20} color={item.color} strokeWidth={1.8} />
                      </View>
                      <Text style={custom.menuLabel}>{item.label}</Text>
                      <ChevronRight size={18} color={colors.grayBorder} strokeWidth={2} />
                    </View>
                    {iIdx < section.items.length - 1 && <View style={custom.menuDivider} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;
