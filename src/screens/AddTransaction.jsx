import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '../utils/date';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  ChevronDown,
  Calendar,
  FileText,
  Check,
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';

import styles from '../styles';
import Button from '../components/ui/Button';

const categories = [
  'Food',
  'Shopping',
  'Transport',
  'Housing',
  'Health',
  'Entertainment',
  'Bills',
  'Travel',
  'Salary',
  'Investment',
];
const PAYMENT_MODES = [
  'Food',
  'Shopping',
  'Transport',
  'Housing',
  'Health',
  'Entertainment',
  'Bills',
  'Travel',
  'Salary',
  'Investment',
];

const AddTransaction = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Food');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const payload = {
      type,
      amount,
      note,
      category,
    };

    console.log(payload);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, styles.bgWhite]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={[styles.flex1]}>
        {/* HEADER */}

        <View
          style={[
            styles.row,
            styles.alignCenter,
            styles.justifyBetween,
            styles.px5,
            styles.py4,
            styles.borderBottom,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, styles.bgSoft]}
          >
            <ArrowLeft size={22} color="#0F172A" />
          </TouchableOpacity>

          <Text style={[styles.headerTitle]}>New Transaction</Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px5, styles.pb14]}
        >
          {/* TYPE TOGGLE */}

          <View style={[styles.alignCenter, styles.mt2, styles.mb8]}>
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
                activeOpacity={0.9}
                onPress={() => setType('expense')}
                style={[
                  {
                    paddingHorizontal: 28,
                    paddingVertical: 12,
                    borderRadius: 999,
                  },

                  type === 'expense' && {
                    backgroundColor: '#FFFFFF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'expense' ? '#0F172A' : '#64748B',
                    },
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setType('income')}
                style={[
                  {
                    paddingHorizontal: 28,
                    paddingVertical: 12,
                    borderRadius: 999,
                  },

                  type === 'income' && {
                    backgroundColor: '#FFFFFF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'income' ? '#0F172A' : '#64748B',
                    },
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AMOUNT */}

          <View style={[styles.alignCenter, styles.mb8]}>
            <Text style={[styles.fs14, styles.textGray, styles.mb2]}>
              Amount
            </Text>

            <View style={[styles.row, styles.alignCenter]}>
              <Text
                style={[
                  styles.fw700,
                  {
                    fontSize: 48,
                    color: '#0F172A',
                    marginRight: 4,
                  },
                ]}
              >
                $
              </Text>

              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#CBD5E1"
                style={[
                  {
                    fontSize: 48,
                    fontWeight: '700',
                    color: '#0F172A',
                    letterSpacing: -2,
                  },
                ]}
              />
            </View>
          </View>

          {/* FORM */}

          <View>
            {/* CATEGORY */}
            <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                CATEGORY
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowCategoryModal(true)}
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyBetween,

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
                <Text style={[styles.fs16, styles.textNavy, styles.fw500]}>
                  {category}
                </Text>

                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* DATE */}
            <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                DATE
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyBetween,
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
                <View style={[styles.row, styles.alignCenter]}>
                  <Calendar size={20} color="#64748B" />

                  <Text style={[styles.ml3, styles.textNavy, styles.fw500]}>
                    {formatDate(date)}
                  </Text>
                </View>

                <ChevronDown size={18} color="#94A3B8" />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                date={date}
                maximumDate={new Date()}
                onConfirm={selectedDate => {
                  setDate(selectedDate);

                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            </View>


             <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                PAYMENT MODE
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowCategoryModal(true)}
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyBetween,

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
                <Text style={[styles.fs16, styles.textNavy, styles.fw500]}>
                  {PAYMENT_MODES}
                </Text>

                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* NOTE */}
            <View style={[styles.mb8]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                NOTE
              </Text>

              <View
                style={[
                  styles.row,
                  {
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#E2E8F0',
                    paddingHorizontal: 18,
                    backgroundColor: '#FFFFFF',
                  },
                ]}
              >
                <FileText
                  size={20}
                  color="#64748B"
                  style={{
                    marginTop: 18,
                  }}
                />

                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Add a note..."
                  multiline
                  placeholderTextColor="#94A3B8"
                  style={[
                    {
                      flex: 1,

                      minHeight: 120,

                      textAlignVertical: 'top',

                      paddingTop: 18,

                      paddingLeft: 12,

                      color: '#0F172A',
                    },
                  ]}
                />
              </View>
            </View>
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
          <Button
            label="Save Transaction"
            onPress={handleSave}
            variant="primary"
            size="lg"
          />
        </View>

        {/* CATEGORY MODAL */}

        <Modal visible={showCategoryModal} transparent animationType="slide">
          <View
            style={[
              styles.flex1,

              {
                backgroundColor: 'rgba(0,0,0,0.2)',

                justifyContent: 'flex-end',
              },
            ]}
          >
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
                Select Category
              </Text>

              {categories.map(item => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => {
                    setCategory(item);

                    setShowCategoryModal(false);
                  }}
                  style={[
                    styles.row,
                    styles.alignCenter,
                    styles.justifyBetween,

                    {
                      paddingVertical: 18,

                      borderBottomWidth: 1,

                      borderBottomColor: '#F1F5F9',
                    },
                  ]}
                >
                  <Text style={[styles.fs16, styles.textNavy]}>{item}</Text>

                  {category === item && <Check size={20} color="#2563EB" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AddTransaction;
