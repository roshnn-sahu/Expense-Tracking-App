import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Download, ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

import styles from '../styles';
import Header from '../components/includes/Header';
import { useCurrency } from '../context/CurrencyContext';

const FILTERS = ['This Month', 'Last Month', '3 Months'];

const statements = [
  {
    id: 1,
    title: 'Salary Deposit',
    date: 'Jun 12, 2026',
    amount: 4500,
    type: 'income',
  },
  {
    id: 2,
    title: 'Netflix Subscription',
    date: 'Jun 11, 2026',
    amount: -19.99,
    type: 'expense',
  },
  {
    id: 3,
    title: 'Grocery Store',
    date: 'Jun 10, 2026',
    amount: -120.4,
    type: 'expense',
  },
  {
    id: 4,
    title: 'Freelance Payment',
    date: 'Jun 8, 2026',
    amount: 820,
    type: 'income',
  },
];

const Statement = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('This Month');
  const { formatCurrency } = useCurrency();

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    statements.forEach(item => {
      if (item.amount > 0) {
        income += item.amount;
      } else {
        expense += Math.abs(item.amount);
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <View style={styles.container}>
        <Header
          title="Statement"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* SUMMARY CARD */}

          <View style={[styles.balanceCard, styles.mt3]}>
            <Text
              style={[styles.fs13, styles.textGray, styles.fw600, styles.mb2]}
            >
              TOTAL BALANCE
            </Text>

            <Text style={[styles.fs42, styles.fw800, styles.textNavy]}>
              {formatCurrency(totals.balance)}
            </Text>

            <View style={[styles.row, styles.justifyBetween, styles.mt4]}>
              {/* Income */}

              <View style={[styles.flex1]}>
                <Text style={[styles.fs12, styles.textGray, styles.mb1]}>
                  Income
                </Text>

                <View style={[styles.row, styles.alignCenter]}>
                  <ArrowUpRight size={16} color={styles.colors.green} />

                  <Text
                    style={[
                      styles.fs18,
                      styles.fw700,
                      styles.textGreen,
                      styles.ml1,
                    ]}
                  >
                    {formatCurrency(totals.income)}
                  </Text>
                </View>
              </View>

              {/* Expense */}

              <View style={[styles.flex1]}>
                <Text style={[styles.fs12, styles.textGray, styles.mb1]}>
                  Expenses
                </Text>

                <View style={[styles.row, styles.alignCenter]}>
                  <ArrowDownLeft size={16} color={styles.colors.red} />

                  <Text
                    style={[
                      styles.fs18,
                      styles.fw700,
                      styles.textRed,
                      styles.ml1,
                    ]}
                  >
                    {formatCurrency(totals.expense)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* FILTERS */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.mb4]}
          >
            {FILTERS.map(filter => {
              const active = activeFilter === filter;

              return (
                <TouchableOpacity
                  key={filter}
                  activeOpacity={0.9}
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterChip,

                    active && styles.filterChipActive,

                    styles.mr2,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,

                      active && styles.filterChipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* EXPORT */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryButton, styles.mb4]}
          >
            <View style={[styles.row, styles.alignCenter]}>
              <Download size={18} color="#FFFFFF" />

              <Text style={[styles.primaryButtonText, styles.ml2]}>
                Export Statement
              </Text>
            </View>
          </TouchableOpacity>

          {/* TRANSACTION LIST */}

          <View style={styles.transactionCard}>
            {statements.map((item, index) => {
              const isIncome = item.type === 'income';

              return (
                <View key={item.id}>
                  <View style={styles.txItem}>
                    {/* ICON */}

                    <View
                      style={[
                        styles.txIconWrap,

                        {
                          backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2',
                        },
                      ]}
                    >
                      {isIncome ? (
                        <ArrowDownLeft size={20} color={styles.colors.green} />
                      ) : (
                        <ArrowUpRight size={20} color={styles.colors.red} />
                      )}
                    </View>

                    {/* INFO */}

                    <View style={styles.txInfo}>
                      <Text style={styles.txName}>{item.title}</Text>

                      <Text style={styles.txMeta}>{item.date}</Text>
                    </View>

                    {/* AMOUNT */}

                    <Text
                      style={[
                        styles.txAmount,

                        {
                          color: isIncome
                            ? styles.colors.green
                            : styles.colors.red,
                        },
                      ]}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(Math.abs(item.amount))}
                    </Text>
                  </View>

                  {index !== statements.length - 1 && (
                    <View style={[styles.divider, styles.ml15]} />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Statement;
