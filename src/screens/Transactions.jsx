import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  Wallet,
} from 'lucide-react-native';
import custom, { colors } from '../styles/custom';
import Header from '../components/Header';

const allTransactions = [
  { id: 1, name: 'Morning Coffee', category: 'Food', amount: -5.5, date: 'Today', dateGroup: 'Today', icon: Coffee, color: colors.amber },
  { id: 2, name: 'Grocery Store', category: 'Shopping', amount: -82.3, date: 'Yesterday', dateGroup: 'Yesterday', icon: ShoppingBag, color: colors.purple },
  { id: 3, name: 'Uber Ride', category: 'Transport', amount: -24.0, date: 'Yesterday', dateGroup: 'Yesterday', icon: Car, color: colors.blue },
  { id: 4, name: 'Electric Bill', category: 'Bills', amount: -145.0, date: '2 days ago', dateGroup: 'This Week', icon: Home, color: colors.red },
  { id: 5, name: 'Salary Deposit', category: 'Income', amount: 4500.0, date: '3 days ago', dateGroup: 'This Week', icon: Wallet, color: colors.green },
  { id: 6, name: 'Gym Membership', category: 'Health', amount: -49.99, date: '3 days ago', dateGroup: 'This Week', icon: HeartPulse, color: colors.green },
  { id: 7, name: 'Netflix', category: 'Entertainment', amount: -15.99, date: '4 days ago', dateGroup: 'This Week', icon: Gamepad2, color: colors.pink },
  { id: 8, name: 'Lunch', category: 'Food', amount: -18.5, date: '4 days ago', dateGroup: 'This Week', icon: Coffee, color: colors.amber },
  { id: 9, name: 'Amazon Order', category: 'Shopping', amount: -67.0, date: '5 days ago', dateGroup: 'Last Week', icon: ShoppingBag, color: colors.purple },
  { id: 10, name: 'Gas Station', category: 'Transport', amount: -45.0, date: '6 days ago', dateGroup: 'Last Week', icon: Car, color: colors.blue },
];

const filters = ['All', 'Income', 'Expense', 'Food', 'Shopping', 'Transport', 'Bills'];

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = allTransactions.filter(tx => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Income') return tx.amount > 0;
    if (activeFilter === 'Expense') return tx.amount < 0;
    return tx.category === activeFilter;
  });

  // Group by date
  const groups = {};
  filtered.forEach(tx => {
    if (!groups[tx.dateGroup]) groups[tx.dateGroup] = [];
    groups[tx.dateGroup].push(tx);
  });

  return (
    <View style={custom.container}>
      <Header title="Transactions" />

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            activeOpacity={0.7}
            onPress={() => setActiveFilter(f)}
            style={[custom.filterChip, activeFilter === f && custom.filterChipActive]}
          >
            <Text style={[custom.filterChipText, activeFilter === f && custom.filterChipTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <View style={custom.cardCompact}>
          {Object.keys(groups).map(group => (
            <View key={group}>
              <Text style={custom.dateHeader}>{group}</Text>
              {groups[group].map((tx, idx) => (
                <View key={tx.id}>
                  <View style={custom.txItem}>
                    <View style={[custom.txIconWrap, { backgroundColor: `${tx.color}18` }]}>
                      <tx.icon size={20} color={tx.color} strokeWidth={1.8} />
                    </View>
                    <View style={custom.txInfo}>
                      <Text style={custom.txName}>{tx.name}</Text>
                      <Text style={custom.txMeta}>{tx.category} · {tx.date}</Text>
                    </View>
                    <Text style={[custom.txAmount, { color: tx.amount > 0 ? colors.green : colors.red }]}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </Text>
                  </View>
                  {idx < groups[group].length - 1 && <View style={custom.txDivider} />}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Transactions;
