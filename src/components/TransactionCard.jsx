import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

import styles from '@/styles';
import { useCurrency } from '@/context/CurrencyContext';

const TransactionCard = ({ transaction, showDivider = true, onPress }) => {
  const { formatCurrency } = useCurrency();

  const isPositive = transaction.amount > 0;
  const IconComponent = isPositive
    ? ArrowDownLeft
    : ArrowUpRight;

  return (
    <TouchableOpacity onPress={() => onPress?.(transaction)} activeOpacity={0.7}>
      <View style={styles.txItem}>
        <View
          style={[
            styles.txIconWrap,
            { backgroundColor: `${transaction.color}18` },
          ]}
        >
          <IconComponent
            size={20}
            color={isPositive ? styles.colors.green : styles.colors.red}
            strokeWidth={1.8}
          />
        </View>
        <View style={styles.txInfo}>
          <Text style={styles.txName}>{transaction.name}</Text>

          <View>
            <Text
              style={[
                styles.textPrimary,
                styles.fs12,
                styles.fw500,
                styles.textItalic,
              ]}
            >
              {transaction.category}

              {transaction?.party && (
                <Text style={styles.textGray}>, </Text>
              )}
              <Text style={styles.textMidBlack}>{transaction?.party}</Text>
            </Text>
            {'\n'}
            <Text style={[styles.textGray, styles.fs12]}>
              {transaction.date}
            </Text>
          </View>
        </View>
        <View>
        <Text
          style={[
            styles.txAmount,
            { color: isPositive ? styles.colors.green : styles.colors.red },
          ]}
        >
          {isPositive ? '+' : '-'}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>
        
          </View>
      </View>
      {showDivider && <View style={styles.txDivider} />}
    </TouchableOpacity>
  );
};

export default TransactionCard;
