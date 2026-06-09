import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react-native';
import custom, { colors } from '../styles/custom';
import Header from '../components/Header';

const categories = [
  { id: 1, name: 'Food & Drinks', amount: 850, percentage: 30, color: colors.amber, icon: Coffee },
  { id: 2, name: 'Shopping', amount: 620, percentage: 22, color: colors.purple, icon: ShoppingBag },
  { id: 3, name: 'Transport', amount: 340, percentage: 12, color: colors.blue, icon: Car },
  { id: 4, name: 'Bills & Utilities', amount: 450, percentage: 16, color: colors.red, icon: Home },
  { id: 5, name: 'Health', amount: 280, percentage: 10, color: colors.green, icon: HeartPulse },
  { id: 6, name: 'Entertainment', amount: 310, percentage: 11, color: colors.pink, icon: Gamepad2 },
];

const CHART_SIZE = 200;
const STROKE_WIDTH = 24;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = () => {
  let accumulatedPercent = 0;

  return (
    <View style={custom.donutContainer}>
      <View style={{ width: CHART_SIZE, height: CHART_SIZE, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={CHART_SIZE} height={CHART_SIZE}>
          <Circle
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            r={RADIUS}
            stroke={colors.surfaceAlt}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {categories.map(cat => {
            const segmentLength = (cat.percentage / 100) * CIRCUMFERENCE;
            const offset = accumulatedPercent === 0 ? 0 : (accumulatedPercent / 100) * CIRCUMFERENCE;
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
                strokeDasharray={`${segmentLength} ${CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={offset - CIRCUMFERENCE * 0.25}
              />
            );
          })}
        </Svg>
        <View style={custom.donutCenter}>
          <Text style={custom.donutCenterAmount}>$2,850</Text>
          <Text style={custom.donutCenterLabel}>Total spent</Text>
        </View>
      </View>
    </View>
  );
};

const Analytics = () => {
  return (
    <View style={custom.container}>
      <Header title="Analytics" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {/* Donut Chart Card */}
        <View style={custom.card}>
          <DonutChart />

          {/* Legend */}
          <View style={custom.legendContainer}>
            {categories.slice(0, 3).map(cat => (
              <View key={cat.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[custom.legendDot, { backgroundColor: cat.color }]} />
                <Text style={custom.legendText}>{cat.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary Row */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 4 }}>
          <View style={[custom.summaryCard, { backgroundColor: colors.greenLight }]}>
            <View style={[custom.summaryIconWrap, { backgroundColor: '#FFFFFF' }]}>
              <ArrowUpRight size={18} color={colors.green} strokeWidth={2.5} />
            </View>
            <Text style={custom.summaryLabel}>Income</Text>
            <Text style={[custom.summaryValue, { color: colors.greenDark }]}>$4,500</Text>
          </View>
          <View style={[custom.summaryCard, { backgroundColor: colors.redLight }]}>
            <View style={[custom.summaryIconWrap, { backgroundColor: '#FFFFFF' }]}>
              <ArrowDownRight size={18} color={colors.red} strokeWidth={2.5} />
            </View>
            <Text style={custom.summaryLabel}>Expenses</Text>
            <Text style={[custom.summaryValue, { color: colors.redDark }]}>$2,850</Text>
          </View>
          <View style={[custom.summaryCard, { alignItems: 'center', backgroundColor: colors.surface }]}>
            <TrendingUp size={22} color={colors.green} strokeWidth={2.5} />
            <Text style={[custom.summaryLabel, { marginTop: 4 }]}>Change</Text>
            <Text style={[custom.summaryValue, { fontSize: 18, color: colors.green }]}>+8.2%</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={custom.sectionHeader}>
          <Text style={custom.sectionTitle}>Categories</Text>
        </View>

        <View style={custom.card}>
          {categories.map((cat, index) => {
            const CatIcon = cat.icon;
            return (
              <View key={cat.id}>
                <View style={custom.catItem}>
                  <View style={[custom.catIconWrap, { backgroundColor: `${cat.color}18` }]}>
                    <CatIcon size={20} color={cat.color} strokeWidth={1.8} />
                  </View>
                  <View style={custom.catInfo}>
                    <Text style={custom.catName}>{cat.name}</Text>
                    <View style={custom.catBarRow}>
                      <View style={[custom.catBarTrack, { flex: 1 }]}>
                        <View style={[custom.catBarFill, { width: `${cat.percentage}%`, backgroundColor: cat.color }]} />
                      </View>
                      <Text style={custom.catPercent}>{cat.percentage}%</Text>
                    </View>
                  </View>
                  <Text style={custom.catAmount}>${cat.amount}</Text>
                </View>
                {index < categories.length - 1 && <View style={{ height: 1, backgroundColor: colors.grayBorder, marginLeft: 60 }} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Analytics;
