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
import { Table, Row, Rows } from 'react-native-table-component';
import { format } from 'date-fns';
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

const Statement = ({ navigation }) => {
  const { formatCurrency } = useCurrency();

  const [fromDate, setFromDate] = useState(getFirstOfMonth());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;
    data.forEach(item => {
      if (item.amount > 0) income += item.amount;
      else expense += Math.abs(item.amount);
    });
    return { income, expense, balance: income - expense };
  }, [data]);

  const handleGetStatement = async () => {
    setLoading(true);
    setFetched(true);
    try {
      const fromKey = formatDateKey(fromDate);
      const toKey = formatDateKey(toDate);
      const result = await getStatement(fromKey, toKey);
      setData(result);
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
    } finally {
      setLoading(false);
    }
  };

  // Build table data
  const tableHead = ['Date', 'Name', 'Expense', 'Income', 'Closing'];
  const tableWidths = [65, 140, 70, 70, 70];

  const tableData = useMemo(() => {
    return data.map(item => [
      format(item.date, 'dd MMM yy'),
      item.name,
      item.amount < 0 ? formatCurrency(Math.abs(item.amount)) : '',
      item.amount > 0 ? formatCurrency(item.amount) : '',
      item.closing ? formatCurrency(item.closing) : '',
    ]);
  }, [data]);

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
                  backgroundColor: loading ? '#93C5FD' : colors.blue,
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

          {/* SUMMARY BAR - shown only after fetching */}
          {fetched && (
            <View
              style={[
                styles.row,
                {
                  backgroundColor: '#F8FAFC',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                },
              ]}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={[
                    styles.fs11,
                    styles.fw600,
                    styles.textGray,
                    styles.mb1,
                  ]}
                >
                  Income
                </Text>
                <Text
                  style={[styles.fs16, styles.fw700, { color: colors.green }]}
                >
                  {formatCurrency(summary.income)}
                </Text>
              </View>

              <View
                style={{
                  width: 1,
                  backgroundColor: '#E2E8F0',
                  marginHorizontal: 12,
                }}
              />

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={[
                    styles.fs11,
                    styles.fw600,
                    styles.textGray,
                    styles.mb1,
                  ]}
                >
                  Expense
                </Text>
                <Text
                  style={[styles.fs16, styles.fw700, { color: colors.red }]}
                >
                  {formatCurrency(summary.expense)}
                </Text>
              </View>

              <View
                style={{
                  width: 1,
                  backgroundColor: '#E2E8F0',
                  marginHorizontal: 12,
                }}
              />

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={[
                    styles.fs11,
                    styles.fw600,
                    styles.textGray,
                    styles.mb1,
                  ]}
                >
                  Balance
                </Text>
                <Text
                  style={[
                    styles.fs16,
                    styles.fw700,
                    {
                      color: summary.balance >= 0 ? colors.green : colors.red,
                    },
                  ]}
                >
                  {formatCurrency(summary.balance)}
                </Text>
              </View>
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
                  borderColor: colors.blue,
                  paddingVertical: 14,
                  marginBottom: 16,
                },
              ]}
            >
              <Download size={18} color={colors.blue} />
              <Text
                style={[
                  styles.ml2,
                  styles.fs15,
                  styles.fw600,
                  { color: colors.blue },
                ]}
              >
                Export to PDF
              </Text>
            </TouchableOpacity>
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

                      {/* TABLE BODY */}
                      <Rows
                        data={tableData}
                        widthArr={tableWidths}
                        textStyle={{
                          color: '#1E293B',
                          fontSize: 13,
                          fontWeight: '500',
                          paddingVertical: 10,
                          paddingHorizontal: 0,
                          textAlign: 'center',
                        }}
                      />
                    </Table>
                  </View>
                </ScrollView>
              )}
            </View>
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
