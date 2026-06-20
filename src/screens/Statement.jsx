import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Table, Row } from '@/components/Table';
import { format, parse } from 'date-fns';
import { Calendar, Download } from 'lucide-react-native';

import styles from '@/styles';
import colors from '@/styles/colors';
import Header from '@/components/includes/Header';
import { useCurrency } from '@/context/CurrencyContext';
import Toast from 'react-native-toast-message';
import { getStatement } from '@/api';

const getFirstOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const formatDateDisplay = date => format(date, 'dd MMM yyyy');
const formatDateKey = date => format(date, 'yyyy-MM-dd');

const safeFormatDate = (dateStr, fmt) => {
  if (!dateStr) return '-';
  // Try standard Date parsing (works for ISO formats like "2026-06-19")
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return format(d, fmt);
  // Try custom API format: "01/Apr/2026, 02:08:03PM"
  const parsed = parse(dateStr, 'dd/MMM/yyyy, hh:mm:ssa', new Date());
  if (!isNaN(parsed.getTime())) return format(parsed, fmt);
  return '-';
};

const Statement = ({ navigation }) => {
  const { formatCurrency } = useCurrency();

  const [fromDate, setFromDate] = useState(getFirstOfMonth());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Earliest allowed From date is 1 year before To date
  const minFromDate = useMemo(() => {
    const date = new Date(toDate);
    date.setFullYear(date.getFullYear() - 1);
    return date;
  }, [toDate]);

  const summary = useMemo(() => {
    if (meta.income) {
      const income = meta.income || 0;
      const expense = meta.expense || 0;
      const opening = meta.opening_balance || 0;
      const closing = meta.closing || 0;
      const diff = meta.diff || 0;
      return { income, expense, opening, closing, diff };
    }
    let income = 0;
    let expense = 0;
    data.forEach(item => {
      if (item.amount > 0) income += item.amount;
      else expense += Math.abs(item.amount);
    });
    return {
      income,
      expense,
      balance: income - expense,
      opening: 0,
      closing: 0,
    };
  }, [data, meta]);

  const handleGetStatement = async () => {
    // Validate date range does not exceed 1 year (leap-year-aware)
    const yearAgo = new Date(toDate);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    if (fromDate < yearAgo) {
      Toast.show({
        type: 'warning',
        text1: 'Date range too large',
        text2:
          'Statement period cannot exceed 1 year. Please select a narrower range.',
        visibilityTime: 4000,
      });
      return;
    }

    setLoading(true);
    setFetched(true);
    try {
      const fromKey = formatDateKey(fromDate);
      const toKey = formatDateKey(toDate);

      const result = await getStatement(fromKey, toKey);

      setData(result.transactions);
      setMeta({
        closing: result.closing,
        opening_balance: result.opening_balance,
        income: result.income,
        expense: result.expense,
        diff: result.diff,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch statement.',
        visibilityTime: 4000,
      });
      setData([]);
      setMeta({});
    } finally {
      setLoading(false);
    }
  };

  // Build table data
  const tableHead = ['#', 'DATE', 'NAME', 'AMOUNT', 'CLOSING'];
  const tableWidths = [32, 75, 115, 90, 100];

  const cellBaseStyle = {
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 3,
    textAlign: 'center',
  };

  // Build rows with colored cells for expense/income
  const tableRows = useMemo(() => {
    let runningBalance = parseFloat(meta.opening_balance) || 0;
    return data.map((item, index) => {
      runningBalance += item.amount;
      return (
        <Row
          key={item.id ?? index}
          data={[
            String(index + 1),
            <Text style={{ fontSize: 12, textAlign: 'center' }}>
              {item.date}
            </Text>,
            item.name,
            item.amount < 0 ? (
              <Text
                style={{
                  ...cellBaseStyle,
                  color: colors.red,
                  fontWeight: '700',
                }}
              >{`\u2212 ${formatCurrency(Math.abs(item.amount))}`}</Text>
            ) : (
              <Text
                style={{
                  ...cellBaseStyle,
                  color: colors.green,
                  fontWeight: '700',
                }}
              >{`+ ${formatCurrency(item.amount)}`}</Text>
            ),

            <Text style={{ ...cellBaseStyle, color: '#1E293B' }}>
              {formatCurrency(runningBalance)}
            </Text>,
          ]}
          widthArr={tableWidths}
          style={{
            backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
            minHeight: 44,
          }}
          textStyle={{
            color: '#1E293B',
            fontSize: 13,
            fontWeight: '500',
            paddingVertical: 10,
            paddingHorizontal: 3,
            textAlign: 'center',
          }}
        />
      );
    });
  }, [data, meta.opening_balance]);

  // Footer totals
  const footerTotals = useMemo(() => {
    const opening = parseFloat(meta.opening_balance) || 0;
    let totalExpense = 0;
    let totalIncome = 0;
    let running = opening;
    data.forEach(item => {
      running += item.amount;
      if (item.amount < 0) totalExpense += Math.abs(item.amount);
      else totalIncome += item.amount;
    });
    return { totalExpense, totalIncome, closing: running };
  }, [data, meta.opening_balance]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <View style={styles.container}>
        <Header
          title="Statement"
          onMenuPress={() => navigation.getParent()?.openDrawer()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* DATE RANGE PICKER */}
          <View
            style={[
              styles.card,
              { padding: 20, marginBottom: 20, marginTop: 8 },
            ]}
          >
            <Text
              style={[
                styles.fs16,
                styles.fw700,
                styles.textNavy,
                { marginBottom: 16 },
              ]}
            >
              Select Statement Period
            </Text>

            <View style={[styles.row, { gap: 12 }]}>
              {/* FROM */}
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.fs12,
                    styles.fw600,
                    styles.textGray,
                    styles.mb1,
                  ]}
                >
                  From
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowFromPicker(true)}
                  style={[
                    styles.row,
                    styles.alignCenter,
                    {
                      height: 50,
                      borderRadius: 14,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 12,
                    },
                  ]}
                >
                  <Calendar size={18} color="#64748B" />
                  <Text
                    style={[
                      styles.ml2,
                      styles.fs14,
                      styles.fw500,
                      styles.textNavy,
                    ]}
                  >
                    {formatDateDisplay(fromDate)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* TO */}
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.fs12,
                    styles.fw600,
                    styles.textGray,
                    styles.mb1,
                  ]}
                >
                  To
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowToPicker(true)}
                  style={[
                    styles.row,
                    styles.alignCenter,
                    {
                      height: 50,
                      borderRadius: 14,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 12,
                    },
                  ]}
                >
                  <Calendar size={18} color="#64748B" />
                  <Text
                    style={[
                      styles.ml2,
                      styles.fs14,
                      styles.fw500,
                      styles.textNavy,
                    ]}
                  >
                    {formatDateDisplay(toDate)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* GET BUTTON */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleGetStatement}
              disabled={loading}
              style={[
                {
                  backgroundColor: loading ? '#1f61acff' : colors.primary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16,
                  elevation: loading ? 0 : 4,
                  shadowColor: '#2563EB',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: loading ? 0 : 0.2,
                  shadowRadius: 8,
                },
              ]}
            >
              {loading ? (
                <View style={[styles.row, styles.alignCenter]}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text
                    style={[
                      styles.ml2,
                      styles.fs16,
                      styles.fw700,
                      styles.textWhite,
                      { letterSpacing: 0.3 },
                    ]}
                  >
                    Loading...
                  </Text>
                </View>
              ) : (
                <Text
                  style={[
                    styles.fs16,
                    styles.fw700,
                    styles.textWhite,
                    { letterSpacing: 0.3 },
                  ]}
                >
                  Get Statement
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* SUMMARY CARD - modern 2x2 grid */}
          {fetched && (
            <View
              style={[
                styles.card,
                { marginBottom: 20, padding: 15, marginTop: 8 },
              ]}
            >
              <Text
                style={[
                  styles.fs16,
                  styles.fw700,
                  styles.textNavy,
                  { marginBottom: 18, letterSpacing: -0.3 },
                ]}
              >
                Summary
              </Text>

              <View style={[styles.flexRow, styles.gap3, styles.mb3]}>
                {/* OPENING */}
                <View
                  style={[styles.ieCard, { backgroundColor: colors.blueLight }]}
                >
                  <View
                    style={[styles.ieIconWrap, { backgroundColor: '#FFFFFF' }]}
                  >
                    <Text style={{ fontSize: 14 }}>📊</Text>
                  </View>
                  <View>
                    <Text style={styles.ieLabel}>Opening</Text>
                    <Text style={[styles.ieAmount, { color: colors.blue }]}>
                      {formatCurrency(summary.opening)}
                    </Text>
                  </View>
                </View>

                {/* INCOME */}
                <View
                  style={[
                    styles.ieCard,
                    { backgroundColor: colors.greenLight },
                  ]}
                >
                  <View
                    style={[styles.ieIconWrap, { backgroundColor: '#FFFFFF' }]}
                  >
                    <Text style={{ fontSize: 18 }}>📈</Text>
                  </View>
                  <View>
                    <Text style={styles.ieLabel}>Income</Text>
                    <Text
                      style={[styles.ieAmount, { color: colors.greenDark }]}
                    >
                      {formatCurrency(summary.income)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.flexRow, styles.gap3]}>
                {/* EXPENSE */}
                <View
                  style={[styles.ieCard, { backgroundColor: colors.redLight }]}
                >
                  <View
                    style={[styles.ieIconWrap, { backgroundColor: '#FFFFFF' }]}
                  >
                    <Text style={{ fontSize: 18 }}>📉</Text>
                  </View>
                  <View>
                    <Text style={styles.ieLabel}>Expense</Text>
                    <Text style={[styles.ieAmount, { color: colors.redDark }]}>
                      {formatCurrency(summary.expense)}
                    </Text>
                  </View>
                </View>

                {/* NET DIFFERENCE */}
                <View
                  style={[
                    styles.ieCard,
                    {
                      backgroundColor:
                        (summary.diff || 0) >= 0
                          ? colors.amberLight
                          : colors.redLight,
                    },
                  ]}
                >
                  <View
                    style={[styles.ieIconWrap, { backgroundColor: '#FFFFFF' }]}
                  >
                    <Text style={{ fontSize: 18 }}>
                      {(summary.diff || 0) >= 0 ? '✅' : '⚠️'}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.ieLabel}>Difference</Text>
                    <Text
                      style={[
                        styles.ieAmount,
                        {
                          color:
                            (summary.diff || 0) >= 0
                              ? colors.greenDark
                              : colors.redDark,
                        },
                      ]}
                    >
                      {formatCurrency(summary.diff)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* TABLE */}
          {fetched && (
            <View
              style={[
                {
                  padding: 0,
                  overflow: 'hidden',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                },
              ]}
            >
              {data.length === 0 ? (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Text style={[styles.fs16, styles.fw600, styles.textGray]}>
                    No transactions found
                  </Text>
                  <Text
                    style={[
                      styles.fs13,
                      styles.textGrayLight,
                      styles.mt1,
                      { textAlign: 'center' },
                    ]}
                  >
                    Try selecting a different date range.
                  </Text>
                </View>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ padding: 4 }}>
                    <Table
                      borderStyle={{
                        borderWidth: 0.5,
                        borderColor: '#E2E8F0',
                      }}
                    >
                      {/* TABLE HEADER */}
                      <Row
                        data={tableHead}
                        widthArr={tableWidths}
                        style={{
                          height: 46,
                          backgroundColor: styles.primary,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                        textStyle={{
                          color: '#FFFFFF',
                          fontSize: 12,
                          fontWeight: '700',
                          textAlign: 'center',
                          letterSpacing: 0.5,
                        }}
                      />
                      {/* OPENING BALANCE ROW */}
                      <Row
                        data={[
                          '',
                          <Text
                            style={{
                              ...cellBaseStyle,
                              color: '#64748B',
                              fontWeight: '600',
                            }}
                          >
                            OPENING
                          </Text>,
                          parseFloat(meta.opening_balance) < 0 ? (
                            <Text
                              style={{
                                ...cellBaseStyle,
                                color: colors.red,
                                fontWeight: '700',
                              }}
                            >
                              {`\u2212 ${formatCurrency(
                                Math.abs(parseFloat(meta.opening_balance)),
                              )}`}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                ...cellBaseStyle,
                                color: colors.green,
                                fontWeight: '700',
                              }}
                            >{`+ ${formatCurrency(
                              parseFloat(meta.opening_balance),
                            )}`}</Text>
                          ),

                          ,
                        ]}
                        widthArr={tableWidths}
                        style={{
                          height: 44,
                          backgroundColor: '#F1F5F9',
                        }}
                        textStyle={{
                          color: '#64748B',
                          fontSize: 13,
                          fontWeight: '600',
                          paddingVertical: 10,
                          paddingHorizontal: 3,
                          textAlign: 'center',
                        }}
                      />
                      {/* TABLE BODY */}
                      {tableRows}
                      {/* TABLE FOOTER */}
                      <Row
                        data={[
                          '',
                          '',
                          '',
                          <Text
                            style={{
                              ...cellBaseStyle,
                              color: '#FFFFFF',
                              fontWeight: '700',
                            }}
                          >
                            CLOSING
                          </Text>,

                          <Text
                            style={{
                              ...cellBaseStyle,
                              color: colors.green,
                              fontWeight: '700',
                            }}
                          >
                            {formatCurrency(footerTotals.closing)}
                          </Text>,
                        ]}
                        widthArr={tableWidths}
                        style={{
                          height: 46,
                          backgroundColor: '#1E293B',
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 12,
                        }}
                        textStyle={{
                          color: '#FFFFFF',
                          fontSize: 13,
                          fontWeight: '700',
                          textAlign: 'center',
                        }}
                      />{' '}
                    </Table>
                  </View>
                </ScrollView>
              )}
            </View>
          )}

          {/* EXPORT BUTTON */}
          {fetched && data.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                {
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: colors.primary,
                  paddingVertical: 14,
                  marginBottom: 16,
                },
              ]}
            >
              <Download size={18} color={colors.primary} />
              <Text
                style={[
                  styles.ml2,
                  styles.fs15,
                  styles.fw600,
                  { color: colors.primary },
                ]}
              >
                Export to PDF
              </Text>
            </TouchableOpacity>
          )}

          {/* Prompt when no data fetched yet */}
          {!fetched && (
            <View style={{ paddingVertical: 40, alignItems: 'center' }}>
              <Calendar size={48} color="#CBD5E1" />
              <Text
                style={[styles.fs16, styles.fw600, styles.textGray, styles.mt3]}
              >
                Select a date range
              </Text>
              <Text
                style={[
                  styles.fs13,
                  styles.textGrayLight,
                  styles.mt1,
                  { textAlign: 'center', paddingHorizontal: 20 },
                ]}
              >
                Choose From and To dates, then tap "Get Statement" to view your
                transactions.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* FROM DATE PICKER */}
        <DateTimePickerModal
          isVisible={showFromPicker}
          mode="date"
          date={fromDate}
          minimumDate={minFromDate}
          maximumDate={toDate}
          onConfirm={selected => {
            setFromDate(selected);
            setShowFromPicker(false);
          }}
          onCancel={() => setShowFromPicker(false)}
        />

        {/* TO DATE PICKER */}
        <DateTimePickerModal
          isVisible={showToPicker}
          mode="date"
          date={toDate}
          minimumDate={fromDate}
          maximumDate={new Date()}
          onConfirm={selected => {
            setToDate(selected);
            setShowToPicker(false);
          }}
          onCancel={() => setShowToPicker(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Statement;
