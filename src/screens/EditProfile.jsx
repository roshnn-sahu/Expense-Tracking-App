import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
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
  ChevronDown,
  Check,
  MapPin,
} from 'lucide-react-native';

import styles from '../styles';
import { useCurrency, CURRENCY_OPTIONS } from '../context/CurrencyContext';

const COUNTRIES = [
  { label: '\uD83C\uDDFA\uD83C\uDDF8  United States', value: 'United States' },
  { label: '\uD83C\uDDEC\uD83C\uDDE7  United Kingdom', value: 'United Kingdom' },
  { label: '\uD83C\uDDEE\uD83C\uDDF3  India', value: 'India' },
  { label: '\uD83C\uDDE8\uD83C\uDDE6  Canada', value: 'Canada' },
  { label: '\uD83C\uDDE6\uD83C\uDDFA  Australia', value: 'Australia' },
  { label: '\uD83C\uDDE9\uD83C\uDDEA  Germany', value: 'Germany' },
  { label: '\uD83C\uDDEB\uD83C\uDDF7  France', value: 'France' },
  { label: '\uD83C\uDDEF\uD83C\uDDF5  Japan', value: 'Japan' },
  { label: '\uD83C\uDDE8\uD83C\uDDF3  China', value: 'China' },
  { label: '\uD83C\uDDE7\uD83C\uDDF7  Brazil', value: 'Brazil' },
  { label: '\uD83C\uDDE6\uD83C\uDDEA  UAE', value: 'UAE' },
  { label: '\uD83C\uDDF8\uD83C\uDDEC  Singapore', value: 'Singapore' },
  { label: '\uD83C\uDDF0\uD83C\uDDF7  South Korea', value: 'South Korea' },
  { label: '\uD83C\uDDFF\uD83C\uDDE6  South Africa', value: 'South Africa' },
  { label: '\uD83C\uDDF3\uD83C\uDDFF  New Zealand', value: 'New Zealand' },
  { label: '\uD83C\uDDEE\uD83C\uDDF1  Israel', value: 'Israel' },
];

const EditProfile = () => {
  const navigation = useNavigation();
  const { currency, setCurrency, currencySymbol } = useCurrency();

  const [form, setForm] = useState({
    name: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '+91 9876543210',
    country: 'India',
  });

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const countryLabel =
    COUNTRIES.find(c => c.value === form.country)?.label || form.country;

  const currentCurrency = CURRENCY_OPTIONS.find(c => c.code === currency);
  const currencyLabel = currentCurrency
    ? `${currentCurrency.symbol}  ${currentCurrency.label}`
    : currency;

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
              <Text style={[styles.textPrimary, styles.fw600, styles.mt2]}>
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

          {/* Currency Dropdown — changes app-wide display currency */}
          <DropdownField
            label="Display Currency"
            value={currencyLabel}
            icon={Wallet}
            onPress={() => setShowCurrencyModal(true)}
          />

          {/* Country Dropdown */}
          <DropdownField
            label="Country"
            value={countryLabel}
            icon={Globe}
            onPress={() => setShowCountryModal(true)}
          />

          {/* Save */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryButton, styles.mt6]}
          >
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Currency Modal */}
        <Modal
          visible={showCurrencyModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCurrencyModal(false)}
        >
          <TouchableOpacity
            style={[styles.flex1, { backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end' }]}
            activeOpacity={1}
            onPress={() => setShowCurrencyModal(false)}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  padding: 24,
                  maxHeight: '70%',
                }}
              >
                <Text
                  style={[styles.fs20, styles.fw700, styles.textNavy, styles.mb6]}
                >
                  Select Currency
                </Text>
                <Text style={[styles.fs13, styles.textGray, styles.fw400, styles.mb4, { marginTop: -16 }]}>
                  Changes the app-wide display currency
                </Text>

                {CURRENCY_OPTIONS.map(item => {
                  const active = currency === item.code;
                  return (
                    <TouchableOpacity
                      key={item.code}
                      activeOpacity={0.8}
                      onPress={() => {
                        setCurrency(item.code);
                        setShowCurrencyModal(false);
                      }}
                      style={[
                        styles.row,
                        styles.alignCenter,
                        styles.justifyBetween,
                        { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
                      ]}
                    >
                      <View style={[styles.row, styles.alignCenter]}>
                        <Text style={[styles.fs18]}>{item.symbol}</Text>
                        <Text style={[styles.fs16, styles.ml3, active && styles.textPrimary, !active && styles.textNavy]}>
                          {item.label}
                        </Text>
                      </View>

                      {active && <Check size={20} color={styles.colors.blue} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        {/* Country Modal */}
        <Modal
          visible={showCountryModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCountryModal(false)}
        >
          <TouchableOpacity
            style={[styles.flex1, { backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end' }]}
            activeOpacity={1}
            onPress={() => setShowCountryModal(false)}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  padding: 24,
                  maxHeight: '70%',
                }}
              >
                <Text
                  style={[styles.fs20, styles.fw700, styles.textNavy, styles.mb6]}
                >
                  Select Country
                </Text>

                {COUNTRIES.map(item => {
                  const active = form.country === item.value;
                  return (
                    <TouchableOpacity
                      key={item.value}
                      activeOpacity={0.8}
                      onPress={() => {
                        updateField('country', item.value);
                        setShowCountryModal(false);
                      }}
                      style={[
                        styles.row,
                        styles.alignCenter,
                        styles.justifyBetween,
                        { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
                      ]}
                    >
                      <View style={[styles.row, styles.alignCenter]}>
                        <MapPin size={20} color={active ? styles.colors.blue : '#64748B'} />
                        <Text style={[styles.fs16, styles.ml3, active && styles.textPrimary, !active && styles.textNavy]}>
                          {item.label}
                        </Text>
                      </View>

                      {active && <Check size={20} color={styles.colors.blue} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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

const DropdownField = ({ label, value, icon: Icon, onPress }) => {
  return (
    <View style={styles.mb4}>
      <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
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

        <Text
          style={[styles.flex1, styles.ml3, styles.textNavy, styles.fw500]}
          numberOfLines={1}
        >
          {value}
        </Text>

        <ChevronDown size={20} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
