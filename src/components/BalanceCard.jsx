import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

import styles from '@/styles';
import { useCurrency } from '@/context/CurrencyContext';

const BalanceCard = ({
  balance = 0,
  totalIncome = 0,
  totalExpense = 0,
  currency,
}) => {
  const { formatCurrency } = useCurrency();

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        {formatCurrency(balance, true, currency)}
      </Text>

      <View style={localStyles.summaryGrid}>
        <View style={[localStyles.summaryItem, styles.bgGreenLight]}>
          <View style={styles.row}>
            <ArrowDownLeft
              size={18}
              color={styles.colors.green}
              strokeWidth={2.5}
            />
            <Text style={localStyles.summaryLabel}>Total Income</Text>
          </View>
          <Text
            style={[
              localStyles.summaryAmount,
              { color: styles.colors.greenDark },
            ]}
          >
            {formatCurrency(totalIncome, true, currency)}
          </Text>
        </View>

        <View style={[localStyles.summaryItem, styles.bgRedLight]}>
          <View style={styles.row}>
            <ArrowUpRight
              size={18}
              color={styles.colors.red}
              strokeWidth={2.5}
            />
            <Text style={localStyles.summaryLabel}>Total Expense</Text>
          </View>
          <Text
            style={[
              localStyles.summaryAmount,
              { color: styles.colors.redDark },
            ]}
          >
            {formatCurrency(totalExpense, true, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  summaryItem: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: styles.colors.navy,
    marginLeft: 8,
  },
  summaryAmount: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
    letterSpacing: -0.5,
  },
});

export default BalanceCard;
