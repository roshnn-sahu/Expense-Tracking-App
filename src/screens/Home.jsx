import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Gamepad2,
  HeartPulse,
  Wallet,
} from 'lucide-react-native';
import custom, { colors } from '../styles/custom';
import Header from '../components/Header';

const transactions = [
  {
    id: 1,
    name: 'Morning Coffee',
    category: 'Food',
    amount: -5.5,
    date: 'Today',
    icon: Coffee,
    color: colors.amber,
  },
  {
    id: 2,
    name: 'Grocery Store',
    category: 'Shopping',
    amount: -82.3,
    date: 'Yesterday',
    icon: ShoppingBag,
    color: colors.purple,
  },
  {
    id: 3,
    name: 'Uber Ride',
    category: 'Transport',
    amount: -24.0,
    date: 'Yesterday',
    icon: Car,
    color: colors.blue,
  },
  {
    id: 4,
    name: 'Electric Bill',
    category: 'Bills',
    amount: -145.0,
    date: '2 days ago',
    icon: Home,
    color: colors.red,
  },
  {
    id: 5,
    name: 'Salary Deposit',
    category: 'Income',
    amount: 4500.0,
    date: '3 days ago',
    icon: Wallet,
    color: colors.green,
  },
];

const HomeScreen = () => {
  const userName = 'Alex';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={custom.container}>
        <Header />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        >
          {/* ═══ Welcome Banner ═══ */}
          <View style={custom.welcomeRow}>
            <Text style={custom.welcomeTitle}>Welcome back, {userName}</Text>
            <Text style={custom.welcomeSubtitle}>
              Your spending summary is ready.
            </Text>
          </View>
          {/* ═══ Balance Hero Card ═══ */}
          <View style={custom.balanceCard}>
            <Text style={custom.balanceLabel}>Total Balance</Text>
            <Text style={custom.balanceAmount}>$12,480.50</Text>
            <View style={custom.balanceChangeRow}>
              <View style={custom.balanceBadge}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TrendingUp size={12} color={colors.green} strokeWidth={3} />
                  <Text style={[custom.balanceBadgeText, { marginLeft: 3 }]}>
                    +8.2%
                  </Text>
                </View>
              </View>
              <Text style={custom.balancePeriod}>vs last month</Text>
            </View>
          </View>

          {/* ═══ Income / Expense Row ═══ */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
            <View
              style={[custom.ieCard, { backgroundColor: colors.greenLight }]}
            >
              <View style={[custom.ieIconWrap, { backgroundColor: '#FFFFFF' }]}>
                <ArrowUpRight
                  size={20}
                  color={colors.green}
                  strokeWidth={2.5}
                />
              </View>
              <View>
                <Text style={custom.ieLabel}>Income</Text>
                <Text style={[custom.ieAmount, { color: colors.greenDark }]}>
                  $4,500
                </Text>
              </View>
            </View>

            <View style={[custom.ieCard, { backgroundColor: colors.redLight }]}>
              <View style={[custom.ieIconWrap, { backgroundColor: '#FFFFFF' }]}>
                <ArrowDownRight
                  size={20}
                  color={colors.red}
                  strokeWidth={2.5}
                />
              </View>
              <View>
                <Text style={custom.ieLabel}>Expenses</Text>
                <Text style={[custom.ieAmount, { color: colors.redDark }]}>
                  $2,850
                </Text>
              </View>
            </View>
          </View>

          {/* ═══ Recent Transactions ═══ */}
          <View style={custom.sectionHeader}>
            <Text style={custom.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={custom.sectionAction}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={custom.card}>
            {transactions.map((tx, index) => (
              <View key={tx.id}>
                <View style={custom.txItem}>
                  <View
                    style={[
                      custom.txIconWrap,
                      { backgroundColor: `${tx.color}18` },
                    ]}
                  >
                    <tx.icon size={20} color={tx.color} strokeWidth={1.8} />
                  </View>
                  <View style={custom.txInfo}>
                    <Text style={custom.txName}>{tx.name}</Text>
                    <Text style={custom.txMeta}>
                      {tx.category} · {tx.date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      custom.txAmount,
                      { color: tx.amount > 0 ? colors.green : colors.red },
                    ]}
                  >
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </Text>
                </View>
                {index < transactions.length - 1 && (
                  <View style={custom.txDivider} />
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
            bottom: 90,
            right: 20,
            width: 58,
            height: 58,
            borderRadius: 20,
            backgroundColor: colors.blue,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 12,
            shadowColor: colors.blue,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
          }}
        >
          <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
