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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Mail, Phone, ArrowLeft, ArrowRight } from 'lucide-react-native';
import styles from '@/styles';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { forgotPassword } from '@/api';
import Toast from 'react-native-toast-message';
import Button from '@/components/ui/Button';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!mobile.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await forgotPassword(email, mobile);
      if (response?.status === 1 || response?.success) {
        setSent(true);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong. Please try again.',
          visibilityTime: 4000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Something went wrong. Please try again.',
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
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.iconBtn,
            styles.bgSurfaceAlt,
            { marginBottom: 20, marginLeft: 12 },
          ]}
        >
          <ArrowLeft size={20} color={styles.colors.navy} />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flex1,
            styles.justifyCenter,
            styles.px5,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {!sent ? (
            <>
              {/* Heading */}
              <Text style={[styles.fontXXL, styles.fw700, styles.textNavy]}>
                Forgot Password
              </Text>
              <Text
                style={[
                  styles.fs15,
                  styles.textGrayLight,
                  styles.mt2,
                  styles.mb6,
                ]}
              >
                Enter your email and mobile number to receive new password.
              </Text>

              {/* Error */}
              <ErrorMessage message={error} />

              {/* Email */}
              <View style={styles.mb4}>
                <Text
                  style={[
                    styles.fs13,
                    styles.fw700,
                    styles.textGray,
                    styles.mb2,
                  ]}
                >
                  Email Address
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
                    value={email}
                    onChangeText={v => {
                      setEmail(v);
                      setError('');
                    }}
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

              {/* Mobile */}
              <View style={styles.mb4}>
                <Text
                  style={[
                    styles.fs13,
                    styles.fw700,
                    styles.textGray,
                    styles.mb2,
                  ]}
                >
                  Mobile Number
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
                  <Phone size={20} color="#64748B" />
                  <TextInput
                    value={mobile}
                    onChangeText={v => {
                      setMobile(v);
                      setError('');
                    }}
                    placeholder="9876543210"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    style={[
                      styles.flex1,
                      styles.ml3,
                      styles.textNavy,
                      styles.fw500,
                    ]}
                  />
                </View>
              </View>

              {/* Send Button */}
              <Button
                label="Forgot Password"
                onPress={handleSend}
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                iconRight={<ArrowRight size={20} color="#FFFFFF" />}
              />

              {/* Back to Login */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.alignCenter, styles.mt5]}
              >
                <Text style={[styles.fs15, styles.textPrimary, styles.fw600]}>
                  Back to Sign In
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            /* Success State */
            <View
              style={[
                styles.alignCenter,
                styles.justifyCenter,
                styles.flex1,
                styles.px5,
              ]}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 28,
                  backgroundColor: '#D1FAE5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 36 }}>✓</Text>
              </View>

              <Text
                style={[
                  styles.fs24,
                  styles.fw700,
                  styles.textNavy,
                  styles.textCenter,
                ]}
              >
                Check Your Email
              </Text>
              <Text
                style={[
                  styles.fs15,
                  styles.textGray,
                  styles.mt2,
                  styles.textCenter,
                  { lineHeight: 22 },
                ]}
              >
                We've sent a password reset link to{' '}
                <Text style={[styles.textNavy, styles.fw600]}>{email}</Text>
                {'\n'}and mobile{' '}
                <Text style={[styles.textNavy, styles.fw600]}>{mobile}</Text>
              </Text>

              <Button
                label="Back to Sign In"
                onPress={() => navigation.goBack()}
                variant="primary"
                size="lg"
                style={styles.mt6}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
