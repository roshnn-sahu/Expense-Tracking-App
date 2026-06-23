import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react-native';
import styles from '@/styles';
import { changePassword } from '@/api';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const toggleShow = field => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    // Validation
    if (!form.old_password.trim()) {
      setError('Please enter your current password');
      return;
    }
    if (!form.new_password.trim()) {
      setError('Please enter a new password');
      return;
    }
    if (form.new_password.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (form.new_password !== form.confirm_password) {
      setError('New password and confirm password do not match');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await changePassword({
        password: form.old_password,
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      });

      if (response?.status === 1 || response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Password changed!',
          text2: 'Your password has been updated successfully.',
          visibilityTime: 3000,
        });
        // Delay navigation so Toast is visible before screen transition
        setTimeout(() => navigation.goBack(), 600);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Failed to change password.',
          visibilityTime: 4000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          err.message ||
          'Failed to change password.',
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

            <Text style={[styles.headerTitle]}>Change Password</Text>

            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.px5, styles.pb10]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Lock Icon Header */}
            <View style={[styles.alignCenter, styles.mb6, styles.mt4]}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 28,
                  backgroundColor: '#FEF2F2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  elevation: 6,
                }}
              >
                <Lock size={34} color={styles.colors.red} strokeWidth={1.8} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#64748B',
                  fontWeight: '500',
                  textAlign: 'center',
                  lineHeight: 22,
                }}
              >
                Choose a strong password with at least 6 characters
              </Text>
            </View>

            {/* Error */}
            <ErrorMessage message={error} />

            {/* Old Password */}
            <PasswordInput
              label="Current Password"
              value={form.old_password}
              onChangeText={v => updateField('old_password', v)}
              placeholder="Enter current password"
              isVisible={showPasswords.old_password}
              onToggle={() => toggleShow('old_password')}
            />

            {/* New Password */}
            <PasswordInput
              label="New Password"
              value={form.new_password}
              onChangeText={v => updateField('new_password', v)}
              placeholder="Enter new password"
              isVisible={showPasswords.new_password}
              onToggle={() => toggleShow('new_password')}
            />

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              value={form.confirm_password}
              onChangeText={v => updateField('confirm_password', v)}
              placeholder="Re-enter new password"
              isVisible={showPasswords.confirm_password}
              onToggle={() => toggleShow('confirm_password')}
            />

            {/* Save */}
            <Button
              label="Update Password"
              onPress={handleSave}
              variant="primary"
              size="lg"
              loading={saving}
              disabled={saving}
              style={styles.mt4}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const PasswordInput = ({ label, isVisible, onToggle, ...props }) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={[styles.fs13, styles.fw700, styles.textGray, { marginBottom: 8 }]}
    >
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
      <Lock size={20} color="#64748B" />
      <TextInput
        placeholderTextColor="#94A3B8"
        style={[
          styles.flex1,
          { marginLeft: 12 },
          styles.textNavy,
          styles.fw500,
        ]}
        secureTextEntry={!isVisible}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        {isVisible ? (
          <EyeOff size={20} color="#94A3B8" />
        ) : (
          <Eye size={20} color="#94A3B8" />
        )}
      </TouchableOpacity>
    </View>
  </View>
);

export default ChangePasswordScreen;
