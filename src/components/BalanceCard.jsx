import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp } from 'lucide-react-native';

import styles from '../styles';
import { useCurrency } from '../context/CurrencyContext';

const BalanceCard = ({ change = '+8.2%' }) => {
  const { formatCurrency } = useCurrency();

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>{formatCurrency(12480.5)}</Text>
      <View style={styles.balanceChangeRow}>
        <View style={styles.balanceBadge}>
          <View style={styles.row}>
            <TrendingUp size={12} color={styles.colors.green} strokeWidth={3} />
            <Text style={[styles.balanceBadgeText, styles.ml1]}>{change}</Text>
          </View>
        </View>
        <Text style={styles.balancePeriod}>vs last month</Text>
      </View>
    </View>
  );
};

export default BalanceCard;
