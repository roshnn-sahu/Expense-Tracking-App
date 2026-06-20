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
import { CURRENCY_OPTIONS } from '@/context/CurrencyContext';
import SearchableDropdown from '@/components/ui/SearchableDropdown';
import PickerDropdown from '@/components/ui/PickerDropdown';
import ErrorMessage from '@/components/ui/ErrorMessage';

const MOBILE_PREFIXES = [
  { label: '+1', value: '+1', emoji: '\uD83C\uDDFA\uD83C\uDDF8' },
  { label: '+44', value: '+44', emoji: '\uD83C\uDDEC\uD83C\uDDE7' },
  { label: '+91', value: '+91', emoji: '\uD83C\uDDEE\uD83C\uDDF3' },
  { label: '+81', value: '+81', emoji: '\uD83C\uDDEF\uD83C\uDDF5' },
  { label: '+86', value: '+86', emoji: '\uD83C\uDDE8\uD83C\uDDF3' },
  { label: '+49', value: '+49', emoji: '\uD83C\uDDE9\uD83C\uDDEA' },
  { label: '+33', value: '+33', emoji: '\uD83C\uDDEB\uD83C\uDDF7' },
  { label: '+61', value: '+61', emoji: '\uD83C\uDDE6\uD83C\uDDFA' },
  { label: '+7', value: '+7', emoji: '\uD83C\uDDF7\uD83C\uDDFA' },
  { label: '+55', value: '+55', emoji: '\uD83C\uDDE7\uD83C\uDDF7' },
  { label: '+82', value: '+82', emoji: '\uD83C\uDDF0\uD83C\uDDF7' },
  { label: '+971', value: '+971', emoji: '\uD83C\uDDE6\uD83C\uDDEA' },
  { label: '+65', value: '+65', emoji: '\uD83C\uDDF8\uD83C\uDDEC' },
  { label: '+39', value: '+39', emoji: '\uD83C\uDDEE\uD83C\uDDF9' },
  { label: '+34', value: '+34', emoji: '\uD83C\uDDEA\uD83C\uDDF8' },
  { label: '+31', value: '+31', emoji: '\uD83C\uDDF3\uD83C\uDDF1' },
  { label: '+46', value: '+46', emoji: '\uD83C\uDDF8\uD83C\uDDEA' },
  { label: '+41', value: '+41', emoji: '\uD83C\uDDE8\uD83C\uDDED' },
  { label: '+27', value: '+27', emoji: '\uD83C\uDDFF\uD83C\uDDE6' },
  { label: '+64', value: '+64', emoji: '\uD83C\uDDF3\uD83C\uDDFF' },
  { label: '+972', value: '+972', emoji: '\uD83C\uDDEE\uD83C\uDDF1' },
  { label: '+852', value: '+852', emoji: '\uD83C\uDDED\uD83C\uDDF0' },
  { label: '+60', value: '+60', emoji: '\uD83C\uDDF2\uD83C\uDDFE' },
  { label: '+63', value: '+63', emoji: '\uD83C\uDDF5\uD83C\uDDED' },
  { label: '+66', value: '+66', emoji: '\uD83C\uDDF9\uD83C\uDDED' },
];

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

const COUNTRIES = [
  { label: 'United States', value: 'United States', emoji: '\uD83C\uDDFA\uD83C\uDDF8' },
  { label: 'United Kingdom', value: 'United Kingdom', emoji: '\uD83C\uDDEC\uD83C\uDDE7' },
  { label: 'India', value: 'India', emoji: '\uD83C\uDDEE\uD83C\uDDF3' },
  { label: 'Canada', value: 'Canada', emoji: '\uD83C\uDDE8\uD83C\uDDE6' },
  { label: 'Australia', value: 'Australia', emoji: '\uD83C\uDDE6\uD83C\uDDFA' },
  { label: 'Germany', value: 'Germany', emoji: '\uD83C\uDDE9\uD83C\uDDEA' },
  { label: 'France', value: 'France', emoji: '\uD83C\uDDEB\uD83C\uDDF7' },
  { label: 'Japan', value: 'Japan', emoji: '\uD83C\uDDEF\uD83C\uDDF5' },
  { label: 'China', value: 'China', emoji: '\uD83C\uDDE8\uD83C\uDDF3' },
  { label: 'Brazil', value: 'Brazil', emoji: '\uD83C\uDDE7\uD83C\uDDF7' },
  { label: 'UAE', value: 'UAE', emoji: '\uD83C\uDDE6\uD83C\uDDEA' },
  { label: 'Singapore', value: 'Singapore', emoji: '\uD83C\uDDF8\uD83C\uDDEC' },
  { label: 'South Korea', value: 'South Korea', emoji: '\uD83C\uDDF0\uD83C\uDDF7' },
  { label: 'South Africa', value: 'South Africa', emoji: '\uD83C\uDDFF\uD83C\uDDE6' },
  { label: 'New Zealand', value: 'New Zealand', emoji: '\uD83C\uDDF3\uD83C\uDDFF' },
  { label: 'Israel', value: 'Israel', emoji: '\uD83C\uDDEE\uD83C\uDDF1' },
  { label: 'Italy', value: 'Italy', emoji: '\uD83C\uDDEE\uD83C\uDDF9' },
  { label: 'Spain', value: 'Spain', emoji: '\uD83C\uDDEA\uD83C\uDDF8' },
  { label: 'Netherlands', value: 'Netherlands', emoji: '\uD83C\uDDF3\uD83C\uDDF1' },
  { label: 'Sweden', value: 'Sweden', emoji: '\uD83C\uDDF8\uD83C\uDDEA' },
  { label: 'Russia', value: 'Russia', emoji: '\uD83C\uDDF7\uD83C\uDDFA' },
  { label: 'Mexico', value: 'Mexico', emoji: '\uD83C\uDDF2\uD83C\uDDFD' },
  { label: 'Indonesia', value: 'Indonesia', emoji: '\uD83C\uDDEE\uD83C\uDDE9' },
  { label: 'Turkey', value: 'Turkey', emoji: '\uD83C\uDDF9\uD83C\uDDF7' },
  { label: 'Switzerland', value: 'Switzerland', emoji: '\uD83C\uDDE8\uD83C\uDDED' },
  { label: 'Hong Kong', value: 'Hong Kong', emoji: '\uD83C\uDDED\uD83C\uDDF0' },
  { label: 'Malaysia', value: 'Malaysia', emoji: '\uD83C\uDDF2\uD83C\uDDFE' },
  { label: 'Philippines', value: 'Philippines', emoji: '\uD83C\uDDF5\uD83C\uDDED' },
  { label: 'Thailand', value: 'Thailand', emoji: '\uD83C\uDDF9\uD83C\uDDED' },
];

const currencyOptions = CURRENCY_OPTIONS.map(c => ({
  label: `${c.symbol}  ${c.label}`,
  value: c.code,
  emoji: c.symbol,
}));

const SignUp = () => {
  const navigation = useNavigation();
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

    // Simulate API call — replace with actual registration logic
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // On success, navigate to main app
      navigation.replace('DrawerRoot');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          <Text style={[styles.fs15, styles.textGrayLight, styles.mt2, styles.mb5]}>
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
          <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
            Mobile Number
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb4]}>
            <View style={{ width: 100, marginRight: 10 }}>
              <SearchableDropdown
                label=""
                value={form.mobile_prefix}
                options={MOBILE_PREFIXES}
                onSelect={v => updateField('mobile_prefix', v)}
                placeholder="+91"
              />
            </View>
            <View style={{ flex: 1 }}>
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
                <Phone size={20} color="#64748B" />
                <TextInput
                  value={form.mobile}
                  onChangeText={v => updateField('mobile', v)}
                  placeholder="9876543210"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
                />
              </View>
            </View>
          </View>

          {/* Currency - Searchable */}
          <SearchableDropdown
            label="Currency"
            value={form.currency}
            options={currencyOptions}
            onSelect={v => updateField('currency', v)}
            icon={Wallet}
            placeholder="Select currency"
          />

          {/* Gender - Dropdown without search */}
          <PickerDropdown
            label="Gender"
            value={form.gender}
            options={GENDER_OPTIONS}
            onSelect={v => updateField('gender', v)}
            icon={VenetianMask}
            placeholder="Select gender"
          />

          {/* Country - Searchable */}
          <SearchableDropdown
            label="Country"
            value={form.country}
            options={COUNTRIES}
            onSelect={v => updateField('country', v)}
            icon={Globe}
            placeholder="Select country"
          />

          {/* Password */}
          <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
            Password
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb4]}>
            <View style={styles.flex1}>
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
                <Lock size={20} color="#64748B" />
                <TextInput
                  value={form.password}
                  onChangeText={v => updateField('password', v)}
                  placeholder="Create a password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
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
          </View>

          {/* Confirm Password */}
          <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
            Confirm Password
          </Text>
          <View style={[styles.row, styles.alignCenter, styles.mb5]}>
            <View style={styles.flex1}>
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
                <Lock size={20} color="#64748B" />
                <TextInput
                  value={form.confirm_password}
                  onChangeText={v => updateField('confirm_password', v)}
                  placeholder="Confirm your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSignUp}
            disabled={loading}
            style={[styles.primaryButton, loading && { opacity: 0.6 }]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={[styles.row, styles.justifyCenter, styles.alignCenter, styles.mt6]}>
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
