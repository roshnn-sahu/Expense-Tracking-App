import React, { useCallback, useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Search } from 'lucide-react-native';
import styles from '@/styles';
import { filters } from '@/data/transactions';
import { getTransactions } from '@/api';
import TransactionCard from '@/components/TransactionCard';
import TransactionDetailModal from '@/components/TransactionDetailModal';

const centerStateStyle = { padding: 32, alignItems: 'center' };

const Transactions = () => {
  const navigation = useNavigation();

  const [activeFilter, setActiveFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [selectedTx, setSelectedTx] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTransactionPress = (tx) => {
    setSelectedTx(tx);
    setModalVisible(true);
  };

  const loadTransactions = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const data = await getTransactions(activeFilter);
        setTransactions(data);
      } catch (err) {
        setError(err.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeFilter],
  );

  useEffect(() => {
    loadTransactions();
  }, [activeFilter, loadTransactions]);

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

          <TouchableOpacity
            style={[styles.iconBtn, styles.bgSurfaceAlt]}
            activeOpacity={0.7}
          >
            <Search size={18} color={styles.colors.navy} strokeWidth={2} />
          </TouchableOpacity>
        </View>

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
              <Text style={[styles.fs16, styles.textRed]}>{error}</Text>
            </View>
          ) : transactions.length === 0 ? (
            <View
              style={[
                styles.card,
                styles.roundedXXL,
                styles.shadowSm,
                centerStateStyle,
              ]}
            >
              <Text style={[styles.fs16, styles.textGray]}>
                No transactions found.
              </Text>
            </View>
          ) : (
            <View style={[styles.px2]}>
              <View style={styles.transactionsCard}>
                {transactions.map((item, index) => (
                  <TransactionCard
                    key={item.id}
                    transaction={item}
                    showDivider={index !== transactions.length - 1}
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
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
