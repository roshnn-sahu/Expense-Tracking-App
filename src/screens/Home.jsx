import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '@/styles';
import { useCompany } from '@/context/CompanyContext';

import Header from '@/components/includes/Header';
import BalanceCard from '@/components/BalanceCard';
import QuickStats from '@/components/QuickStats';
import SectionHeader from '@/components/SectionHeader';
import TransactionCard from '@/components/TransactionCard';
import TransactionDetailModal from '@/components/TransactionDetailModal';

import { recentTransactions } from '@/data/transactions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { company } = useCompany();
  const [selectedTx, setSelectedTx] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTransactionPress = (tx) => {
    setSelectedTx(tx);
    setModalVisible(true);
  };

  const handleEditTransaction = (tx) => {
    setModalVisible(false);
    setSelectedTx(null);
    const isExpense = tx.amount < 0;
    navigation.navigate(isExpense ? 'EditExpense' : 'EditIncome', {
      transaction: tx,
    });
  };
 
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <Header onMenuPress={() => navigation.getParent()?.openDrawer()} />

        {/* BODY */}
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          style={[styles.mt3]}
        >
          {/* GREETING */}
          <View style={(styles.welcomeContainer, styles.mb3)}>
            <Text style={styles.greeting}>Welcome back 👋</Text>

            <Text style={styles.greetingSub}>
              {company?.display_name ? `${company.display_name}'s ` : ''}Your
              spending summary is ready.
            </Text>
          </View>

          {/* BALANCE CARD */}
          <BalanceCard />

          {/* QUICK STATS */}
          <QuickStats />

          {/* RECENT TRANSACTIONS */}
          <View style={styles.transactionsSection}>
            <SectionHeader
              title="Recent Transactions"
              actionLabel="See All"
              onActionPress={() => navigate('Transcations')}
            />

            <View style={styles.transactionsCard}>
              {recentTransactions.map((item, index) => (
                <TransactionCard
                  key={item.id}
                  transaction={item}
                  showDivider={index !== recentTransactions.length - 1}
                  onPress={handleTransactionPress}
                />
              ))}
            </View>
          </View>
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

export default HomeScreen;
