import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import styles from '../styles/style';

const BalanceCard = ({ balance = '$12,480.50', change = '+8.2%' }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>{balance}</Text>
      <View style={styles.balanceChangeRow}>
        <View style={styles.balanceBadge}>
          <View style={styles.row}>
            <TrendingUp size={12} color={styles.colors.green} strokeWidth={3} />
            <Text style={[styles.balanceBadgeText, styles.ml1]}>
              {change}
            </Text>
          </View>
        </View>
        <Text style={styles.balancePeriod}>vs last month</Text>
      </View>
    </View>
  );
};

export default BalanceCard;
