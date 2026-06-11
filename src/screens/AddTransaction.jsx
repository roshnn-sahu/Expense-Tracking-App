import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  MoreHorizontal,
  Delete,
} from 'lucide-react-native';
import styles from '../styles';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';

const categories = [
  { id: 1, name: 'Food', icon: Coffee, color: styles.colors.amber },
  { id: 2, name: 'Shopping', icon: ShoppingBag, color: styles.colors.purple },
  { id: 3, name: 'Transport', icon: Car, color: styles.colors.blue },
  { id: 4, name: 'Bills', icon: Home, color: styles.colors.red },
  { id: 5, name: 'Health', icon: HeartPulse, color: styles.colors.green },
  { id: 6, name: 'Entertainment', icon: Gamepad2, color: styles.colors.pink },
  { id: 7, name: 'Other', icon: MoreHorizontal, color: styles.colors.slate },
];

const AddTransaction = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleKeyPress = useCallback(
    key => {
      if (key === 'backspace') {
        setAmount(prev => prev.slice(0, -1));
      } else if (key === '.') {
        if (!amount.includes('.')) {
          setAmount(prev => prev + '.');
        }
      } else {
        if (amount.length < 10) {
          setAmount(prev => prev + key);
        }
      }
    },
    [amount],
  );

  const displayAmount = amount || '0';
  const formattedAmount = amount
    ? `$${parseFloat(displayAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '$0.00';

  const handleSave = useCallback(() => {
    // Save transaction logic
  }, []);

  const keyRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace'],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
        <Header
          title="Add Transaction"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        {/* Amount Display */}
        <View style={[styles.py6, styles.alignCenter]}>
          <Text style={styles.amountLabel}>Enter amount</Text>
          <Text style={styles.amountDisplay}>{formattedAmount}</Text>
        </View>

        {/* Category Selection */}
        <View style={styles.px5}>
          <Text style={[styles.dateHeader, styles.mb2]}>Category</Text>
          <View style={[styles.flexRow, styles.flexWrap, styles.gap2]}>
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryPill,
                    isActive && styles.categoryPillActive,
                  ]}
                >
                  <Icon
                    size={18}
                    color={isActive ? cat.color : styles.colors.slate}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <Text
                    style={[
                      styles.categoryPillText,
                      isActive && styles.categoryPillTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.flex1} />

        {/* Keypad */}
        <View style={styles.keypadContainer}>
          {keyRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map(key => {
                if (key === 'backspace') {
                  return (
                    <TouchableOpacity
                      key={key}
                      activeOpacity={0.6}
                      onPress={() => handleKeyPress(key)}
                      style={styles.keyBtn}
                    >
                      <Delete
                        size={24}
                        color={styles.colors.navy}
                        strokeWidth={1.8}
                      />
                    </TouchableOpacity>
                  );
                }
                const isZero = key === '0';
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.6}
                    onPress={() => handleKeyPress(key)}
                    style={isZero ? styles.keyBtnZero : styles.keyBtn}
                  >
                    <Text style={styles.keyBtnText}>{key}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Save Button */}
          <PrimaryButton label="Save Transaction" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTransaction;
