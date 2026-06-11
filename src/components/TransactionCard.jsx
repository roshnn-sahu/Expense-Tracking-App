import React from 'react';
import { View, Text } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import styles from '../styles/style';

const TransactionCard = ({ transaction, showDivider = true }) => {
  const IconComponent = LucideIcons[transaction.icon] || LucideIcons.MoreHorizontal;
  const isPositive = transaction.amount > 0;

  return (
    <View>
      <View style={styles.txItem}>
        <View
          style={[
            styles.txIconWrap,
            { backgroundColor: `${transaction.color}18` },
          ]}
        >
          <IconComponent size={20} color={transaction.color} strokeWidth={1.8} />
        </View>
        <View style={styles.txInfo}>
          <Text style={styles.txName}>{transaction.name}</Text>
          <Text style={styles.txMeta}>
            {transaction.category} · {transaction.date}
          </Text>
        </View>
        <Text
          style={[
            styles.txAmount,
            { color: isPositive ? styles.colors.green : styles.colors.red },
          ]}
        >
          {isPositive ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
        </Text>
      </View>
      {showDivider && <View style={styles.txDivider} />}
    </View>
  );
};

export default TransactionCard;
