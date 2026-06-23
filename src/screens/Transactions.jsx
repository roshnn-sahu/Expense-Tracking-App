import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react-native';
import styles from '@/styles';
import { filters } from '@/data/transactions';
import { getTransactions, deleteTransaction } from '@/api';
import TransactionCard from '@/components/TransactionCard';
import TransactionDetailModal from '@/components/TransactionDetailModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import FilterModal from '@/components/FilterModal';
import { useTransactionRefresh } from '@/context/TransactionRefreshContext';

const Transactions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { refreshCount, triggerRefresh } = useTransactionRefresh();
  const flatListRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState(route.params?.initialFilter || 'All');
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedTx, setSelectedTx] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteConfirmTx, setDeleteConfirmTx] = useState(null);

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

  const handleDeleteRequest = useCallback(tx => {
    setDeleteConfirmTx(tx);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteConfirmTx) return;
    try {
      await deleteTransaction(deleteConfirmTx.id);
      setDeleteConfirmTx(null);
      Toast.show({
        type: 'info',
        text1: 'Deleted',
        text2: 'Transaction deleted successfully!',
        visibilityTime: 2500,
      });
      triggerRefresh();
    } catch (err) {
      setDeleteConfirmTx(null);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err?.response?.data?.message ||
          err?.message ||
          'Failed to delete transaction.',
        visibilityTime: 3000,
      });
    }
  }, [deleteConfirmTx]);

  const loadTransactions = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    setPage(1);
    setHasMore(true);

    try {
      const result = await getTransactions('All', 1);
      setAllTransactions(result.transactions);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadMoreTransactions = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const nextPage = page + 1;
      const result = await getTransactions('All', nextPage);
      setAllTransactions(prev => [...prev, ...result.transactions]);
      setPage(nextPage);
      setHasMore(result.hasMore);
    } catch (err) {
      // Silently fail — user can scroll again to retry
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore]);

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

  const renderTransactionItem = useCallback(
    ({ item, index }) => (
      <TransactionCard
        index={index}
        transaction={item}
        showDivider={index !== filteredTransactions.length - 1}
        onPress={handleTransactionPress}
      />
    ),
    [filteredTransactions.length, handleTransactionPress],
  );

  const renderListFooter = () => {
    if (loadingMore) {
      return (
        <View style={ls.footerLoader}>
          <ActivityIndicator size="small" color={styles.colors.blue} />
          <Text style={ls.footerText}>Loading more...</Text>
        </View>
      );
    }
    if (!hasMore && allTransactions.length > 0) {
      return (
        <View style={ls.footerEnd}>
          <Text style={ls.footerEndText}>All transactions loaded</Text>
        </View>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (loading) return null;
    return (
      <View style={ls.emptyState}>
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
    );
  };

  const handleEndReached = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      loadMoreTransactions();
    }
  }, [loadingMore, hasMore, loading, loadMoreTransactions]);

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

        {loading ? (
          <View style={ls.centerLoader}>
            <ActivityIndicator size="large" color={styles.colors.blue} />
          </View>
        ) : error ? (
          <View style={ls.centerLoader}>
            <Text style={[styles.fs16, styles.textRed, styles.textCenter]}>
              {error}
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={filteredTransactions}
            renderItem={renderTransactionItem}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={[styles.px2, { paddingBottom: 24 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadTransactions(true)}
                colors={[styles.colors.blue]}
                tintColor={styles.colors.blue}
              />
            }
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.05}
            ListFooterComponent={renderListFooter}
            ListEmptyComponent={renderEmptyState}
          />
        )}

        <TransactionDetailModal
          visible={modalVisible}
          transaction={selectedTx}
          onClose={() => {
            setModalVisible(false);
            setSelectedTx(null);
          }}
          onEdit={handleEditTransaction}
          onDeleteRequest={handleDeleteRequest}
        />

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={filters => setActiveFilters(filters)}
          initialFilters={activeFilters}
        />

        <ConfirmDialog
          visible={!!deleteConfirmTx}
          onClose={() => setDeleteConfirmTx(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Transaction"
          message={`Are you sure you want to delete "${deleteConfirmTx?.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmVariant="danger"
        />
      </View>
    </SafeAreaView>
  );
};

const ls = StyleSheet.create({
  centerLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  footerLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  footerEnd: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerEndText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
});

export default Transactions;
