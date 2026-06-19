import React, { useState, useMemo } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatTransactionDateTime } from '@/utils/date';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { addTransaction, updateTransaction } from '@/api';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useTransactionRefresh } from '@/context/TransactionRefreshContext';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  ChevronDown,
  Calendar,
  FileText,
  Check,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Heart,
  Tv,
  Receipt,
  Plane,
  DollarSign,
  TrendingUp,
  CreditCard,
  Building,
  Smartphone,
  MoreHorizontal,
  Search,
  User,
  Hash,
  Users,
} from 'lucide-react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '@/styles';
import Button from '@/components/ui/Button';
import { useCurrency } from '@/context/CurrencyContext';

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
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'UPI',
  'Other',
];
const PARTIES = [
  'Self',
  'Family',
  'Friends',
  'Business',
  'Vendor',
  'Client',
  'Supplier',
  'Other',
];

const AddTransaction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currencySymbol } = useCurrency();
  const { triggerRefresh } = useTransactionRefresh();

  const editTx = route.params?.editTransaction;
  const isEditing = !!editTx;

  const parseEditDate = () => {
    if (!editTx) return new Date();
    if (editTx.entry_date) return new Date(editTx.entry_date);
    if (editTx.date) {
      const parsed = new Date(editTx.date);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  };

  const editAmount = editTx
    ? String(Math.abs(parseFloat(editTx.amount) || 0))
    : '';
  const editType = editTx?.type || (editTx?.amount > 0 ? 'Income' : 'Expense');

  const [type, setType] = useState(editType);
  const [amount, setAmount] = useState(editAmount);
  const [name, setName] = useState(editTx?.name || '');
  const [description, setDescription] = useState(editTx?.description || '');
  const [party, setParty] = useState(editTx?.party || '');
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [partySearch, setPartySearch] = useState('');

  const [category, setCategory] = useState(editTx?.category || 'Food');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  const [paymentMode, setPaymentMode] = useState(editTx?.mode || 'Cash');
  const [showPaymentModeModal, setShowPaymentModeModal] = useState(false);
  const [paymentModeSearch, setPaymentModeSearch] = useState('');
  const [transactionId, setTransactionId] = useState(editTx?.mode_no || '');

  const [date, setDate] = useState(parseEditDate());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    return categories.filter(c =>
      c.toLowerCase().includes(categorySearch.toLowerCase()),
    );
  }, [categorySearch]);

  const filteredPaymentModes = useMemo(() => {
    if (!paymentModeSearch.trim()) return PAYMENT_MODES;
    return PAYMENT_MODES.filter(m =>
      m.toLowerCase().includes(paymentModeSearch.toLowerCase()),
    );
  }, [paymentModeSearch]);

  const filteredParties = useMemo(() => {
    if (!partySearch.trim()) return PARTIES;
    return PARTIES.filter(p =>
      p.toLowerCase().includes(partySearch.toLowerCase()),
    );
  }, [partySearch]);

  const resetForm = () => {
    setType('Expense');
    setAmount('');
    setName('');
    setDescription('');
    setParty('');
    setCategory('Food');
    setPaymentMode('Cash');
    setTransactionId('');
    setDate(new Date());
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!amount || parseFloat(amount) <= 0)
      newErrors.amount = 'Valid amount is required';
    if (!category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const dateStr = date.toISOString().split('T')[0];
      const timeStr = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const payload = {
        name: name.trim(),
        type,
        amount: parseFloat(amount),
        category,
        date: dateStr,
        time: timeStr,
        mode: paymentMode,
        ...(party ? { party } : {}),
        ...(paymentMode !== 'Cash' && transactionId.trim()
          ? { mode_no: transactionId.trim() }
          : {}),
        ...(description.trim() ? { description: description.trim() } : {}),
      };

      let response;
      if (isEditing && editTx?.id) {
        response = await updateTransaction({
          ...payload,
          id: editTx.id,
          transaction_id: editTx.transaction_id || editTx.id,
        });
      } else {
        response = await addTransaction(payload);
      }

      triggerRefresh();
      resetForm();
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2:
          response?.message ||
          (isEditing
            ? 'Transaction updated successfully!'
            : 'Transaction saved successfully!'),
        visibilityTime: 5000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message ||
          error?.message ||
          'Failed to save transaction.',
        visibilityTime: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const categoryIconMap = {
    Food: Coffee,
    Shopping: ShoppingBag,
    Transport: Car,
    Housing: Home,
    Health: Heart,
    Entertainment: Tv,
    Bills: Receipt,
    Travel: Plane,
    Salary: DollarSign,
    Investment: TrendingUp,
  };

  const paymentIconMap = {
    Cash: DollarSign,
    'Credit Card': CreditCard,
    'Debit Card': CreditCard,
    'Bank Transfer': Building,
    UPI: Smartphone,
    Other: MoreHorizontal,
  };

  const inputContainerStyle = {
    height: 62,
    borderRadius: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
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
            style={[styles.iconBtn, styles.bgSurfaceAlt]}
          >
            <ArrowLeft size={22} color="#0F172A" />
          </TouchableOpacity>

          <Text style={[styles.headerTitle]}>
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </Text>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px3, styles.pb14]}
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
                onPress={() => setType('Expense')}
                style={[
                  {
                    paddingHorizontal: 28,
                    paddingVertical: 12,
                    borderRadius: 999,
                  },

                  type === 'Expense' && {
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: styles.grayLight,
                    borderShadowColor: '#000',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'Expense' ? '#0F172A' : '#64748B',
                    },
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setType('Income')}
                style={[
                  {
                    paddingHorizontal: 28,
                    paddingVertical: 12,
                    borderRadius: 999,
                  },

                  type === 'Income' && {
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: styles.grayLight,
                    borderShadowColor: '#000',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fw600,

                    {
                      color: type === 'Income' ? '#0F172A' : '#64748B',
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
                {currencySymbol}
              </Text>

              <TextInput
                value={amount}
                onChangeText={value => {
                  setAmount(value);
                  if (errors.amount)
                    setErrors(prev => ({ ...prev, amount: '' }));
                }}
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
            <ErrorMessage message={errors.amount} />
          </View>

          {/* FORM */}
          <View style={[styles.px3]}>
            {/* NAME */}
            <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                NAME
              </Text>

              <View
                style={[styles.row, styles.alignCenter, inputContainerStyle]}
              >
                <User size={20} color="#64748B" />
                <TextInput
                  value={name}
                  onChangeText={value => {
                    setName(value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder="Transaction name..."
                  placeholderTextColor="#94A3B8"
                  style={[
                    {
                      flex: 1,
                      marginLeft: 12,
                      fontSize: 16,
                      color: '#0F172A',
                    },
                  ]}
                />
              </View>
              <ErrorMessage message={errors.name} />
            </View>

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
                  inputContainerStyle,
                ]}
              >
                <Text style={[styles.fs16, styles.textNavy, styles.fw500]}>
                  {category}
                </Text>

                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
              <ErrorMessage message={errors.category} />
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
                  inputContainerStyle,
                ]}
              >
                <View style={[styles.row, styles.alignCenter]}>
                  <Calendar size={20} color="#64748B" />

                  <Text style={[styles.ml3, styles.textNavy, styles.fw500]}>
                    {formatTransactionDateTime(date)}
                  </Text>
                </View>

                <ChevronDown size={18} color="#94A3B8" />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                date={date}
                maximumDate={new Date()}
                onConfirm={selectedDateTime => {
                  setDate(selectedDateTime);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            </View>

            {/* PAYMENT MODE */}
            <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                PAYMENT MODE
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowPaymentModeModal(true)}
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyBetween,
                  inputContainerStyle,
                ]}
              >
                <Text style={[styles.fs16, styles.textNavy, styles.fw500]}>
                  {paymentMode}
                </Text>

                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* TRANSACTION ID - shown when payment mode is not Cash */}
            {paymentMode !== 'Cash' && (
              <View style={[styles.mb4]}>
                <Text
                  style={[
                    styles.fs13,
                    styles.fw700,
                    styles.textGray,
                    styles.mb2,
                  ]}
                >
                  TRANSACTION ID
                </Text>

                <View
                  style={[styles.row, styles.alignCenter, inputContainerStyle]}
                >
                  <Hash size={20} color="#64748B" />
                  <TextInput
                    value={transactionId}
                    onChangeText={value => {
                      setTransactionId(value);
                      if (errors.transactionId)
                        setErrors(prev => ({ ...prev, transactionId: '' }));
                    }}
                    placeholder="Enter transaction ID..."
                    placeholderTextColor="#94A3B8"
                    style={[
                      {
                        flex: 1,
                        marginLeft: 12,
                        fontSize: 16,
                        color: '#0F172A',
                      },
                    ]}
                  />
                </View>
                <ErrorMessage message={errors.transactionId} />
              </View>
            )}

            {/* PARTY */}
            <View style={[styles.mb4]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                PARTY
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowPartyModal(true)}
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyBetween,
                  inputContainerStyle,
                ]}
              >
                <Text
                  style={[
                    styles.fs16,
                    styles.fw500,
                    party ? styles.textNavy : { color: '#94A3B8' },
                  ]}
                >
                  {party || 'Select party...'}
                </Text>

                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* DESCRIPTION */}
            <View style={[styles.mb8]}>
              <Text
                style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}
              >
                DESCRIPTION
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
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Add a description..."
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
            label={
              saving
                ? isEditing
                  ? 'Updating...'
                  : 'Saving...'
                : isEditing
                ? 'Update Transaction'
                : 'Save Transaction'
            }
            onPress={handleSave}
            variant="primary"
            size="lg"
            disabled={saving}
          />
        </View>

        {/* CATEGORY MODAL */}

        <Modal
          visible={showCategoryModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowCategoryModal(false);
            setCategorySearch('');
          }}
        >
          <TouchableOpacity
            style={[
              styles.flex1,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
                justifyContent: 'flex-end',
              },
            ]}
            activeOpacity={1}
            onPress={() => {
              setShowCategoryModal(false);
              setCategorySearch('');
            }}
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
                  style={[
                    styles.fs20,
                    styles.fw700,
                    styles.textNavy,
                    styles.mb4,
                  ]}
                >
                  Select Category
                </Text>

                {/* Search Input */}
                <View
                  style={[
                    styles.row,
                    styles.alignCenter,
                    {
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 14,
                      height: 50,
                      marginBottom: 16,
                    },
                  ]}
                >
                  <Search size={18} color="#94A3B8" />
                  <TextInput
                    value={categorySearch}
                    onChangeText={setCategorySearch}
                    placeholder="Search categories..."
                    placeholderTextColor="#94A3B8"
                    autoCorrect={false}
                    style={[
                      {
                        flex: 1,
                        marginLeft: 10,
                        fontSize: 15,
                        color: '#0F172A',
                      },
                    ]}
                  />
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {filteredCategories.length === 0 && (
                    <Text
                      style={[
                        styles.fs14,
                        { color: '#94A3B8', textAlign: 'center', padding: 20 },
                      ]}
                    >
                      No categories found
                    </Text>
                  )}

                  {filteredCategories.map(item => {
                    const Icon = categoryIconMap[item] || FileText;

                    return (
                      <TouchableOpacity
                        key={item}
                        activeOpacity={0.8}
                        onPress={() => {
                          setCategory(item);
                          setShowCategoryModal(false);
                          setCategorySearch('');
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
                        <View style={[styles.row, styles.alignCenter]}>
                          <Icon size={20} color="#64748B" />
                          <Text
                            style={[styles.fs16, styles.textNavy, styles.ml3]}
                          >
                            {item}
                          </Text>
                        </View>

                        {category === item && (
                          <Check size={20} color="#2563EB" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        {/* PAYMENT MODE MODAL */}

        <Modal
          visible={showPaymentModeModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowPaymentModeModal(false);
            setPaymentModeSearch('');
          }}
        >
          <TouchableOpacity
            style={[
              styles.flex1,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
                justifyContent: 'flex-end',
              },
            ]}
            activeOpacity={1}
            onPress={() => {
              setShowPaymentModeModal(false);
              setPaymentModeSearch('');
            }}
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
                  style={[
                    styles.fs20,
                    styles.fw700,
                    styles.textNavy,
                    styles.mb4,
                  ]}
                >
                  Select Payment Mode
                </Text>

                {/* Search Input */}
                <View
                  style={[
                    styles.row,
                    styles.alignCenter,
                    {
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 14,
                      height: 50,
                      marginBottom: 16,
                    },
                  ]}
                >
                  <Search size={18} color="#94A3B8" />
                  <TextInput
                    value={paymentModeSearch}
                    onChangeText={setPaymentModeSearch}
                    placeholder="Search payment modes..."
                    placeholderTextColor="#94A3B8"
                    autoCorrect={false}
                    style={[
                      {
                        flex: 1,
                        marginLeft: 10,
                        fontSize: 15,
                        color: '#0F172A',
                      },
                    ]}
                  />
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {filteredPaymentModes.length === 0 && (
                    <Text
                      style={[
                        styles.fs14,
                        { color: '#94A3B8', textAlign: 'center', padding: 20 },
                      ]}
                    >
                      No payment modes found
                    </Text>
                  )}

                  {filteredPaymentModes.map(item => {
                    const Icon = paymentIconMap[item] || CreditCard;

                    return (
                      <TouchableOpacity
                        key={item}
                        activeOpacity={0.8}
                        onPress={() => {
                          setPaymentMode(item);
                          setShowPaymentModeModal(false);
                          setPaymentModeSearch('');
                          if (item === 'Cash') {
                            setTransactionId('');
                          }
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
                        <View style={[styles.row, styles.alignCenter]}>
                          <Icon size={20} color="#64748B" />
                          <Text
                            style={[styles.fs16, styles.textNavy, styles.ml3]}
                          >
                            {item}
                          </Text>
                        </View>

                        {paymentMode === item && (
                          <Check size={20} color="#2563EB" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        {/* PARTY MODAL */}

        <Modal
          visible={showPartyModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowPartyModal(false);
            setPartySearch('');
          }}
        >
          <TouchableOpacity
            style={[
              styles.flex1,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
                justifyContent: 'flex-end',
              },
            ]}
            activeOpacity={1}
            onPress={() => {
              setShowPartyModal(false);
              setPartySearch('');
            }}
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
                  style={[
                    styles.fs20,
                    styles.fw700,
                    styles.textNavy,
                    styles.mb4,
                  ]}
                >
                  Select Party
                </Text>

                {/* Search Input */}
                <View
                  style={[
                    styles.row,
                    styles.alignCenter,
                    {
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 14,
                      height: 50,
                      marginBottom: 16,
                    },
                  ]}
                >
                  <Search size={18} color="#94A3B8" />
                  <TextInput
                    value={partySearch}
                    onChangeText={setPartySearch}
                    placeholder="Search parties..."
                    placeholderTextColor="#94A3B8"
                    autoCorrect={false}
                    style={[
                      {
                        flex: 1,
                        marginLeft: 10,
                        fontSize: 15,
                        color: '#0F172A',
                      },
                    ]}
                  />
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {filteredParties.length === 0 && (
                    <Text
                      style={[
                        styles.fs14,
                        { color: '#94A3B8', textAlign: 'center', padding: 20 },
                      ]}
                    >
                      No parties found
                    </Text>
                  )}

                  {filteredParties.map(item => (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.8}
                      onPress={() => {
                        setParty(item);
                        setShowPartyModal(false);
                        setPartySearch('');
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
                      <View style={[styles.row, styles.alignCenter]}>
                        <Users size={20} color="#64748B" />
                        <Text
                          style={[styles.fs16, styles.textNavy, styles.ml3]}
                        >
                          {item}
                        </Text>
                      </View>

                      {party === item && <Check size={20} color="#2563EB" />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AddTransaction;
