import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  /* =========================
     SCREEN
  ========================= */
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 120,
  },

  /* =========================
     HEADER
  ========================= */

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.6,
  },

  /* =========================
     GREETING
  ========================= */

  greeting: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -1.8,
  },

  greetingSub: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 2,
    lineHeight: 22,
    fontWeight: '500',
  },

  /* =========================
     CARD
  ========================= */

  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },

  cardCompact: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  welcomeContainer: {
    marginTop: 4,
    marginBottom: 24,
  },

  transactionsSection: {
    marginTop: 4,
  },

  /* =========================
     BALANCE CARD
  ========================= */

  balanceCard: {
    borderRadius: 28,
    padding: 28,
    marginBottom: 20,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
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
    fontSize: 36,
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
    color: colors.grayLight,
  },

  /* =========================
     INCOME / EXPENSE CARDS
  ========================= */

  ieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 8,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },

  ieIconWrap: {
    width: 33,
    height: 33,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
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
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.5,
  },

  /* =========================
     TRANSACTION CARD
  ========================= */

  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    position: "relative"
  },

  txIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  txInfo: { flex: 1 },

  txName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navy,
    lineHeight: 14,
  },

  txMeta: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.grayLight,
  },

  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: -0.3,
  },

  txDivider: {
    height: 1,
    backgroundColor: colors.grayBorder,
    marginLeft: 62,
  },

  transactionCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 16,
  },

  /* =========================
     DATE / SECTION LABELS
  ========================= */

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

  /* =========================
     SECTION HEADER
  ========================= */

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

  /* =========================
     ANALYTICS / DONUT CHART
  ========================= */

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    marginRight: 6,
  },

  /* =========================
     ANALYTICS MINI CARDS
  ========================= */

  analyticsMiniCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    flex: 1,
  },

  analyticsIconGreen: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
  },

  analyticsIconRed: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
  },

  analyticsIconBlue: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  insightIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  /* =========================
     CATEGORY MODERN LIST
  ========================= */

  catModernItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  catModernLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  catModernIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  catProgress: {
    height: 8,
    backgroundColor: '#EEF2F7',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
  },

  catProgressFill: {
    height: 8,
    borderRadius: 999,
  },

  /* =========================
     PROFILE
  ========================= */

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
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

  /* =========================
     MENU / SETTINGS
  ========================= */

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

  menuDivider: {
    height: 1,
    backgroundColor: colors.grayBorder,
    marginLeft: 56,
  },

  /* =========================
     DRAWER
  ========================= */

  drawerHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorder,
  },

  drawerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  drawerUserName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.3,
  },

  drawerUserEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.grayLight,
    marginTop: 2,
  },

  drawerSection: {
    paddingTop: 12,
    paddingHorizontal: 6,
  },

  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 2,
  },

  drawerItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  drawerItemLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.navy,
  },

  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  /* =========================
     FILTER CHIPS
  ========================= */

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

  fs15: {
    fontSize: 15,
  },

});