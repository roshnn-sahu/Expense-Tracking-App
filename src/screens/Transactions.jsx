import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react-native';
import styles from '@/styles';
import { filters } from '@/data/transactions';
import { getTransactions } from '@/api';
import TransactionCard from '@/components/TransactionCard';
import TransactionDetailModal from '@/components/TransactionDetailModal';
import FilterModal from '@/components/FilterModal';
import { useTransactionRefresh } from '@/context/TransactionRefreshContext';

const centerStateStyle = { padding: 32, alignItems: 'center' };

const Transactions = () => {
  const navigation = useNavigation();
  const { refreshCount } = useTransactionRefresh();

  const [activeFilter, setActiveFilter] = useState('All');
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [selectedTx, setSelectedTx] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    months: [],
    categories: [],
    paymentTypes: [],
    dateRange: null,
  });

  const handleTransactionPress = tx => {
    setSelectedTx(tx);
    setModalVisible(true);
  };

  const handleEditTransaction = tx => {
    setModalVisible(false);
    setSelectedTx(null);
    const isExpense = tx.amount < 0;
    navigation.navigate(isExpense ? 'EditExpense' : 'EditIncome', {
      transaction: tx,
    });
  };

  const loadTransactions = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await getTransactions('All');
      setAllTransactions(data);
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions]),
  );

  useEffect(() => {
    if (refreshCount > 0) loadTransactions();
  }, [refreshCount, loadTransactions]);

  // Apply type filter (All/Income/Expense) + advanced filters
  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    // Type filter
    if (activeFilter === 'Income') {
      result = result.filter(t => t.amount > 0);
    } else if (activeFilter === 'Expense') {
      result = result.filter(t => t.amount < 0);
    }

    // Date range filter
    if (activeFilters.dateRange) {
      const { startDate, endDate } = activeFilters.dateRange;
      result = result.filter(t => {
        const dateStr = (t.date || t.entry_date || '').substring(0, 10);
        if (!dateStr) return false;
        return dateStr >= startDate && dateStr <= endDate;
      });
    }

    // Month filter
    if (activeFilters.months.length > 0) {
      result = result.filter(t => {
        const dateStr = t.date || t.entry_date || '';
        if (!dateStr) return false;
        const yearMonth = dateStr.substring(0, 7);
        return activeFilters.months.includes(yearMonth);
      });
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter(t =>
        activeFilters.categories.includes(t.category),
      );
    }

    // Payment type filter
    if (activeFilters.paymentTypes.length > 0) {
      result = result.filter(t => activeFilters.paymentTypes.includes(t.mode));
    }

    return result;
  }, [allTransactions, activeFilter, activeFilters]);

  const activeFilterCount =
    activeFilters.months.length +
    activeFilters.categories.length +
    activeFilters.paymentTypes.length +
    (activeFilters.dateRange ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={[styles.container]}>
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

          <View style={{ width: 40 }} />
        </View>

        <View style={[styles.mt2, styles.px5, styles.borderBottom]}>
          <View style={[styles.row, styles.alignCenter, styles.pb2]}>
            <View style={[styles.row, styles.gap1, { flex: 1 }]}>
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

            <TouchableOpacity
              style={[
                styles.iconBtn,
                styles.bgSurfaceAlt,
                hasActiveFilters && {
                  backgroundColor: styles.colors.blue,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setFilterModalVisible(true)}
            >
              <SlidersHorizontal
                size={18}
                color={hasActiveFilters ? '#FFFFFF' : styles.colors.navy}
                strokeWidth={2}
              />
              {hasActiveFilters && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: styles.colors.red,
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  <Text
                    style={{ fontSize: 11, fontWeight: '700', color: '#FFF' }}
                  >
                    {activeFilterCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Active filter summary */}
          {hasActiveFilters && (
            <View
              style={[
                styles.row,
                { paddingTop: 8, paddingBottom: 8, flexWrap: 'wrap', gap: 6 },
              ]}
            >
              {' '}
              {activeFilters.dateRange && (
                <View
                  key="dateRange"
                  style={{
                    backgroundColor: '#FEF3C7',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: '#B45309' }}>
                    {activeFilters.dateRange.startDate} –{' '}
                    {activeFilters.dateRange.endDate}
                  </Text>
                </View>
              )}
              {activeFilters.months.map(m => (
                <View
                  key={m}
                  style={{
                    backgroundColor: '#EFF6FF',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: styles.colors.blue }}>
                    {m}
                  </Text>
                </View>
              ))}
              {activeFilters.categories.map(c => (
                <View
                  key={c}
                  style={{
                    backgroundColor: '#F0FDF4',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: styles.colors.green }}>
                    {c}
                  </Text>
                </View>
              ))}
              {activeFilters.paymentTypes.map(pt => (
                <View
                  key={pt}
                  style={{
                    backgroundColor: '#FDF4FF',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: styles.colors.purple }}>
                    {pt}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px2, styles.pb14, styles.pt3]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadTransactions(true)}
              colors={[styles.colors.blue]}
              tintColor={styles.colors.blue}
            />
          }
        >
          {loading ? (
            <View>
              <ActivityIndicator size="large" color={styles.colors.blue} />
            </View>
          ) : error ? (
            <View>
              <Text style={[styles.fs16, styles.textRed, styles.textCenter]}>
                {error}
              </Text>
            </View>
          ) : filteredTransactions.length === 0 ? (
            <View style={centerStateStyle}>
              <Text style={[styles.fs16, styles.textGray, styles.textCenter]}>
                {hasActiveFilters
                  ? 'No transactions match your filters.'
                  : 'No transactions found.'}
              </Text>
              {hasActiveFilters && (
                <TouchableOpacity
                  onPress={() =>
                    setActiveFilters({
                      months: [],
                      categories: [],
                      paymentTypes: [],
                      dateRange: null,
                    })
                  }
                  style={{ marginTop: 8 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: styles.colors.blue,
                    }}
                  >
                    Clear filters
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={[styles.px2]}>
              <View style={styles.transactionsCard}>
                {filteredTransactions.map((item, index) => (
                  <TransactionCard
                    key={item.id}
                    transaction={item}
                    showDivider={index !== filteredTransactions.length - 1}
                    onPress={handleTransactionPress}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <TransactionDetailModal
          visible={modalVisible}
          transaction={selectedTx}
          onClose={() => {
            setModalVisible(false);
            setSelectedTx(null);
          }}
          onEdit={handleEditTransaction}
        />

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={filters => setActiveFilters(filters)}
          initialFilters={activeFilters}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
