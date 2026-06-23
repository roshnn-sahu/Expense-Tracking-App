import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Wallet,
  VenetianMask,
} from 'lucide-react-native';
import styles from '@/styles';
import { useUser } from '@/context/UserContext';
import { useCompany } from '@/context/CompanyContext';
import { updateProfile } from '@/api';
import SearchableDropdown from '@/components/ui/SearchableDropdown';
import PickerDropdown from '@/components/ui/PickerDropdown';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Toast from 'react-native-toast-message';


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

const EditProfile = () => {
  const navigation = useNavigation();
  const { user, updateUser } = useUser();
  const {
    genderOptions,
    countryOptions,
    currencyOptions,
    mobilePrefixOptions,
  } = useCompany();

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
    gender: '',
    country: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Pre-populate form with user data when it loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user?.name || user?.user_name || '',
        email_id: user?.email_id || user?.email || '',
        mobile: user?.mobile || '',
        mobile_prefix: user?.mobile_prefix || '+91',
        currency: user?.currency || 'INR',
        gender: user?.gender || '',
        country: user?.country || '',
      });
    }
  }, [user]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSave = async () => {
    // Validation
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
    if (!form.gender) {
      setError('Please select your gender');
      return;
    }
    if (!form.country) {
      setError('Please select your country');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await updateProfile(form);
      if (response?.status === 1 || response?.success) {
        const updatedUser = response?.data?.aUser || response?.aUser || form;
        await updateUser(updatedUser);
        Toast.show({
          type: 'success',
          text1: 'Profile updated!',
          text2: 'Your changes have been saved successfully.',
          visibilityTime: 3000,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Failed to update profile.',
          visibilityTime: 4000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Failed to update profile.',
        visibilityTime: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyBetween,
              styles.px5,
              styles.py4,
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.iconBtn, styles.bgSurfaceAlt]}
            >
              <ArrowLeft size={20} color={styles.colors.navy} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle]}>Edit Profile</Text>

            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.px5, styles.pb10]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Avatar */}
            <View style={[styles.alignCenter, styles.mb6, styles.mt2]}>
              <View style={[styles.profileAvatar]}>
                <User size={34} color={styles.colors.blue} />
              </View>
            </View>

            {/* Error */}
            <ErrorMessage message={error} />

            {/* Name */}
            <ProfileInput
              label="Full Name"
              value={form.name}
              onChangeText={v => updateField('name', v)}
              icon={User}
              placeholder="Your full name"
            />

            {/* Email */}
            <ProfileInput
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

            {/* Currency */}
            <SearchableDropdown
              label="Currency"
              value={form.currency}
              options={currencyList}
              onSelect={v => updateField('currency', v)}
              icon={Wallet}
              placeholder="Select currency"
            />

            {/* Gender */}
            <PickerDropdown
              label="Gender"
              value={form.gender}
              options={genderList}
              onSelect={v => updateField('gender', v)}
              icon={VenetianMask}
              placeholder="Select gender"
            />

            {/* Country */}
            <SearchableDropdown
              label="Country"
              value={form.country}
              options={countryList}
              onSelect={v => updateField('country', v)}
              icon={Globe}
              placeholder="Select country"
            />

            {/* Save */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSave}
              disabled={saving}
              style={[styles.primaryButton, styles.mt6, saving && { opacity: 0.6 }]}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ProfileInput = ({ label, icon: Icon, ...props }) => (
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

export default EditProfile;
