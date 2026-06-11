import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react-native';
import styles from '../styles';
import Header from '../components/Header';
import { analyticsCategories } from '../data/transactions';

const CHART_SIZE = 200;
const STROKE_WIDTH = 24;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = () => {
  let accumulatedPercent = 0;

  return (
    <View style={styles.donutContainer}>
      <View style={[styles.center, { width: CHART_SIZE, height: CHART_SIZE }]}>
        <Svg width={CHART_SIZE} height={CHART_SIZE}>
          <Circle
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            r={RADIUS}
            stroke={styles.colors.surfaceAlt}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {analyticsCategories.map(cat => {
            const segmentLength = (cat.percentage / 100) * CIRCUMFERENCE;
            const offset =
              accumulatedPercent === 0
                ? 0
                : (accumulatedPercent / 100) * CIRCUMFERENCE;
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
                strokeDasharray={`${segmentLength} ${
                  CIRCUMFERENCE - segmentLength
                }`}
                strokeDashoffset={offset - CIRCUMFERENCE * 0.25}
              />
            );
          })}
        </Svg>
        <View style={styles.donutCenter}>
          <Text style={styles.donutCenterAmount}>$2,850</Text>
          <Text style={styles.donutCenterLabel}>Total spent</Text>
        </View>
      </View>
    </View>
  );
};

const Analytics = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FC" barStyle="dark-content" />
      <View style={styles.container}>
        <Header
          title="Analytics"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Donut Chart Card */}
          <View style={styles.card}>
            <DonutChart />
            <View style={styles.legendContainer}>
              {analyticsCategories.slice(0, 3).map(cat => (
                <View key={cat.id} style={styles.row}>
                  <View
                    style={[styles.legendDot, { backgroundColor: cat.color }]}
                  />
                  <Text style={styles.legendText}>{cat.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Summary Row */}
          <View style={[styles.flexRow, styles.gap2, styles.mb1]}>
            <View style={[styles.summaryCard, styles.bgGreenLight]}>
              <View style={[styles.summaryIconWrap, styles.bgWhite]}>
                <ArrowUpRight
                  size={18}
                  color={styles.colors.green}
                  strokeWidth={2.5}
                />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.textGreenDark]}>
                $4,500
              </Text>
            </View>
            <View style={[styles.summaryCard, styles.bgRedLight]}>
              <View style={[styles.summaryIconWrap, styles.bgWhite]}>
                <ArrowDownRight
                  size={18}
                  color={styles.colors.red}
                  strokeWidth={2.5}
                />
              </View>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.textRedDark]}>
                $2,850
              </Text>
            </View>
            <View
              style={[styles.summaryCard, styles.alignCenter, styles.bgSurface]}
            >
              <TrendingUp
                size={22}
                color={styles.colors.green}
                strokeWidth={2.5}
              />
              <Text style={[styles.summaryLabel, styles.mt1]}>Change</Text>
              <Text
                style={[styles.summaryValue, styles.fontLG, styles.textGreen]}
              >
                +8.2%
              </Text>
            </View>
          </View>

          {/* Category Breakdown */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>

          <View style={styles.card}>
            {analyticsCategories.map((cat, index) => {
              const CatIcon = LucideIcons[cat.icon];
              return (
                <View key={cat.id}>
                  <View style={styles.catItem}>
                    <View
                      style={[
                        styles.catIconWrap,
                        { backgroundColor: `${cat.color}18` },
                      ]}
                    >
                      <CatIcon size={20} color={cat.color} strokeWidth={1.8} />
                    </View>
                    <View style={styles.catInfo}>
                      <Text style={styles.catName}>{cat.name}</Text>
                      <View style={styles.catBarRow}>
                        <View style={[styles.catBarTrack, styles.flex1]}>
                          <View
                            style={[
                              styles.catBarFill,
                              {
                                width: `${cat.percentage}%`,
                                backgroundColor: cat.color,
                              },
                            ]}
                          />
                        </View>
                        <Text style={styles.catPercent}>{cat.percentage}%</Text>
                      </View>
                    </View>
                    <Text style={styles.catAmount}>${cat.amount}</Text>
                  </View>
                  {index < analyticsCategories.length - 1 && (
                    <View style={[styles.divider, styles.ml15]} />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Analytics;
