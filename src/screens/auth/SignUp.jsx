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
import {
  User,
  Mail,
  Phone,
  Globe,
  Wallet,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  VenetianMask,
} from 'lucide-react-native';
import styles from '@/styles';
import SearchableDropdown from '@/components/ui/SearchableDropdown';
import PickerDropdown from '@/components/ui/PickerDropdown';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useCompany } from '@/context/CompanyContext';
import { useUser } from '@/context/UserContext';
import { signupUser } from '@/api';
import Toast from 'react-native-toast-message';
import Button from '@/components/ui/Button';

// Fallback defaults when API data is not yet loaded
const FALLBACK_GENDER = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const FALLBACK_PREFIXES = [
  { label: '+1  (United States)', value: '+1' },
  { label: '+44  (United Kingdom)', value: '+44' },
  { label: '+91  (India)', value: '+91' },
];

const SignUp = () => {
  const navigation = useNavigation();
  const { updateUser } = useUser();
  const {
    genderOptions,
    countryOptions,
    currencyOptions,
    mobilePrefixOptions,
  } = useCompany();

  // Use API data when available, fall back to hardcoded defaults
  const genderList = genderOptions.length > 0 ? genderOptions : FALLBACK_GENDER;
  const prefixList =
    mobilePrefixOptions.length > 0 ? mobilePrefixOptions : FALLBACK_PREFIXES;
  const currencyList = currencyOptions.length > 0 ? currencyOptions : [];
  const countryList = countryOptions.length > 0 ? countryOptions : [];
  const [form, setForm] = useState({
    name: '',
    email_id: '',
    mobile: '',
    mobile_prefix: '+91',
    currency: 'INR',
    password: '',
    confirm_password: '',
    gender: '',
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSignUp = async () => {
    // Validate all fields
    if (!form.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!form.email_id.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email_id)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!form.mobile.trim()) {
      setError('Please enter your mobile number');
      return;
    }
    if (!form.password) {
      setError('Please enter a password');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (!form.gender) {
      setError('Please select your gender');
      return;
    }
    if (!form.country) {
      setError('Please select your country');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Strip confirm_password before sending to API
      const { confirm_password, ...payload } = form;
      const response = await signupUser(payload);
      if (response?.status === 1 || response?.success) {
        const aUser = response?.data?.aUser || response?.aUser;
        if (aUser) updateUser(aUser);
        Toast.show({
          type: 'success',
          text1: 'Account created!',
          text2: 'Welcome to Expense Manager.',
          visibilityTime: 3000,
        });
        navigation.replace('DrawerRoot');
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Registration failed. Please try again.',
          visibilityTime: 5000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || err.message || 'Registration failed. Please try again.',
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
          contentContainerStyle={[styles.px5, styles.pb10]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <View style={[styles.row, styles.alignCenter, styles.py4]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.iconBtn, styles.bgSurfaceAlt]}
            >
              <ArrowLeft size={20} color={styles.colors.navy} />
            </TouchableOpacity>
          </View>

          {/* Heading */}
          <Text style={[styles.fontXXL, styles.fw700, styles.textNavy]}>
            Create Account
          </Text>
          <Text
            style={[styles.fs15, styles.textGrayLight, styles.mt2, styles.mb5]}
          >
            Fill in your details to get started
          </Text>

          {/* Error */}
          <ErrorMessage message={error} />

          {/* Name */}
          <AuthInput
            label="Name"
            value={form.name}
            onChangeText={v => updateField('name', v)}
            icon={User}
            placeholder="Your full name"
          />

          {/* Email */}
          <AuthInput
            label="Email Address"
            value={form.email_id}
            onChangeText={v => updateField('email_id', v)}
            icon={Mail}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Mobile with Prefix */}
          <Text
            style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
          >
            Mobile Number
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb4]}>
            <View style={{ width: 140, marginRight: 10 }}>
              <SearchableDropdown
                label=""
                value={form.mobile_prefix}
                options={prefixList}
                onSelect={v => updateField('mobile_prefix', v)}
                placeholder="+91"
              />
            </View>
            <View style={{ flex: 1 }}>
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
                  value={form.mobile}
                  onChangeText={v => updateField('mobile', v)}
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
          </View>

          {/* Currency - Searchable */}
          <SearchableDropdown
            label="Currency"
            value={form.currency}
            options={currencyList}
            onSelect={v => updateField('currency', v)}
            icon={Wallet}
            placeholder="Select currency"
          />

          {/* Gender - Dropdown without search */}
          <PickerDropdown
            label="Gender"
            value={form.gender}
            options={genderList}
            onSelect={v => updateField('gender', v)}
            icon={VenetianMask}
            placeholder="Select gender"
          />

          {/* Country - Searchable */}
          <SearchableDropdown
            label="Country"
            value={form.country}
            options={countryList}
            onSelect={v => updateField('country', v)}
            icon={Globe}
            placeholder="Select country"
          />

          {/* Password */}
          <Text
            style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
          >
            Password
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb4]}>
            <View style={styles.flex1}>
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
                  placeholder="Create a password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  style={[
                    styles.flex1,
                    styles.ml3,
                    styles.textNavy,
                    styles.fw500,
                  ]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#94A3B8" />
                  ) : (
                    <Eye size={20} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirm Password */}
          <Text
            style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
          >
            Confirm Password
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb5]}>
            <View style={styles.flex1}>
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
                  value={form.confirm_password}
                  onChangeText={v => updateField('confirm_password', v)}
                  placeholder="Confirm your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  style={[
                    styles.flex1,
                    styles.ml3,
                    styles.textNavy,
                    styles.fw500,
                  ]}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#94A3B8" />
                  ) : (
                    <Eye size={20} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sign Up Button */}
          <Button
            label="Create Account"
            onPress={handleSignUp}
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
          />

          {/* Login Link */}
          <View
            style={[
              styles.row,
              styles.justifyCenter,
              styles.alignCenter,
              styles.mt6,
            ]}
          >
            <Text style={[styles.fs15, styles.textGray]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.fs15, styles.textPrimary, styles.fw700]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const AuthInput = ({ label, icon: Icon, ...props }) => (
  <View style={styles.mb4}>
    <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
      {label}
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
      <Icon size={20} color="#64748B" />
      <TextInput
        placeholderTextColor="#94A3B8"
        style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
        {...props}
      />
    </View>
  </View>
);

export default SignUp;
