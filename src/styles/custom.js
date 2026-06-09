const { StyleSheet } = require('react-native');

// ─── Design Tokens ───────────────────────────────────────────
const colors = {
  bg: '#F8F9FC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F4F9',
  navy: '#0F172A',
  navyDark: '#1E293B',
  slate: '#475569',
  gray: '#6B7280',
  grayLight: '#94A3B8',
  grayBorder: '#E2E8F0',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  blueDark: '#1D4ED8',
  green: '#10B981',
  greenLight: '#ECFDF5',
  greenDark: '#059669',
  red: '#EF4444',
  redLight: '#FEF2F2',
  redDark: '#DC2626',
  amber: '#F59E0B',
  amberLight: '#FFFBEB',
  purple: '#8B5CF6',
  purpleLight: '#F5F3FF',
  pink: '#EC4899',
  pinkLight: '#FDF2F8',
  teal: '#14B8A6',
  tealLight: '#F0FDFA',
};

const shadows = {
  sm: {
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  md: {
    elevation: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  lg: {
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
};

const styles = StyleSheet.create({
  // ═══════════════════════════════════════════════════════════
  //  LAYOUT
  // ═══════════════════════════════════════════════════════════
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  // ═══════════════════════════════════════════════════════════
  //  HEADER
  // ═══════════════════════════════════════════════════════════
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.4,
  },

  // ═══════════════════════════════════════════════════════════
  //  BALANCE CARD (Hero)
  // ═══════════════════════════════════════════════════════════
  balanceCard: {
    borderRadius: 28,
    padding: 28,
    marginBottom: 20,
    backgroundColor: colors.surface,
    ...shadows.lg,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.navy,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -1.5,
  },
  balanceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  balanceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  balanceBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.green,
  },
  balancePeriod: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
  },

  // ═══════════════════════════════════════════════════════════
  //  INCOME / EXPENSE ROW CARDS
  // ═══════════════════════════════════════════════════════════
  ieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 18,
    flex: 1,
    ...shadows.sm,
  },
  ieIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ieLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  ieAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.5,
  },

  // ═══════════════════════════════════════════════════════════
  //  SECTION HEADERS
  // ═══════════════════════════════════════════════════════════
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
  },

  // ═══════════════════════════════════════════════════════════
  //  CARDS (Reusable)
  // ═══════════════════════════════════════════════════════════
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...shadows.md,
  },
  cardCompact: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...shadows.sm,
  },

  // ═══════════════════════════════════════════════════════════
  //  TRANSACTION ITEMS
  // ═══════════════════════════════════════════════════════════
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  txInfo: {
    flex: 1,
  },
  txName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
    marginBottom: 2,
  },
  txMeta: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.grayLight,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: -0.3,
  },
  txDivider: {
    height: 1,
    backgroundColor: colors.grayBorder,
    marginLeft: 62,
  },

  // ═══════════════════════════════════════════════════════════
  //  BUTTONS
  // ═══════════════════════════════════════════════════════════
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ═══════════════════════════════════════════════════════════
  //  CATEGORY PILLS
  // ═══════════════════════════════════════════════════════════
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryPillActive: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blue,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate,
    marginLeft: 8,
  },
  categoryPillTextActive: {
    color: colors.blue,
    fontWeight: '600',
  },

  // ═══════════════════════════════════════════════════════════
  //  KEYPAD (Add Transaction)
  // ═══════════════════════════════════════════════════════════
  keypadContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  keyBtn: {
    width: 78,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: colors.surfaceAlt,
  },
  keyBtnZero: {
    width: 174,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: colors.surfaceAlt,
  },
  keyBtnText: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.navy,
  },
  amountDisplay: {
    fontSize: 44,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -1.5,
    textAlign: 'center',
    paddingVertical: 8,
  },
  amountLabel: {
    fontSize: 13,
    color: colors.grayLight,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ═══════════════════════════════════════════════════════════
  //  DONUT CHART (Analytics)
  // ═══════════════════════════════════════════════════════════
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.8,
  },
  donutCenterLabel: {
    fontSize: 13,
    color: colors.grayLight,
    fontWeight: '500',
    marginTop: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  CATEGORY BREAKDOWN LIST
  // ═══════════════════════════════════════════════════════════
  catItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  catIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  catInfo: {
    flex: 1,
  },
  catName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
    marginBottom: 8,
  },
  catBarTrack: {
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  catBarFill: {
    height: 6,
    borderRadius: 3,
  },
  catBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
    marginLeft: 10,
    minWidth: 36,
    textAlign: 'right',
  },
  catAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navy,
    marginLeft: 12,
    minWidth: 60,
    textAlign: 'right',
    letterSpacing: -0.3,
  },

  // ═══════════════════════════════════════════════════════════
  //  SUMMARY / STATS CARDS
  // ═══════════════════════════════════════════════════════════
  summaryCard: {
    borderRadius: 20,
    padding: 18,
    flex: 1,
    ...shadows.sm,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  summaryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  // ═══════════════════════════════════════════════════════════
  //  LEGEND
  // ═══════════════════════════════════════════════════════════
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 20,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.slate,
  },

  // ═══════════════════════════════════════════════════════════
  //  TRANSACTIONS SCREEN
  // ═══════════════════════════════════════════════════════════
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blue,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate,
  },
  filterChipTextActive: {
    color: colors.blue,
    fontWeight: '600',
  },
  dateHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },

  // ═══════════════════════════════════════════════════════════
  //  PROFILE / USER SCREEN
  // ═══════════════════════════════════════════════════════════
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 28,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...shadows.md,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.grayLight,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
  },
  menuArrow: {
    fontSize: 18,
    color: colors.grayBorder,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.grayBorder,
    marginLeft: 56,
  },

  // ═══════════════════════════════════════════════════════════
  //  TYPOGRAPHY HELPERS
  // ═══════════════════════════════════════════════════════════
  textNavy: { color: colors.navy },
  textGreen: { color: colors.green },
  textRed: { color: colors.red },
  textBlue: { color: colors.blue },
  textGray: { color: colors.gray },
  textGrayLight: { color: colors.grayLight },
  textWhite: { color: '#FFFFFF' },
  textAmber: { color: colors.amber },
  textPurple: { color: colors.purple },
  textPink: { color: colors.pink },
});

export { colors, shadows };
export default styles;
