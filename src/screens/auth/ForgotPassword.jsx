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
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react-native';
import styles from '@/styles';
import ErrorMessage from '@/components/ui/ErrorMessage';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
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

    setLoading(true);
    setError('');

    // Simulate API call — replace with actual forgot password logic
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
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
          contentContainerStyle={[styles.flex1, styles.justifyCenter, styles.px5]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, styles.bgSurfaceAlt, { marginBottom: 20 }]}
          >
            <ArrowLeft size={20} color={styles.colors.navy} />
          </TouchableOpacity>

          {!sent ? (
            <>
              {/* Heading */}
              <Text style={[styles.fontXXL, styles.fw700, styles.textNavy]}>
                Forgot Password
              </Text>
              <Text style={[styles.fs15, styles.textGrayLight, styles.mt2, styles.mb6]}>
                Enter your email address and we'll send you a reset link.
              </Text>

              {/* Error */}
              <ErrorMessage message={error} />

              {/* Email */}
              <View style={styles.mb4}>
                <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
                  Email Address
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 62,
                  borderRadius: 20,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  backgroundColor: '#FFFFFF',
                }}>
                  <Mail size={20} color="#64748B" />
                  <TextInput
                    value={email}
                    onChangeText={v => { setEmail(v); setError(''); }}
                    placeholder="your@email.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
                  />
                </View>
              </View>

              {/* Send Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSend}
                disabled={loading}
                style={[styles.primaryButton, loading && { opacity: 0.6 }]}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
                    <Text style={styles.primaryButtonText}>Send Reset Link</Text>
                    <ArrowRight size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
                  </View>
                )}
              </TouchableOpacity>

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
            <View style={[styles.alignCenter, styles.justifyCenter, styles.flex1, styles.px5]}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                backgroundColor: '#D1FAE5',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Text style={{ fontSize: 36 }}>✓</Text>
              </View>

              <Text style={[styles.fs24, styles.fw700, styles.textNavy, styles.textCenter]}>
                Check Your Email
              </Text>
              <Text style={[styles.fs15, styles.textGray, styles.mt2, styles.textCenter, { lineHeight: 22 }]}>
                We've sent a password reset link to{' '}
                <Text style={[styles.textNavy, styles.fw600]}>{email}</Text>
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                style={[styles.primaryButton, styles.mt6, styles.wFull]}
              >
                <Text style={styles.primaryButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
