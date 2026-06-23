import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '@/styles';
import { useCompany } from '@/context/CompanyContext';
import { getDashboardData } from '@/api';

import Header from '@/components/includes/Header';
import BalanceCard from '@/components/BalanceCard';
import QuickStats from '@/components/QuickStats';
import SectionHeader from '@/components/SectionHeader';
import TransactionCard from '@/components/TransactionCard';
import TransactionDetailModal from '@/components/TransactionDetailModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { aSite } = useCompany();
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError(err?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

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

  const recentTransactions = dashboardData?.latestTransactions ?? [];
  const dashboardCurrency = dashboardData?.currency;

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        <Header onMenuPress={() => navigation.getParent()?.openDrawer()} />

        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          style={[styles.mt3]}
        >
          <View style={[styles.welcomeContainer, styles.mb3]}>
            <Text style={styles.greeting}>Welcome back 👋</Text>

            <Text style={styles.greetingSub}>
              {aSite?.display_name ? `${aSite.display_name}'s ` : ''}Your
              spending summary is ready.
            </Text>
          </View>

          {loading && (
            <View style={localStyles.loaderCard}>
              <ActivityIndicator size="large" color={styles.colors.blue} />
              <Text style={[localStyles.loaderText, styles.mt3]}>
                Loading dashboard...
              </Text>
            </View>
          )}

          {!loading && error && (
            <View style={localStyles.errorCard}>
              <Text style={[styles.textRed, styles.textCenter]}>{error}</Text>
            </View>
          )}

          {!loading && !error && dashboardData && (
            <>
              <BalanceCard
                balance={dashboardData.balance}
                totalIncome={dashboardData.totalIncome}
                totalExpense={dashboardData.totalExpense}
                currency={dashboardCurrency}
              />

              <QuickStats
                income={dashboardData.monthIncome}
                expense={dashboardData.monthExpense}
                currency={dashboardCurrency}
              />

              <View style={localStyles.transactionsSection}>
                <SectionHeader
                  title="Recent Transactions"
                  actionLabel="See All"
                  onActionPress={() => navigation.navigate('Transactions')}
                />

                <View style={styles.transactionCard}>
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((item, index) => (
                      <TransactionCard
                        key={item.id}
                        index={index}
                        transaction={item}
                        showDivider={index !== recentTransactions.length - 1}
                        onPress={handleTransactionPress}
                      />
                    ))
                  ) : (
                    <View style={[styles.px2, styles.py4]}>
                      <Text style={[styles.textGray, styles.textCenter]}>
                        No recent transactions found.
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </>
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
      </View>
    </SafeAreaView>
  );
};

const localStyles = {
  loaderCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    backgroundColor: styles.colors.surface,
    borderWidth: 1,
    borderColor: styles.colors.grayBorder,
    alignItems: 'center',
  },
  loaderText: {
    color: styles.colors.gray,
    fontWeight: '500',
  },
  errorCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    backgroundColor: styles.colors.redLight,
  },
  transactionsSection: {
    marginTop: 4,
  },
};

export default HomeScreen;
