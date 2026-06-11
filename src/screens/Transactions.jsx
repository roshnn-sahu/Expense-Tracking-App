import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/style';
import Header from '../components/Header';
import TransactionCard from '../components/TransactionCard';
import { allTransactions, filters } from '../data/transactions';

const Transactions = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = allTransactions.filter(tx => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Income') return tx.amount > 0;
    if (activeFilter === 'Expense') return tx.amount < 0;
    return tx.category === activeFilter;
  });

  // Group by date
  const groups = {};
  filtered.forEach(tx => {
    if (!groups[tx.dateGroup]) groups[tx.dateGroup] = [];
    groups[tx.dateGroup].push(tx);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
        <Header title="Transactions" onMenuPress={() => navigation.getParent()?.openDrawer()} />

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.px5, styles.py3]}
        >
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              activeOpacity={0.7}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === f && styles.filterChipTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.cardCompact}>
            {Object.keys(groups).map(group => (
              <View key={group}>
                <Text style={styles.dateHeader}>{group}</Text>
                {groups[group].map((tx, idx) => (
                  <TransactionCard
                    key={tx.id}
                    transaction={tx}
                    showDivider={idx < groups[group].length - 1}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
