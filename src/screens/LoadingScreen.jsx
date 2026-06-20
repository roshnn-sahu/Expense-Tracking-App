import React, { useEffect } from 'react';

import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { constant_variables } from '@/config/constant';

import styles from '@/styles';
import { useCompany } from '@/context/CompanyContext';

const LoadingScreen = ({ navigation }) => {
  const { aSite, loading } = useCompany();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigation.replace('Login');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, navigation]);

  const appName = aSite?.display_name || constant_variables.loding_screen_name;

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View
        style={[
          styles.flex1,
          styles.alignCenter,
          styles.justifyCenter,
          styles.px5,
        ]}
      >
        <Animated.View
          entering={FadeIn.duration(500)}
          style={[
            styles.center,
            {
              width: 110,
              height: 110,
              borderRadius: 36,
              backgroundColor: '#2563EB',
            },
          ]}
        >
          {aSite?.logo ? (
            <Text style={[styles.fs42, styles.textWhite, styles.fw800]}>
              {aSite.logo}
            </Text>
          ) : (
            <Text
              style={[
                styles.fs42,
                styles.textWhite,
                styles.fw800,
                styles.textCenter,
              ]}
            >
              ₹
            </Text>
          )}
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(600)}
          style={[styles.fs32, styles.fw800, styles.textNavy, styles.mt5]}
        >
          {appName}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(500).duration(600)}
          style={[styles.fs15, styles.textGray, styles.mt2]}
        >
          Smart Expense Tracking
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(700).duration(600)}
          style={[styles.mt8]}
        >
          <ActivityIndicator size="large" color="#2563EB" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
