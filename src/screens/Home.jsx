import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles';

import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import QuickStats from '../components/QuickStats';
import SectionHeader from '../components/SectionHeader';
import TransactionCard from '../components/TransactionCard';

import { recentTransactions } from '../data/transactions';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <Header onMenuPress={() => navigation.getParent()?.openDrawer()} />

        {/* BODY */}
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >
          {/* GREETING */}
          <View style={(styles.welcomeContainer, styles.mb3)}>
            <Text style={styles.greeting}>Welcome back 👋</Text>

            <Text style={styles.greetingSub}>
              Your spending summary is ready.
            </Text>
          </View>

          {/* BALANCE CARD */}
          <BalanceCard />

          {/* QUICK STATS */}
          <QuickStats />

          {/* RECENT TRANSACTIONS */}
          <View style={styles.transactionsSection}>
            <SectionHeader title="Recent Transactions" actionLabel="See All" />

            <View style={styles.transactionsCard}>
              {recentTransactions.map((item, index) => (
                <TransactionCard
                  key={item.id}
                  transaction={item}
                  showDivider={index !== recentTransactions.length - 1}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
