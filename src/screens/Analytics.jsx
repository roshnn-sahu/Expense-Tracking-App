import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  ChevronDown,
  TrendingUp,
} from 'lucide-react-native';
import styles from '../styles/custom';
import Styles from '../styles/style';

const categories = [
  {
    id: 1,
    name: 'Food & Drinks',
    amount: 850,
    percentage: 30,
    color: '#F59E0B',
    icon: Coffee,
  },
  {
    id: 2,
    name: 'Shopping',
    amount: 620,
    percentage: 22,
    color: '#8B5CF6',
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: 'Transport',
    amount: 340,
  import custom from '../styles/custom';
  import style from '../styles/style';
    icon: Car,
  },
  {
    id: 4,
    name: 'Bills & Utilities',
    amount: 450,
    percentage: 16,
    color: '#EF4444',
    icon: Home,
  },
  {
    id: 5,
    name: 'Health',
    amount: 280,
    percentage: 10,
    color: '#22C55E',
    icon: HeartPulse,
  },
  {
    id: 6,
    name: 'Entertainment',
    amount: 310,
    percentage: 11,
    color: '#EC4899',
    icon: Gamepad2,
  },
];

const CHART_SIZE = 200;
const STROKE_WIDTH = 20;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = () => {
  let accumulatedPercent = 0;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: CHART_SIZE,
        height: CHART_SIZE,
      }}
    >
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        {/* Background ring */}
        <Circle
          cx={CHART_SIZE / 2}
          cy={CHART_SIZE / 2}
          r={RADIUS}
          stroke="#F3F4F6"
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
        />
        {categories.map(cat => {
          const segmentLength = (cat.percentage / 100) * CIRCUMFERENCE;
          const offset =
            accumulatedPercent === 0
              ? 0
              : (accumulatedPercent / 100) * CIRCUMFERENCE;
          const dashArray = `${segmentLength} ${CIRCUMFERENCE - segmentLength}`;
          accumulatedPercent += cat.percentage;

          return (
            <Circle
              key={cat.id}
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              r={RADIUS}
              stroke={cat.color}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={dashArray}
              strokeDashoffset={offset - CIRCUMFERENCE * 0.25}
            />
          );
        })}
      </Svg>
      {/* Center Text */}
      <View style={styles.donutCenter}>
        <Text style={styles.donutCenterAmount}>$2,850</Text>
        <Text style={styles.donutCenterLabel}>Total spent</Text>
      </View>
    </View>
  );
};

const Analytics = () => {
  return (
    <View style={styles.canvas}>
      {/* Header */}
      <View style={[styles.headerRow, { paddingTop: 20 }]}>
        <Text style={styles.headerText}>Analytics</Text>
        <TouchableOpacity
          style={[
            utilStyles.row,
            {
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 14,
            },
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.analyticsPeriod}>This Month</Text>
          <ChevronDown
            size={16}
            color="#2563EB"
            strokeWidth={2.5}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
      >
        {/* Donut Chart Card */}
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <DonutChart />
          </View>

          {/* Legend */}
          <View
            style={[
              utilStyles.row,
              {
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 4,
                gap: 16,
              },
            ]}
          >
            {categories.slice(0, 3).map(cat => (
              <View key={cat.id} style={[utilStyles.row, { marginBottom: 4 }]}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    backgroundColor: cat.color,
                    marginRight: 6,
                  }}
                />
                <Text style={styles.captionText}>{cat.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary Row */}
        <View style={utilStyles.row}>
          <View style={[styles.incomeCard, { marginRight: 6, marginLeft: 0 }]}>
            <Text style={[styles.labelText, { marginBottom: 4 }]}>Income</Text>
            <Text
              style={[styles.amountText, { fontSize: 22 }, styles.textGreen]}
            >
              $4,500
            </Text>
          </View>
          <View style={[styles.expenseCard, { marginLeft: 6, marginRight: 0 }]}>
            <Text style={[styles.labelText, { marginBottom: 4 }]}>
              Expenses
            </Text>
            <Text style={[styles.amountText, { fontSize: 22 }, styles.textRed]}>
              $2,850
            </Text>
          </View>
          <View
            style={[
              styles.card,
              { flex: 1, marginLeft: 6, alignItems: 'center', padding: 16 },
            ]}
          >
            <TrendingUp size={22} color="#22C55E" strokeWidth={2.5} />
            <Text
              style={[
                styles.textGreen,
                { fontSize: 13, fontWeight: '600', marginTop: 4 },
              ]}
            >
              +8.2%
            </Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Categories</Text>

        {categories.map((cat, index) => {
          const CatIcon = cat.icon;
          return (
            <View key={cat.id} style={styles.categoryListItem}>
              <View
                style={[
                  styles.categoryIconWrap,
                  { backgroundColor: `${cat.color}15` },
                ]}
              >
                <CatIcon size={20} color={cat.color} strokeWidth={1.8} />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <View style={[utilStyles.row, { marginBottom: 6 }]}>
                  <View style={[styles.progressTrack, { flex: 1 }]}>
                    <View
                      style={[
                        styles.progressIndicator,
                        {
                          width: `${cat.percentage}%`,
                          backgroundColor: cat.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryMeta,
                      { marginLeft: 10, minWidth: 40, textAlign: 'right' },
                    ]}
                  >
                    {cat.percentage}%
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.categoryAmount,
                  { marginLeft: 12, minWidth: 70 },
                ]}
              >
                ${cat.amount}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Analytics;
