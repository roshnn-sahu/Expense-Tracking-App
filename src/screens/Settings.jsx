import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Moon,
  Globe,
  Lock,
  Fingerprint,
  Bell,
  ChevronRight,
} from 'lucide-react-native';
import styles from '../styles';
import Header from '../components/Header';

const settingsItems = [
  {
    icon: Moon,
    label: 'Dark Mode',
    color: styles.colors.purple,
    bg: styles.colors.purpleLight,
  },
  {
    icon: Globe,
    label: 'Currency',
    color: styles.colors.blue,
    bg: styles.colors.blueLight,
  },
  {
    icon: Lock,
    label: 'App Lock',
    color: styles.colors.teal,
    bg: styles.colors.tealLight,
  },
  {
    icon: Fingerprint,
    label: 'Biometric Auth',
    color: styles.colors.amber,
    bg: styles.colors.amberLight,
  },
  {
    icon: Bell,
    label: 'Notifications',
    color: styles.colors.pink,
    bg: styles.colors.pinkLight,
  },
];

const Settings = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
        <Header
          title="Settings"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentCompact}
        >
          <View style={styles.cardCompact}>
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={item.label} activeOpacity={0.7}>
                  <View style={styles.menuItem}>
                    <View
                      style={[
                        styles.menuIconWrap,
                        { backgroundColor: item.bg },
                      ]}
                    >
                      <Icon size={20} color={item.color} strokeWidth={1.8} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <ChevronRight
                      size={18}
                      color={styles.colors.grayBorder}
                      strokeWidth={2}
                    />
                  </View>
                  {index < settingsItems.length - 1 && (
                    <View style={styles.menuDivider} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[styles.alignCenter, styles.mt8]}>
            <Text style={[styles.fontSM, styles.textGrayLight, styles.fw500]}>
              Expense Tracker v1.0.0
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
