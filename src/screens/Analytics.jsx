import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Svg, { Circle } from 'react-native-svg';

import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react-native';

import * as LucideIcons from 'lucide-react-native';

import styles from '../styles';

import Header from '../components/Header';

import { analyticsCategories } from '../data/transactions';

import { useCurrency } from '../context/CurrencyContext';

const CHART_SIZE = 220;
const STROKE_WIDTH = 22;

const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const FILTERS = ['Week', 'Month', 'Year'];

const Analytics = () => {
  const navigation = useNavigation();
  const { formatCurrency } = useCurrency();

  const [activeFilter, setActiveFilter] = useState('Month');

  const totalSpent = useMemo(
    () => analyticsCategories.reduce((acc, item) => acc + item.amount, 0),
    [],
  );

  // Pre-compute donut segments to avoid mutating during render
  const segments = useMemo(() => {
    let acc = 0;
    return analyticsCategories.map(cat => {
      const segment = (cat.percentage / 100) * CIRCUMFERENCE;
      const offset = acc === 0 ? 0 : (acc / 100) * CIRCUMFERENCE;
      acc += cat.percentage;
      return { ...cat, segment, offset };
    });
  }, []);

  // Dummy income for center percentage calculation
  const totalIncome = 4500;
  const expenseRatio = Math.round((totalSpent / totalIncome) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <View style={styles.container}>
        <Header
          title="Analytics"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.px5, styles.pb10]}
        >
          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.flexRow, styles.mt3, styles.mb5]}
          >
            {FILTERS.map(item => {
              const active = activeFilter === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.7}
                  onPress={() => setActiveFilter(item)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      active && styles.filterChipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ======== HERO ======== */}
          <View style={[styles.card, styles.alignCenter, styles.py6]}>
            <Text style={[styles.fs13, styles.textGray, styles.fw600, styles.mb2]}>
              Total Spending
            </Text>

            <Text style={[styles.fs42, styles.fw800, styles.textNavy]}>
              {formatCurrency(totalSpent)}
            </Text>

            <View style={[styles.row, styles.alignCenter, styles.mt3]}>
              <TrendingDown size={14} color="#EF4444" />
              <Text style={[styles.ml2, styles.textRed, styles.fw700]}>
                12%
              </Text>
              <Text style={[styles.ml2, styles.textGray, styles.fs14]}>
                vs last month
              </Text>
            </View>

            {/* ======== DONUT ======== */}
            <View
              style={[
                styles.mt5,
                {
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Svg width={CHART_SIZE} height={CHART_SIZE}>
                {/* Background circle */}
                <Circle
                  cx={CHART_SIZE / 2}
                  cy={CHART_SIZE / 2}
                  r={RADIUS}
                  stroke="#EEF2F7"
                  strokeWidth={STROKE_WIDTH}
                  fill="transparent"
                />

                {/* Segments */}
                {segments.map(cat => (
                  <Circle
                    key={cat.id}
                    cx={CHART_SIZE / 2}
                    cy={CHART_SIZE / 2}
                    r={RADIUS}
                    stroke={cat.color}
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={`${cat.segment} ${CIRCUMFERENCE}`}
                    strokeDashoffset={cat.offset - CIRCUMFERENCE * 0.25}
                  />
                ))}
              </Svg>

              {/* Center overlay */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={[styles.fs28, styles.fw800, styles.textNavy]}>
                  {expenseRatio}%
                </Text>
                <Text style={[styles.textGray, styles.fs13, styles.mt1]}>
                  of income
                </Text>
              </View>
            </View>

            {/* ======== LEGEND ======== */}
            <View
              style={[
                styles.flexRow,
                styles.flexWrap,
                styles.justifyCenter,
                styles.mt5,
                { columnGap: 20, rowGap: 10 },
              ]}
            >
              {analyticsCategories.map(cat => (
                <View
                  key={cat.id}
                  style={[styles.row, styles.alignCenter]}
                >
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: cat.color },
                    ]}
                  />
                  <Text style={[styles.textGray, styles.fs13, styles.ml1]}>
                    {cat.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ======== SUMMARY ======== */}
          <View style={[styles.flexRow, styles.mt5, { gap: 12 }]}>
            {/* Income */}
            <View style={[styles.flex1, styles.analyticsMiniCard]}>
              <View style={[styles.analyticsIconGreen]}>
                <ArrowUpRight size={18} color="#10B981" />
              </View>
              <Text style={[styles.textGray, styles.fs12, styles.fw600, styles.mt3]}>
                Income
              </Text>
              <Text style={[styles.fs20, styles.fw700, styles.textNavy, styles.mt1]}>
                {formatCurrency(totalIncome)}
              </Text>
            </View>

            {/* Expense */}
            <View style={[styles.flex1, styles.analyticsMiniCard]}>
              <View style={[styles.analyticsIconRed]}>
                <ArrowDownRight size={18} color="#EF4444" />
              </View>
              <Text style={[styles.textGray, styles.fs12, styles.fw600, styles.mt3]}>
                Expense
              </Text>
              <Text style={[styles.fs20, styles.fw700, styles.textNavy, styles.mt1]}>
                {formatCurrency(totalSpent)}
              </Text>
            </View>

            {/* Savings */}
            <View style={[styles.flex1, styles.analyticsMiniCard]}>
              <View style={[styles.analyticsIconBlue]}>
                <PiggyBank size={18} color="#2563EB" />
              </View>
              <Text style={[styles.textGray, styles.fs12, styles.fw600, styles.mt3]}>
                Savings
              </Text>
              <Text style={[styles.fs20, styles.fw700, styles.textNavy, styles.mt1]}>
                {formatCurrency(totalIncome - totalSpent)}
              </Text>
            </View>
          </View>

          {/* ======== INSIGHTS ======== */}
          <View style={[styles.card, styles.mt5]}>
            <Text style={[styles.fs16, styles.fw700, styles.textNavy, styles.mb4]}>
              Insights
            </Text>

            <View style={[styles.row, styles.alignCenter]}>
              <View style={[styles.insightIcon]}>
                <TrendingUp size={18} color="#2563EB" />
              </View>
              <View style={styles.flex1}>
                <Text style={[styles.fw600, styles.textNavy, styles.fs15]}>
                  Shopping increased by 18%
                </Text>
                <Text style={[styles.textGray, styles.fs13, styles.mt1]}>
                  compared to last month
                </Text>
              </View>
            </View>
          </View>

          {/* ======== TOP CATEGORIES ======== */}
          <View style={styles.mt5}>
            <Text style={[styles.fs18, styles.fw700, styles.textNavy, styles.mb4]}>
              Top Categories
            </Text>

            <View style={styles.card}>
              {analyticsCategories.map((cat, index) => {
                const Icon = LucideIcons[cat.icon];
                return (
                  <View key={cat.id}>
                    <View style={[styles.catModernItem]}>
                      <View style={[styles.catModernLeft]}>
                        <View
                          style={[
                            styles.catModernIcon,
                            { backgroundColor: `${cat.color}18` },
                          ]}
                        >
                          <Icon size={20} color={cat.color} />
                        </View>
                        <View style={styles.flex1}>
                          <Text style={[styles.fw600, styles.textNavy, styles.fs15]}>
                            {cat.name}
                          </Text>
                          <Text style={[styles.textGray, styles.fs13, styles.mt1]}>
                            {cat.percentage}% of expenses
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.fw700, styles.textNavy, styles.fs16]}>
                        {formatCurrency(cat.amount)}
                      </Text>
                    </View>

                    <View style={[styles.catProgress]}>
                      <View
                        style={[
                          styles.catProgressFill,
                          {
                            width: `${cat.percentage}%`,
                            backgroundColor: cat.color,
                          },
                        ]}
                      />
                    </View>

                    {index !== analyticsCategories.length - 1 && (
                      <View style={[styles.divider, styles.my4]} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Analytics;
