import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Check, X } from 'lucide-react-native';
import styles from '@/styles';

const FILTER_SECTIONS = [
  { key: 'months', label: 'Months' },
  { key: 'dateRange', label: 'Date Range' },
  { key: 'categories', label: 'Categories' },
  { key: 'paymentTypes', label: 'Payment types' },
];

const generateMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    });
  }
  return months;
};

const generateQuickDateRanges = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const toLocalDateStr = d => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const ranges = [
    { label: 'Today', startDate: today, endDate: today },
    {
      label: 'Yesterday',
      startDate: new Date(today.getTime() - 86400000),
      endDate: new Date(today.getTime() - 86400000),
    },
    {
      label: 'This Week',
      startDate: new Date(today.getTime() - today.getDay() * 86400000),
      endDate: today,
    },
    {
      label: 'Last Week',
      startDate: new Date(today.getTime() - (today.getDay() + 7) * 86400000),
      endDate: new Date(today.getTime() - today.getDay() * 86400000 - 1),
    },
    {
      label: 'This Month',
      startDate: new Date(now.getFullYear(), now.getMonth(), 1),
      endDate: today,
    },
    {
      label: 'Last Month',
      startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      endDate: new Date(now.getFullYear(), now.getMonth(), 0),
    },
    {
      label: 'Last 3 Months',
      startDate: new Date(now.getFullYear(), now.getMonth() - 3, 1),
      endDate: today,
    },
    {
      label: 'Last 6 Months',
      startDate: new Date(now.getFullYear(), now.getMonth() - 6, 1),
      endDate: today,
    },
    {
      label: 'This Year',
      startDate: new Date(now.getFullYear(), 0, 1),
      endDate: today,
    },
    {
      label: 'Last Year',
      startDate: new Date(now.getFullYear() - 1, 0, 1),
      endDate: new Date(now.getFullYear() - 1, 11, 31),
    },
  ];

  return ranges.map(r => ({
    label: r.label,
    startDate: toLocalDateStr(r.startDate),
    endDate: toLocalDateStr(r.endDate),
  }));
};

const DEFAULT_CATEGORIES = [
  'Food',
  'Shopping',
  'Transport',
  'Housing',
  'Health',
  'Entertainment',
  'Bills',
  'Travel',
  'Salary',
  'Investment',
];

const DEFAULT_PAYMENT_TYPES = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'UPI',
  'Other',
];

const CheckboxItem = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[
      styles.row,
      styles.alignCenter,
      styles.justifyBetween,
      {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
      },
    ]}
  >
    <Text style={{ fontSize: 15, color: '#0F172A', fontWeight: '500' }}>
      {label}
    </Text>
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: isSelected ? '#2563EB' : '#CBD5E1',
        backgroundColor: isSelected ? '#2563EB' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
    </View>
  </TouchableOpacity>
);

const FilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters,
  categories = DEFAULT_CATEGORIES,
  paymentTypes = DEFAULT_PAYMENT_TYPES,
}) => {
  const [activeSection, setActiveSection] = useState('months');
  const [selectedMonths, setSelectedMonths] = useState(
    initialFilters?.months || [],
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters?.categories || [],
  );
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState(
    initialFilters?.paymentTypes || [],
  );
  const [selectedDateRange, setSelectedDateRange] = useState(
    initialFilters?.dateRange || null,
  );

  const months = useMemo(() => generateMonths(), []);
  const quickDateRanges = useMemo(() => generateQuickDateRanges(), []);

  const toggleItem = useCallback((list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedMonths([]);
    setSelectedCategories([]);
    setSelectedPaymentTypes([]);
    setSelectedDateRange(null);
  }, []);

  const handleApply = useCallback(() => {
    onApply({
      months: selectedMonths,
      categories: selectedCategories,
      paymentTypes: selectedPaymentTypes,
      dateRange: selectedDateRange,
    });
    onClose();
  }, [
    selectedMonths,
    selectedCategories,
    selectedPaymentTypes,
    selectedDateRange,
    onApply,
    onClose,
  ]);

  const hasActiveFilters =
    selectedMonths.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPaymentTypes.length > 0 ||
    selectedDateRange !== null;

  const activeCount =
    selectedMonths.length +
    selectedCategories.length +
    selectedPaymentTypes.length +
    (selectedDateRange ? 1 : 0);

  const renderSectionContent = () => {
    if (activeSection === 'months') {
      return months.map(month => (
        <CheckboxItem
          key={month.value}
          label={month.label}
          isSelected={selectedMonths.includes(month.value)}
          onPress={() =>
            toggleItem(selectedMonths, setSelectedMonths, month.value)
          }
        />
      ));
    }

    if (activeSection === 'dateRange') {
      return (
        <View>
          {quickDateRanges.map(range => (
            <CheckboxItem
              key={range.label}
              label={range.label}
              isSelected={
                selectedDateRange?.startDate === range.startDate &&
                selectedDateRange?.endDate === range.endDate
              }
              onPress={() => {
                if (
                  selectedDateRange?.startDate === range.startDate &&
                  selectedDateRange?.endDate === range.endDate
                ) {
                  setSelectedDateRange(null);
                } else {
                  setSelectedDateRange(range);
                }
              }}
            />
          ))}
        </View>
      );
    }

    if (activeSection === 'categories') {
      return categories.map(cat => (
        <CheckboxItem
          key={cat}
          label={cat}
          isSelected={selectedCategories.includes(cat)}
          onPress={() =>
            toggleItem(selectedCategories, setSelectedCategories, cat)
          }
        />
      ));
    }

    if (activeSection === 'paymentTypes') {
      return paymentTypes.map(pt => (
        <CheckboxItem
          key={pt}
          label={pt}
          isSelected={selectedPaymentTypes.includes(pt)}
          onPress={() =>
            toggleItem(selectedPaymentTypes, setSelectedPaymentTypes, pt)
          }
        />
      ));
    }

    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            marginTop: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* HEADER */}
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyBetween,
              {
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 14,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F5F9',
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#0F172A',
              }}
            >
              Filters
            </Text>
            <View style={[styles.row, styles.alignCenter]}>
              {hasActiveFilters && (
                <TouchableOpacity
                  onPress={handleClearAll}
                  style={{ marginRight: 16 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#64748B',
                    }}
                  >
                    Clear all
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                style={[styles.iconBtn, styles.bgSurfaceAlt]}
              >
                <X size={18} color="#0F172A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* LEFT SIDEBAR */}
            <View
              style={{
                width: 140,
                backgroundColor: '#F8FAFC',
                borderRightWidth: 1,
                borderRightColor: '#F1F5F9',
              }}
            >
              {FILTER_SECTIONS.map(section => {
                const isActive = activeSection === section.key;
                const sectionCount =
                  section.key === 'months'
                    ? selectedMonths.length
                    : section.key === 'categories'
                    ? selectedCategories.length
                    : section.key === 'paymentTypes'
                    ? selectedPaymentTypes.length
                    : selectedDateRange
                    ? 1
                    : 0;

                return (
                  <TouchableOpacity
                    key={section.key}
                    activeOpacity={0.7}
                    onPress={() => setActiveSection(section.key)}
                    style={[
                      {
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        borderLeftWidth: 3,
                        borderLeftColor: isActive ? '#2563EB' : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: isActive ? '700' : '500',
                        color: isActive ? '#0F172A' : '#94A3B8',
                      }}
                    >
                      {section.label}
                    </Text>
                    {sectionCount > 0 && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#2563EB',
                          marginTop: 2,
                          fontWeight: '600',
                        }}
                      >
                        {sectionCount} selected
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* RIGHT CONTENT */}
            <View style={{ flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {renderSectionContent()}
              </ScrollView>
            </View>
          </View>

          {/* APPLY BUTTON */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderTopWidth: 1,
              borderTopColor: '#F1F5F9',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleApply}
              style={{
                backgroundColor: '#2563EB',
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: hasActiveFilters ? '#FFFFFF' : '#94A3B8',
                }}
              >
                Apply{activeCount > 0 ? ` (${activeCount})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
