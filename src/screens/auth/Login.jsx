import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import styles from '@/styles';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { loginUser } from '@/api';
import { useUser } from '@/context/UserContext';
import Toast from 'react-native-toast-message';

const Login = () => {
  const navigation = useNavigation();
  const { updateUser } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleLogin = async () => {
    if (!form.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!form.password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginUser(form.email, form.password);

      if (response.status === 1) {
        const aUser = response?.data?.aUser || response?.aUser;
        if (aUser) updateUser(aUser);
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'You have been logged in successfully.',
          visibilityTime: 5000,
        });
        navigation.replace('DrawerRoot');
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Login failed. Please try again.',
          visibilityTime: 4000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Login failed. Please try again.',
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flex1,
            styles.justifyCenter,
            styles.px5,
          ]}
          keyboardShouldPersistTaps="handled"
        >
         
          {/* Heading */}
          <Text style={[styles.fontXXL, styles.fw700, styles.textNavy]}>
            Welcome back
          </Text>
          <Text
            style={[styles.fs15, styles.textGrayLight, styles.mt2, styles.mb6]}
          >
            Sign in to your account
          </Text>

          {/* Error */}
          <ErrorMessage message={error} />

          {/* Email */}
          <View style={styles.mb4}>
            <Text
              style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
            >
              Email/Mobile
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 62,
                borderRadius: 20,
                paddingHorizontal: 18,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Mail size={20} color="#64748B" />
              <TextInput
                value={form.email}
                onChangeText={v => updateField('email', v)}
                placeholder="your@email.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                  styles.flex1,
                  styles.ml3,
                  styles.textNavy,
                  styles.fw500,
                ]}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.mb2}>
            <Text
              style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
            >
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 62,
                borderRadius: 20,
                paddingHorizontal: 18,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Lock size={20} color="#64748B" />
              <TextInput
                value={form.password}
                onChangeText={v => updateField('password', v)}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                style={[
                  styles.flex1,
                  styles.ml3,
                  styles.textNavy,
                  styles.fw500,
                ]}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#94A3B8" />
                ) : (
                  <Eye size={20} color="#94A3B8" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginTop: 4, marginBottom: 24 }}
          >
            <Text style={[styles.fs14, styles.textPrimary, styles.fw600]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleLogin}
            disabled={loading}
            style={[styles.primaryButton, loading && { opacity: 0.6 }]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View
            style={[
              styles.row,
              styles.justifyCenter,
              styles.alignCenter,
              styles.mt6,
            ]}
          >
            <Text style={[styles.fs15, styles.textGray]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.fs15, styles.textPrimary, styles.fw700]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Skip Button */}
          <TouchableOpacity
            onPress={() => navigation.replace('DrawerRoot')}
            style={[styles.alignCenter, styles.mt4, styles.pb5]}
          >
            <Text style={[styles.fs14, styles.textGrayLight, styles.fw500]}>
              Skip for now ›
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
