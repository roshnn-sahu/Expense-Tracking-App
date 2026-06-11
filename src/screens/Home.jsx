import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/style';
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
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
        <Header
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Greeting */}
          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeTitle}>Welcome back 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Your spending summary is ready.
            </Text>
          </View>

          {/* Balance Card */}
          <BalanceCard />

          {/* Quick Stats */}
          <QuickStats />

          {/* Recent Transactions */}
          <SectionHeader title="Recent Transactions" actionLabel="See All" />
          <View style={styles.card}>
            {recentTransactions.map((tx, index) => (
              <TransactionCard
                key={tx.id}
                transaction={tx}
                showDivider={index < recentTransactions.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
