import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  House,
  HeartPulse,
  Wallet,
  Calendar,
  FileText,
  Delete,
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';

import styles from '../styles';

const categories = [
  {
    id: 'food',
    label: 'Food',
    icon: UtensilsCrossed,
    color: '#F59E0B',
    bg: '#FEF3C7',
  },

  {
    id: 'shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    color: '#7C3AED',
    bg: '#F3E8FF',
  },

  {
    id: 'transport',
    label: 'Transport',
    icon: Car,
    color: '#2563EB',
    bg: '#DBEAFE',
  },

  {
    id: 'housing',
    label: 'Housing',
    icon: House,
    color: '#DC2626',
    bg: '#FEE2E2',
  },

  {
    id: 'health',
    label: 'Health',
    icon: HeartPulse,
    color: '#10B981',
    bg: '#D1FAE5',
  },

  {
    id: 'salary',
    label: 'Income',
    icon: Wallet,
    color: '#059669',
    bg: '#DCFCE7',
  },
];

const keypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'delete'],
];

const AddTransactionScreen = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('balance');

  const [amount, setAmount] = useState('0');

  const [note, setNote] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('food');

  const formattedAmount = useMemo(() => {
    const number = parseFloat(amount || '0');

    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [amount]);

  const handleKeyPress = key => {
    if (key === 'delete') {
      if (amount.length === 1) {
        setAmount('0');
        return;
      }

      setAmount(prev => prev.slice(0, -1));
      return;
    }

    if (key === '.') {
      if (amount.includes('.')) {
        return;
      }
    }

    if (amount === '0' && key !== '.') {
      setAmount(key);
      return;
    }

    setAmount(prev => prev + key);
  };

  const handleSave = () => {
    const payload = {
      type,
      amount,
      note,
      category: selectedCategory,
    };

    console.log(payload);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, styles.bgWhite]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={[styles.flex1, styles.bgWhite]}>
        {/* HEADER */}

        <View
          style={[
            styles.row,
            styles.justifyBetween,
            styles.alignCenter,
            styles.px5,
            styles.py4,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, styles.bgSoft]}
          >
            <ArrowLeft size={22} color="#0F172A" />
          </TouchableOpacity>

          <Text style={[styles.fs20, styles.fw700, styles.textNavy]}>
            New Transaction
          </Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px5, styles.pb10]}
        >
          {/* TOGGLE */}

          <View style={[styles.alignCenter, styles.mt2, styles.mb6]}>
            <View
              style={[
                styles.row,
                {
                  backgroundColor: '#F1F5F9',
                  padding: 4,
                  borderRadius: 999,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setType('balance')}
                style={[
                  {
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    borderRadius: 999,
                  },

                  type === 'balance' && {
                    backgroundColor: '#FFFFFF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'balance' ? '#0F172A' : '#64748B',
                    },
                  ]}
                >
                  Balance
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setType('expence')}
                style={[
                  {
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    borderRadius: 999,
                  },

                  type === 'expence' && {
                    backgroundColor: '#FFFFFF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'expence' ? '#0F172A' : '#64748B',
                    },
                  ]}
                >
                  Expence
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AMOUNT */}

          <View style={[styles.alignCenter, styles.mb8]}>
            <Text style={[styles.fs14, styles.textGray, styles.mb2]}>
              Amount
            </Text>

            <Text
              style={[
                styles.fw800,
                {
                  fontSize: 48,
                  color: '#0F172A',
                  letterSpacing: -2,
                },
              ]}
            >
              ${formattedAmount}
            </Text>
          </View>

          {/* CATEGORIES */}

          <View style={[styles.mb8]}>
            <Text
              style={[styles.fs13, styles.fw700, styles.textGray, styles.mb4]}
            >
              CATEGORY
            </Text>

            <View style={[styles.rowWrap, styles.justifyBetween]}>
              {categories.map(item => {
                const Icon = item.icon;

                const active = selectedCategory === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedCategory(item.id)}
                    style={[
                      {
                        width: '31%',
                        paddingVertical: 18,
                        borderRadius: 24,
                        marginBottom: 14,
                        alignItems: 'center',
                        justifyContent: 'center',

                        backgroundColor: active ? item.bg : '#F8FAFC',

                        borderWidth: 1.5,

                        borderColor: active ? item.color : '#EEF2F7',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.center,
                        {
                          width: 46,
                          height: 46,
                          borderRadius: 16,
                          backgroundColor: active ? '#FFFFFF' : '#FFFFFF',
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Icon size={22} color={item.color} />
                    </View>

                    <Text
                      style={[
                        styles.fw600,
                        {
                          color: '#0F172A',
                          fontSize: 13,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* DETAILS */}

          <View style={[styles.mb8]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.row,
                {
                  backgroundColor: '#FFFFFF',

                  borderWidth: 1,

                  borderColor: '#EEF2F7',

                  borderRadius: 18,

                  paddingHorizontal: 16,

                  paddingVertical: 16,

                  marginBottom: 14,
                },
              ]}
            >
              <Calendar size={20} color="#64748B" />

              <Text
                style={[
                  styles.ml3,
                  styles.fw500,
                  {
                    color: '#0F172A',
                  },
                ]}
              >
                Today, Jun 12
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.row,
                {
                  backgroundColor: '#FFFFFF',

                  borderWidth: 1,

                  borderColor: '#EEF2F7',

                  borderRadius: 18,

                  paddingHorizontal: 16,
                },
              ]}
            >
              <FileText size={20} color="#64748B" />

              <TextInput
                placeholder="Add a note..."
                placeholderTextColor="#94A3B8"
                value={note}
                onChangeText={setNote}
                style={[
                  {
                    flex: 1,
                    paddingVertical: 16,
                    marginLeft: 12,
                    color: '#0F172A',
                  },
                ]}
              />
            </View>
          </View>

          {/* KEYPAD */}

          <View>
            {keypad.map((row, index) => (
              <View
                key={index}
                style={[styles.row, styles.justifyBetween, styles.mb3]}
              >
                {row.map(key => (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.7}
                    onPress={() => handleKeyPress(key)}
                    style={[
                      styles.center,

                      {
                        width: '30%',
                        height: 74,
                        borderRadius: 24,
                        backgroundColor: '#F8FAFC',
                      },
                    ]}
                  >
                    {key === 'delete' ? (
                      <Delete size={24} color="#64748B" />
                    ) : (
                      <Text
                        style={[
                          styles.fw700,
                          {
                            fontSize: 30,
                            color: '#0F172A',
                          },
                        ]}
                      >
                        {key}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* SAVE BUTTON */}

        <View
          style={[
            styles.px5,
            styles.py4,
            {
              borderTopWidth: 1,
              borderTopColor: '#F1F5F9',
              backgroundColor: '#FFFFFF',
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSave}
            style={[
              styles.center,
              {
                height: 60,
                borderRadius: 22,
                backgroundColor: '#2563EB',
              },
            ]}
          >
            <Text
              style={[
                styles.fw700,
                {
                  color: '#FFFFFF',
                  fontSize: 16,
                },
              ]}
            >
              Save Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTransactionScreen;
