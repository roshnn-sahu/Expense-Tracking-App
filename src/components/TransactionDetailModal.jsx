import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  CircleArrowOutDownLeft,
  CircleArrowOutUpRight,
  X,
} from 'lucide-react-native';
import { useCurrency } from '@/context/CurrencyContext';
import colors from '@/styles/colors';
import styles from '@/styles';

const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={s.detailRow}>
      <Text style={s.detailLabel}>{label}</Text>
      <Text style={s.detailValue}>{value}</Text>
    </View>
  );
};

const TransactionDetailModal = ({ visible, onClose, transaction }) => {
  const { formatCurrency } = useCurrency();

  if (!transaction) return null;

  const isPositive = transaction.amount > 0;
  const IconComponent = isPositive
    ? CircleArrowOutDownLeft
    : CircleArrowOutUpRight;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[s.overlay]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={s.overlayBg} />
        </TouchableWithoutFeedback>

        <View style={s.sheet}>
          {/* Handle */}
          <View style={s.sheetHeader}>
            <View style={s.sheetHandle} />
          </View>

          {/* Close button */}
          <TouchableOpacity
            style={s.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <X size={18} color={colors.gray} strokeWidth={2} />
          </TouchableOpacity>

          <ScrollView
            style={s.scrollArea}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.scrollContent}
          >
            {/* Icon + Amount */}
            <View style={s.amountSection}>
              <View
                style={[
                  s.iconWrap,
                  {
                    backgroundColor: isPositive
                      ? 'rgba(16,185,129,0.12)'
                      : 'rgba(239,68,68,0.12)',
                  },
                ]}
              >
                <IconComponent
                  size={28}
                  color={isPositive ? colors.green : colors.red}
                  strokeWidth={1.8}
                />
              </View>

              <Text
                style={[
                  s.amount,
                  { color: isPositive ? colors.green : colors.red },
                ]}
              >
                {isPositive ? '+' : '-'}
                {formatCurrency(Math.abs(transaction.amount))}
              </Text>

              <Text style={s.typeLabel}>
                {transaction.type || (isPositive ? 'Income' : 'Expense')}
              </Text>
            </View>

            {/* Details Card */}
            <View style={s.detailsCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={s.txName}>{transaction.name}</Text>
                <Text style={styles.textPrimary}>{`#${transaction.id}`}</Text>
              </View>

              <View style={s.divider} />

              <DetailRow label="Description" value={transaction.description} />
              <DetailRow
                label="Category"
                value={transaction.category || 'Other'}
              />
              <DetailRow label="Party" value={transaction.party} />
              <DetailRow label="Bill No" value={transaction.bill_no} />
              <DetailRow label="Payment Mode" value={transaction.mode} />
              <DetailRow label="Txn ID" value={transaction.mode_no} />
              <DetailRow label="Dated" value={transaction.date} />
            </View>
          </ScrollView>

          {/* Close Action */}
          <TouchableOpacity
            style={s.closeAction}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={s.closeActionText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 20,
    maxHeight: '85%',
  },
  sheetHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grayBorder,
  },
  closeBtn: {
    position: 'absolute',
    top: 22,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArea: {
    flexGrow: 0,
    flexShrink: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  amount: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
  },
  txName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grayBorder,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.6)',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray,
    flex: 1,
    marginRight: 12,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navy,
    textAlign: 'right',
    flex: 1,
  },
  closeAction: {
    backgroundColor: colors.navy,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  closeActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.3,
  },
});

export default TransactionDetailModal;
