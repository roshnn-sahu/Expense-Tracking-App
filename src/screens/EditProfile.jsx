import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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
} from 'lucide-react-native';

import styles from '../styles';

const EditProfile = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: 'Alex Rivera',

    email: 'alex@example.com',

    phone: '+91 9876543210',

    currency: 'USD',

    country: 'India',

 
  });

  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

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
        >
          {/* Avatar */}

          <View style={[styles.alignCenter, styles.mb6, styles.mt2]}>
            <View style={[styles.profileAvatar]}>
              <User size={34} color={styles.colors.blue} />
            </View>

            <TouchableOpacity>
              <Text style={[styles.textBlue, styles.fw600, styles.mt2]}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Fields */}

          <ProfileInput
            label="Full Name"
            value={form.name}
            onChangeText={value => updateField('name', value)}
            icon={User}
          />

          <ProfileInput
            label="Email"
            value={form.email}
            keyboardType="email-address"
            onChangeText={value => updateField('email', value)}
            icon={Mail}
          />

          <ProfileInput
            label="Phone Number"
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={value => updateField('phone', value)}
            icon={Phone}
          />

          <ProfileInput
            label="Currency"
            value={form.currency}
            onChangeText={value => updateField('currency', value)}
            icon={Wallet}
          />

          <ProfileInput
            label="Country"
            value={form.country}
            onChangeText={value => updateField('country', value)}
            icon={Globe}
          />


          {/* Save */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryButton, styles.mt6]}
          >
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const ProfileInput = ({ label, icon: Icon, ...props }) => {
  return (
    <View style={styles.mb4}>
      <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
        {label}
      </Text>

      <View
        style={[
          styles.row,
          styles.alignCenter,

          {
            height: 62,

            borderRadius: 20,

            paddingHorizontal: 18,

            borderWidth: 1,

            borderColor: '#E2E8F0',

            backgroundColor: '#FFFFFF',
          },
        ]}
      >
        <Icon size={20} color="#64748B" />

        <TextInput
          placeholder={label}
          placeholderTextColor="#94A3B8"
          style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
          {...props}
        />
      </View>
    </View>
  );
};

export default EditProfile;
