import React from 'react';
import { View, Text } from 'react-native';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import styles from '../styles/style';

const QuickStats = ({ income = '$4,500', expenses = '$2,850' }) => {
  return (
    <View style={[styles.flexRow, styles.gap3, styles.mb6]}>
      <View style={[styles.ieCard, { backgroundColor: styles.colors.greenLight }]}>              <View style={[styles.ieIconWrap, styles.bgWhite]}>
          <ArrowUpRight size={20} color={styles.colors.green} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={styles.ieLabel}>Income</Text>
          <Text style={[styles.ieAmount, { color: styles.colors.greenDark }]}>
            {income}
          </Text>
        </View>
      </View>

      <View style={[styles.ieCard, { backgroundColor: styles.colors.redLight }]}>              <View style={[styles.ieIconWrap, styles.bgWhite]}>
          <ArrowDownRight size={20} color={styles.colors.red} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={styles.ieLabel}>Expenses</Text>
          <Text style={[styles.ieAmount, { color: styles.colors.redDark }]}>
            {expenses}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuickStats;
