import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Gamepad2,
  HeartPulse,
} from 'lucide-react-native';
import custom from '../styles/custom';
import style from '../styles/style';

const transactions = [
  {
    id: 1,
    name: 'Morning Coffee',
    category: 'Food',
    amount: -5.5,
    date: 'Today',
    icon: Coffee,
    color: '#F59E0B',
  },
  {
    id: 2,
    name: 'Grocery Store',
    category: 'Shopping',
    amount: -82.3,
    date: 'Yesterday',
    icon: ShoppingBag,
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Uber Ride',
    category: 'Transport',
    amount: -24.0,
    date: 'Yesterday',
    icon: Car,
    color: '#3B82F6',
  },
  {
    id: 4,
    name: 'Electric Bill',
    category: 'Bills',
    amount: -145.0,
    date: '2 days ago',
    icon: Home,
    color: '#EF4444',
  },
  {
    id: 5,
    name: 'Salary Deposit',
    category: 'Income',
    amount: 4500.0,
    date: '3 days ago',
    icon: Wallet,
    color: '#22C55E',
  },
];

const Dashboard = () => {
  return (
    <View style={custom.canvas}>
      {/* Header */}
      <View style={[custom.headerRow, { paddingTop: 20 }]}>
        <View>
          <Text style={custom.labelText}>Welcome back</Text>
          <Text style={[custom.headerText, { marginTop: 2 }]}>Alex</Text>
        </View>
        <TouchableOpacity style={custom.headerAvatar} activeOpacity={0.7}>
          <Wallet size={22} color="#2563EB" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      >
        {/* Balance Card */}
        <View style={custom.balanceCard}>
          <Text style={custom.balanceLabel}>Total Balance</Text>
          <Text style={custom.balanceAmount}>$12,480.50</Text>
          <View style={[style.row, { marginTop: 8 }]}>
            <TrendingUp size={16} color="#22C55E" strokeWidth={2.5} />
            <Text
              style={[
                custom.textGreen,
                { fontSize: 14, fontWeight: '600', marginLeft: 4 },
              ]}
            >
              +8.2%
            </Text>
            <Text
              style={[
                custom.textGray,
                { fontSize: 14, fontWeight: '500', marginLeft: 6 },
              ]}
            >
              vs last month
            </Text>
          </View>
        </View>

        {/* Income / Expense Cards */}
        <View style={style.row}>
          <View style={custom.incomeCard}>
            <View style={[style.row, { marginBottom: 8 }]}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <ArrowUpRight size={18} color="#22C55E" strokeWidth={2.5} />
              </View>
              <Text style={custom.labelText}>Income</Text>
            </View>
            <Text style={[custom.amountText, custom.textGreen]}>$4,500</Text>
          </View>
          <View style={custom.expenseCard}>
            <View style={[style.row, { marginBottom: 8 }]}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <TrendingDown size={18} color="#EF4444" strokeWidth={2.5} />
              </View>
              <Text style={custom.labelText}>Expenses</Text>
            </View>
            <Text style={[custom.amountText, custom.textRed]}>$2,850</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={[style.rowBetween, { marginTop: 24, marginBottom: 16 }]}>
          <Text style={custom.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={[custom.textBlue, { fontSize: 14, fontWeight: '600' }]}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={custom.card}>
          {transactions.map((tx, index) => (
            <View key={tx.id}>
              <View style={custom.transactionItem}>
                <View
                  style={[
                    custom.transactionIconWrap,
                    { backgroundColor: `${tx.color}15` },
                  ]}
                >
                  <tx.icon size={20} color={tx.color} strokeWidth={1.8} />
                </View>
                <View style={custom.transactionInfo}>
                  <Text style={custom.transactionName}>{tx.name}</Text>
                  <Text style={custom.transactionMeta}>
                    {tx.category} · {tx.date}
                  </Text>
                </View>
                <Text
                  style={[
                    custom.transactionAmount,
                    { color: tx.amount > 0 ? '#22C55E' : '#EF4444' },
                  ]}
                >
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </Text>
              </View>
              {index < transactions.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#F3F4F6',
                    marginLeft: 60,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          bottom: 100,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 18,
          backgroundColor: '#2563EB',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 8,
          shadowColor: '#2563EB',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
        }}
      >
        <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
