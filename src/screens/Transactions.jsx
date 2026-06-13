import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Search } from 'lucide-react-native';

import styles from '@/styles';
import TransactionCard from '@/components/TransactionCard';
import { allTransactions, filters } from '@/data/transactions';

const DATE_GROUP_ORDER = ['Today', 'Yesterday', 'This Week', 'Last Week'];

const groupByDate = items => {
  const groups = {};

  DATE_GROUP_ORDER.forEach(group => {
    const found = items.filter(i => i.dateGroup === group);
    if (found.length) groups[group] = found;
  });

  // Catch any items that don't match known groups
  items.forEach(item => {
    if (!DATE_GROUP_ORDER.includes(item.dateGroup)) {
      const key = item.dateGroup || 'Other';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }
  });

  return groups;
};

const Transactions = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'All') return allTransactions;
    if (activeFilter === 'Income')
      return allTransactions.filter(t => t.amount > 0);
    if (activeFilter === 'Expense')
      return allTransactions.filter(t => t.amount < 0);
    return allTransactions.filter(t => t.category === activeFilter);
  }, [activeFilter]);

  const grouped = groupByDate(filteredTransactions);
  const groupKeys = Object.keys(grouped);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={[styles.container]}>
        {/* HEADER */}
        <View
          style={[
            styles.row,
            styles.justifyBetween,
            styles.alignCenter,
            styles.px5,
            styles.py4,
          ]}
        >
          <TouchableOpacity
            style={[styles.iconBtn, styles.bgSurfaceAlt]}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <ChevronLeft
              size={22}
              color={styles.colors.navy}
              strokeWidth={2.2}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Transactions</Text>

          <TouchableOpacity
            style={[styles.iconBtn, styles.bgSurfaceAlt]}
            activeOpacity={0.7}
          >
            <Search size={18} color={styles.colors.navy} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        <View style={[styles.mt2, styles.px5, styles.borderBottom]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.pb2]}
          >
            <View style={[styles.row, styles.gap1]}>
              {filters.map(filter => {
                const active = activeFilter === filter;

                return (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}
                    activeOpacity={0.75}
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
            </View>
          </ScrollView>
        </View>

        {/* LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px5, styles.pb14, styles.pt3]}
        >
          {groupKeys.length === 0 ? (
            <View
              style={[
                styles.card,
                styles.roundedXXL,
                styles.shadowSm,
                { padding: 32, alignItems: 'center' },
              ]}
            >
              <Text style={[styles.fs16, styles.textGray]}>
                No transactions found.
              </Text>
            </View>
          ) : (
            <View style={[styles.TransactionCard]}>
              {groupKeys.map(section => {
                const items = grouped[section];

                return (
                  <View key={section}>
                    {/* SECTION TITLE */}
                    <Text
                      style={[
                        styles.fs12,
                        styles.fw700,
                        styles.textGray,
                        styles.mb4,
                        styles.mt2,
                      ]}
                    >
                      {section.toUpperCase()}
                    </Text>

                    {/* ITEMS */}
                    {items.map((transaction, index) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        showDivider={index !== items.length - 1}
                      />
                    ))}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
