import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  CircleArrowOutDownLeft,
  CircleArrowOutUpRight,
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
} from 'lucide-react-native';
import { useCurrency } from '@/context/CurrencyContext';
import colors from '@/styles/colors';
import styles from '@/styles';

const DISMISS_THRESHOLD = 120;
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={s.detailRow}>
      <Text style={s.detailLabel}>{label}</Text>
      <Text style={s.detailValue}>{value}</Text>
    </View>
  );
};

const TransactionDetailModal = ({ visible, onClose, onEdit, transaction }) => {
  const { formatCurrency } = useCurrency();
  const { height: screenHeight } = useWindowDimensions();

  const translateY = useSharedValue(0);

  const dismiss = useCallback(() => {
    translateY.value = 0;
    onClose();
  }, [onClose, translateY]);

  const panGesture = Gesture.Pan()
    .activeOffsetY(10)
    .onUpdate(e => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(e => {
      if (e.translationY > DISMISS_THRESHOLD || e.velocityY > 500) {
        translateY.value = withSpring(
          screenHeight,
          { damping: 30, stiffness: 300 },
          () => {
            runOnJS(dismiss)();
          },
        );
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!transaction) return null;

  const isPositive = transaction.amount > 0;
  const IconComponent = isPositive ? ArrowDownLeft : ArrowUpRight;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.flex1,
          {
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'flex-end',
          },
        ]}
      >
        {/* Tap-to-close hit area (behind the sheet) */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[s.sheet, sheetStyle]}>
            {/* Handle */}
            <View style={s.sheetHeader}>
              <View style={s.sheetHandle} />
            </View>

            {/* Edit button — inside sheet, uses responder system to bypass GestureDetector */}
            <View
              style={s.editBtn}
              onStartShouldSetResponder={() => true}
              onResponderRelease={() => onEdit?.(transaction)}
            >
              <Pencil size={18} color={colors.blue} strokeWidth={2.2} />
            </View>

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
                    <Text style={styles.textPrimary}>#{transaction.id}</Text>
                  </View>

                  <View style={s.divider} />

                  <DetailRow
                    label="Description"
                    value={transaction.description}
                  />
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
            </Animated.View>
          </GestureDetector>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
    justifyContent: 'flex-end',
  },
  sheet: {
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
  editBtn: {
    position: 'absolute',
    top: 22,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37,99,235,0.2)',
    zIndex: 10,
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
