import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import styles from '../styles/style';
import custom, { colors } from '../styles/custom';
import Header from '../components/Header';

const categories = [
  { id: 1, name: 'Food', icon: Coffee, color: colors.amber },
  { id: 2, name: 'Shopping', icon: ShoppingBag, color: colors.purple },
  { id: 3, name: 'Transport', icon: Car, color: colors.blue },
  { id: 4, name: 'Bills', icon: Home, color: colors.red },
  { id: 5, name: 'Health', icon: HeartPulse, color: colors.green },
  { id: 6, name: 'Entertainment', icon: Gamepad2, color: colors.pink },
  { id: 7, name: 'Other', icon: MoreHorizontal, color: colors.gray },
];

const AddTransaction = () => {
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
  }, [amount, selectedCategory]);

  const keyRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace'],
  ];

  return (
    <View style={styles.safeArea}>
      <Header title="Add Transaction" />

      {/* Amount Display */}
      <View style={[styles.py6, styles.alignCenter]}>
        <Text style={custom.amountLabel}>Enter amount</Text>
        <Text style={custom.amountDisplay}>{formattedAmount}</Text>
      </View>

      {/* Category Selection */}
      <View style={styles.px5}>
        <Text style={[custom.dateHeader, styles.mb2]}>Category</Text>
        <View style={[styles.flexRow, styles.flexWrap, styles.gap2]}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat.id)}
                style={[custom.categoryPill, isActive && custom.categoryPillActive]}
              >
                <Icon
                  size={18}
                  color={isActive ? cat.color : colors.slate}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <Text style={[custom.categoryPillText, isActive && custom.categoryPillTextActive]}>
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
      <View style={custom.keypadContainer}>
        {keyRows.map((row, rowIndex) => (
          <View key={rowIndex} style={custom.keypadRow}>
            {row.map(key => {
              if (key === 'backspace') {
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.6}
                    onPress={() => handleKeyPress(key)}
                    style={custom.keyBtn}
                  >
                    <Delete size={24} color={colors.navy} strokeWidth={1.8} />
                  </TouchableOpacity>
                );
              }
              const isZero = key === '0';
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.6}
                  onPress={() => handleKeyPress(key)}
                  style={isZero ? custom.keyBtnZero : custom.keyBtn}
                >
                  <Text style={custom.keyBtnText}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Save Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSave}
          style={[custom.primaryButton, styles.mt3]}
        >
          <Text style={custom.primaryButtonText}>Save Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransaction;
