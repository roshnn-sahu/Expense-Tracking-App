import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '@/styles';

const Login = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={[styles.container, styles.center]}>
        <Text style={[styles.fontXXL, styles.fw700, styles.textNavy]}>
          Welcome back
        </Text>
        <Text style={[styles.textGrayLight, styles.mt2]}>
          Sign in to your account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
