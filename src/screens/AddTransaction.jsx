import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  MoreHorizontal,
  Delete,
  ArrowLeft,
} from 'lucide-react-native';
import custom from '../styles/custom';
import style from '../styles/style';

const categories = [
  { id: 1, name: 'Food', icon: Coffee, color: '#F59E0B' },
  { id: 2, name: 'Shopping', icon: ShoppingBag, color: '#8B5CF6' },
  { id: 3, name: 'Transport', icon: Car, color: '#3B82F6' },
  { id: 4, name: 'Bills', icon: Home, color: '#EF4444' },
  { id: 5, name: 'Health', icon: HeartPulse, color: '#22C55E' },
  { id: 6, name: 'Entertainment', icon: Gamepad2, color: '#EC4899' },
  { id: 7, name: 'Other', icon: MoreHorizontal, color: '#6B7280' },
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
        // Limit to 10 characters
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
    <View style={custom.safeArea}>
      {/* Header */}
      <View style={[custom.headerRow, { paddingTop: 16 }]}>
        <TouchableOpacity activeOpacity={0.7}>
          <ArrowLeft size={24} color="#0F172A" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[custom.headerText, { fontSize: 20 }]}>
          Add Transaction
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Amount Display */}
      <View
        style={{ paddingHorizontal: 24, paddingTop: 12, alignItems: 'center' }}
      >
        <Text style={custom.numberLabel}>Enter amount</Text>
        <Text style={custom.numberDisplay}>{formattedAmount}</Text>
      </View>

      {/* Category Selection */}
      <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
        <Text style={[custom.sectionTitle, { marginBottom: 12 }]}>
          Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 4 }}
        >
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  custom.categoryPill,
                  style.row,
                  { paddingVertical: 12, paddingHorizontal: 18 },
                  isActive && custom.categoryPillActive,
                ]}
              >
                <Icon
                  size={18}
                  color={isActive ? cat.color : '#6B7280'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    custom.categoryPillText,
                    isActive && { color: cat.color, fontWeight: '600' },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Number Keypad */}
      <View style={custom.numberKeypad}>
        {keyRows.map((row, rowIndex) => (
          <View key={rowIndex} style={custom.numberKeyRow}>
            {row.map(key => {
              if (key === 'backspace') {
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.6}
                    onPress={() => handleKeyPress(key)}
                    style={custom.numberKey}
                  >
                    <Delete size={24} color="#0F172A" strokeWidth={1.8} />
                  </TouchableOpacity>
                );
              }
              const isZero = key === '0';
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.6}
                  onPress={() => handleKeyPress(key)}
                  style={isZero ? custom.numberKeyZero : custom.numberKey}
                >
                  <Text style={custom.numberKeyText}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Save Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSave}
          style={[custom.primaryButton, { marginTop: 16 }]}
        >
          <Text
            style={[custom.bodyText, custom.textWhite, { fontWeight: '700' }]}
          >
            Save Transaction
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransaction;
