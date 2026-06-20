import React from 'react';
import { View, Text } from 'react-native';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

import styles from '@/styles';
import { useCurrency } from '@/context/CurrencyContext';

const QuickStats = ({ income = 0, expense = 0, currency }) => {
  const { formatCurrency } = useCurrency();

  return (
    <View style={[styles.flexRow, styles.gap2, styles.mb6]}>
      <View
        style={[styles.ieCard, { backgroundColor: styles.colors.greenLight }]}
      >
        <View style={[styles.ieIconWrap, styles.bgWhite]}>
          <ArrowDownLeft
            size={20}
            color={styles.colors.green}
            strokeWidth={2.5}
          />
        </View>
        <View>
          <Text style={[styles.ieLabel, { fontSize: 9 }]}>
            This Month 
          </Text>
          <Text style={[styles.ieAmount, { color: styles.colors.greenDark }]}>
            {formatCurrency(income, true, currency)}
          </Text>
        </View>
      </View>

      <View
        style={[styles.ieCard, { backgroundColor: styles.colors.redLight }]}
      >
        <View style={[styles.ieIconWrap, styles.bgWhite]}>
          <ArrowUpRight size={20} color={styles.colors.red} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={[styles.ieLabel, { fontSize: 9 }]}>
            This Month 
          </Text>
          <Text style={[styles.ieAmount, { color: styles.colors.redDark }]}>
            {formatCurrency(expense, true, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuickStats;
