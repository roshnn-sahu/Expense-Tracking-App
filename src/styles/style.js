import { StyleSheet } from 'react-native';

// ─── Bootstrap v5 Design colors ─────────────────────────────
const colors = {
  // Primary palette (Bootstrap 5)
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  light: '#f8f9fa',
  dark: '#212529',
  white: '#ffffff',
  black: '#000000',
  // Extended palette
  navy: '#0F172A',
  navyDark: '#1E293B',
  slate: '#475569',
  gray: '#6B7280',
  grayLight: '#94A3B8',
  grayBorder: '#E2E8F0',
  green: '#10B981',
  greenLight: '#ECFDF5',
  greenDark: '#059669',
  red: '#EF4444',
  redLight: '#FEF2F2',
  redDark: '#DC2626',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  blueDark: '#1D4ED8',
  amber: '#F59E0B',
  amberLight: '#FFFBEB',
  purple: '#8B5CF6',
  purpleLight: '#F5F3FF',
  pink: '#EC4899',
  pinkLight: '#FDF2F8',
  teal: '#14B8A6',
  tealLight: '#F0FDFA',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F4F9',
  bg: '#F8F9FC',
};

const styles = StyleSheet.create({
  // ═══════════════════════════════════════════════════════════
  //  LAYOUT UTILITIES
  // ═══════════════════════════════════════════════════════════
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  containerFluid: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },

  // ═══════════════════════════════════════════════════════════
  //  MARGIN UTILITIES
  // ═══════════════════════════════════════════════════════════
  m0: { margin: 0 },
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  m5: { margin: 20 },
  mt0: { marginTop: 0 },
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  mt5: { marginTop: 20 },
  mt6: { marginTop: 24 },
  mt7: { marginTop: 28 },
  mt8: { marginTop: 32 },
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb5: { marginBottom: 20 },
  mb6: { marginBottom: 24 },
  mb8: { marginBottom: 32 },
  ml0: { marginLeft: 0 },
  ml1: { marginLeft: 4 },
  ml2: { marginLeft: 8 },
  ml3: { marginLeft: 12 },
  ml4: { marginLeft: 16 },
  ml14: { marginLeft: 56 },
  ml15: { marginLeft: 60 },
  mr0: { marginRight: 0 },
  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },
  mx0: { marginHorizontal: 0 },
  mx1: { marginHorizontal: 4 },
  mx2: { marginHorizontal: 8 },
  mx3: { marginHorizontal: 12 },
  mx4: { marginHorizontal: 16 },
  mx5: { marginHorizontal: 20 },
  my0: { marginVertical: 0 },
  my1: { marginVertical: 4 },
  my2: { marginVertical: 8 },
  my3: { marginVertical: 12 },
  my4: { marginVertical: 16 },
  my5: { marginVertical: 20 },

  // ═══════════════════════════════════════════════════════════
  //  PADDING UTILITIES
  // ═══════════════════════════════════════════════════════════
  p0: { padding: 0 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 20 },
  p6: { padding: 24 },
  p7: { padding: 28 },
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: 4 },
  pt2: { paddingTop: 8 },
  pt3: { paddingTop: 12 },
  pt4: { paddingTop: 16 },
  pt5: { paddingTop: 20 },
  pt6: { paddingTop: 24 },
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: 4 },
  pb2: { paddingBottom: 8 },
  pb3: { paddingBottom: 12 },
  pb4: { paddingBottom: 16 },
  pb5: { paddingBottom: 20 },
  pb6: { paddingBottom: 24 },
  pb7: { paddingBottom: 28 },
  pb8: { paddingBottom: 32 },
  pb10: { paddingBottom: 40 },
  pb12: { paddingBottom: 48 },
  pb14: { paddingBottom: 56 },
  px0: { paddingHorizontal: 0 },
  px1: { paddingHorizontal: 4 },
  px2: { paddingHorizontal: 8 },
  px3: { paddingHorizontal: 12 },
  px4: { paddingHorizontal: 16 },
  px5: { paddingHorizontal: 20 },
  px6: { paddingHorizontal: 24 },
  py0: { paddingVertical: 0 },
  py1: { paddingVertical: 4 },
  py2: { paddingVertical: 8 },
  py3: { paddingVertical: 12 },
  py4: { paddingVertical: 16 },
  py5: { paddingVertical: 20 },
  py6: { paddingVertical: 24 },
  py7: { paddingVertical: 28 },

  // ═══════════════════════════════════════════════════════════
  //  GAP UTILITIES
  // ═══════════════════════════════════════════════════════════
  gap1: { gap: 4 },
  gap2: { gap: 8 },
  gap3: { gap: 12 },
  gap4: { gap: 16 },
  gap5: { gap: 20 },
  gap6: { gap: 24 },

  // ═══════════════════════════════════════════════════════════
  //  TYPOGRAPHY UTILITIES
  // ═══════════════════════════════════════════════════════════
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  fontXS: { fontSize: 10 },
  fontSM: { fontSize: 12 },
  fontBase: { fontSize: 14 },
  fontMD: { fontSize: 16 },
  fontLG: { fontSize: 20 },
  fontXL: { fontSize: 24 },
  fontXXL: { fontSize: 28 },
  fontXXXL: { fontSize: 32 },
  fontHero: { fontSize: 42 },
  fw400: { fontWeight: '400' },
  fw500: { fontWeight: '500' },
  fw600: { fontWeight: '600' },
  fw700: { fontWeight: '700' },
  fw800: { fontWeight: '800' },
  textUppercase: { textTransform: 'uppercase' },
  textLowercase: { textTransform: 'lowercase' },
  textCapitalize: { textTransform: 'capitalize' },
  trackingTight: { letterSpacing: -0.5 },
  trackingTighter: { letterSpacing: -1.0 },
  trackingNormal: { letterSpacing: 0 },
  trackingWide: { letterSpacing: 0.5 },
  trackingWider: { letterSpacing: 0.8 },

  // Text colors
  textPrimary: { color: colors.primary },
  textSecondary: { color: colors.secondary },
  textSuccess: { color: colors.success },
  textDanger: { color: colors.danger },
  textWarning: { color: colors.warning },
  textInfo: { color: colors.info },
  textLight: { color: colors.light },
  textDark: { color: colors.dark },
  textWhite: { color: colors.white },
  textBlack: { color: colors.black },
  textNavy: { color: colors.navy },
  textSlate: { color: colors.slate },
  textGray: { color: colors.gray },
  textGrayLight: { color: colors.grayLight },
  textGreen: { color: colors.green },
  textGreenDark: { color: colors.greenDark },
  textRed: { color: colors.red },
  textRedDark: { color: colors.redDark },
  textBlue: { color: colors.blue },
  textBlueDark: { color: colors.blueDark },
  textAmber: { color: colors.amber },
  textPurple: { color: colors.purple },
  textPink: { color: colors.pink },
  textTeal: { color: colors.teal },

  // ═══════════════════════════════════════════════════════════
  //  BACKGROUND UTILITIES
  // ═══════════════════════════════════════════════════════════
  bgPrimary: { backgroundColor: colors.primary },
  bgSecondary: { backgroundColor: colors.secondary },
  bgSuccess: { backgroundColor: colors.success },
  bgDanger: { backgroundColor: colors.danger },
  bgWarning: { backgroundColor: colors.warning },
  bgInfo: { backgroundColor: colors.info },
  bgLight: { backgroundColor: colors.light },
  bgDark: { backgroundColor: colors.dark },
  bgWhite: { backgroundColor: colors.white },
  bgBlack: { backgroundColor: colors.black },
  bgNavy: { backgroundColor: colors.navy },
  bgSurface: { backgroundColor: colors.surface },
  bgSurfaceAlt: { backgroundColor: colors.surfaceAlt },
  bgGreenLight: { backgroundColor: colors.greenLight },
  bgRedLight: { backgroundColor: colors.redLight },
  bgBlueLight: { backgroundColor: colors.blueLight },
  bgAmberLight: { backgroundColor: colors.amberLight },
  bgPurpleLight: { backgroundColor: colors.purpleLight },
  bgPinkLight: { backgroundColor: colors.pinkLight },
  bgTealLight: { backgroundColor: colors.tealLight },
  bgApp: { backgroundColor: colors.bg },

  // ═══════════════════════════════════════════════════════════
  //  DISPLAY / FLEX HELPERS
  // ═══════════════════════════════════════════════════════════
  dFlex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  flexWrap: { flexWrap: 'wrap' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  alignStart: { alignItems: 'flex-start' },
  alignCenter: { alignItems: 'center' },
  alignEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },
  alignSelfCenter: { alignSelf: 'center' },

  // ═══════════════════════════════════════════════════════════
  //  SIZING
  // ═══════════════════════════════════════════════════════════
  w100: { width: '100%' },
  w75: { width: '75%' },
  w50: { width: '50%' },
  w25: { width: '25%' },
  h100: { height: '100%' },
  hFull: { height: '100%' },

  // ═══════════════════════════════════════════════════════════
  //  BORDERS & RADIUS
  // ═══════════════════════════════════════════════════════════
  border: { borderWidth: 1, borderColor: colors.grayBorder },
  borderTop: { borderTopWidth: 1, borderTopColor: colors.grayBorder },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: colors.grayBorder },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: colors.grayBorder },
  borderRight: { borderRightWidth: 1, borderRightColor: colors.grayBorder },
  borderVertical: { borderTopWidth: 1, borderTopColor: colors.grayBorder, borderBottomWidth: 1, borderBottomColor: colors.grayBorder },
  borderHorizontal: { borderLeftWidth: 1, borderLeftColor: colors.grayBorder, borderRightWidth: 1, borderRightColor: colors.grayBorder },
  borderWidth0: { borderWidth: 0 },
  rounded: { borderRadius: 8 },
  roundedSm: { borderRadius: 6 },
  roundedMd: { borderRadius: 12 },
  roundedLg: { borderRadius: 16 },
  roundedXL: { borderRadius: 20 },
  roundedXXL: { borderRadius: 24 },
  roundedXXXL: { borderRadius: 28 },
  roundedCircle: { borderRadius: 9999 },

  // ═══════════════════════════════════════════════════════════
  //  SHADOWS
  // ═══════════════════════════════════════════════════════════
  shadowSm: { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  shadowMd: { elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10 },
  shadowLg: { elevation: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20 },

  // ═══════════════════════════════════════════════════════════
  //  OVERFLOW / Z-INDEX / POSITIONING
  // ═══════════════════════════════════════════════════════════
  overflowHidden: { overflow: 'hidden' },
  overflowVisible: { overflow: 'visible' },
  z0: { zIndex: 0 },
  z10: { zIndex: 10 },
  z20: { zIndex: 20 },
  z30: { zIndex: 30 },
  z50: { zIndex: 50 },
  positionRelative: { position: 'relative' },
  positionAbsolute: { position: 'absolute' },
  top0: { top: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },

  // ═══════════════════════════════════════════════════════════
  //  SCROLL CONTAINERS
  // ═══════════════════════════════════════════════════════════
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  scrollContentCompact: { paddingHorizontal: 20, paddingBottom: 80 },

  // ═══════════════════════════════════════════════════════════
  //  DIVIDERS
  // ═══════════════════════════════════════════════════════════
  divider: { height: 1, backgroundColor: colors.grayBorder },
  dividerInset: { height: 1, backgroundColor: colors.grayBorder, marginLeft: 62 },
  dividerVertical: { width: 1, backgroundColor: colors.grayBorder },
  dividerThick: { height: 8, backgroundColor: colors.bg },

  // ═══════════════════════════════════════════════════════════
  //  ICON CONTAINERS
  // ═══════════════════════════════════════════════════════════
  iconBtn: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  iconBtnLg: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  iconBtnSm: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconBtnXl: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },

  // ═══════════════════════════════════════════════════════════
  //  CARD PATTERNS
  // ═══════════════════════════════════════════════════════════
  card: { backgroundColor: colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, ...StyleSheet.flatten({ elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10 }) },
  cardCompact: { backgroundColor: colors.surface, borderRadius: 20, padding: 16, marginBottom: 12, ...StyleSheet.flatten({ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }) },
  cardFlat: { backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 12 },

  // ═══════════════════════════════════════════════════════════
  //  HEADER
  // ═══════════════════════════════════════════════════════════
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.surface, marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy, letterSpacing: -0.4 },

  // ═══════════════════════════════════════════════════════════
  //  HOME - GREETING
  // ═══════════════════════════════════════════════════════════
  welcomeRow: { marginBottom: 24 },
  welcomeTitle: { fontSize: 28, fontWeight: '800', color: colors.navy, letterSpacing: -1 },
  welcomeSubtitle: { fontSize: 14, color: colors.slate, marginTop: 4 },
  greeting: { fontSize: 30, fontWeight: '800', color: colors.navy, letterSpacing: -1 },
  greetingSub: { fontSize: 15, color: colors.slate, marginTop: 6 },

  // ═══════════════════════════════════════════════════════════
  //  HOME - BALANCE HERO
  // ═══════════════════════════════════════════════════════════
  balanceHero: { marginTop: 24, backgroundColor: colors.surface, borderRadius: 32, padding: 28, ...StyleSheet.flatten({ elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 20 }) },
  balanceTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceHeroAmount: { fontSize: 42, fontWeight: '800', color: colors.navy, marginTop: 18, letterSpacing: -2 },
  balanceBottomText: { marginTop: 8, color: colors.grayLight, fontSize: 13 },

  // ═══════════════════════════════════════════════════════════
  //  HOME - QUICK STAT CARDS
  // ═══════════════════════════════════════════════════════════
  quickCard: { flex: 1, borderRadius: 24, padding: 20 },
  quickIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  quickLabel: { fontSize: 13, fontWeight: '600', color: colors.slate },
  quickAmount: { fontSize: 24, fontWeight: '800', marginTop: 6 },

  // ═══════════════════════════════════════════════════════════
  //  BALANCE CARD
  // ═══════════════════════════════════════════════════════════
  balanceCard: { borderRadius: 28, padding: 28, marginBottom: 20, backgroundColor: colors.surface, ...StyleSheet.flatten({ elevation: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20 }) },
  balanceLabel: { fontSize: 13, fontWeight: '500', color: colors.navy, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 },
  balanceAmount: { fontSize: 42, fontWeight: '800', color: colors.navy, letterSpacing: -1.5 },
  balanceChangeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  balanceBadge: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  balanceBadgeText: { fontSize: 13, fontWeight: '700', color: colors.green },
  balancePeriod: { fontSize: 13, fontWeight: '500', color: colors.grayLight },

  // ═══════════════════════════════════════════════════════════
  //  INCOME / EXPENSE CARDS
  // ═══════════════════════════════════════════════════════════
  ieCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 18, flex: 1, ...StyleSheet.flatten({ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }) },
  ieIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  ieLabel: { fontSize: 12, fontWeight: '600', color: colors.gray, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  ieAmount: { fontSize: 20, fontWeight: '700', color: colors.navy, letterSpacing: -0.5 },

  // ═══════════════════════════════════════════════════════════
  //  SECTION HEADERS
  // ═══════════════════════════════════════════════════════════
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.navy, letterSpacing: -0.3 },
  sectionAction: { fontSize: 14, fontWeight: '600', color: colors.blue },

  // ═══════════════════════════════════════════════════════════
  //  TRANSACTION ITEMS
  // ═══════════════════════════════════════════════════════════
  txItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  txIconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  txInfo: { flex: 1 },
  txName: { fontSize: 15, fontWeight: '600', color: colors.navy, marginBottom: 2 },
  txMeta: { fontSize: 13, fontWeight: '500', color: colors.grayLight },
  txAmount: { fontSize: 16, fontWeight: '700', textAlign: 'right', letterSpacing: -0.3 },
  txDivider: { height: 1, backgroundColor: colors.grayBorder, marginLeft: 62 },

  // ═══════════════════════════════════════════════════════════
  //  FILTER CHIPS
  // ═══════════════════════════════════════════════════════════
  filterChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.surfaceAlt, marginRight: 8, borderWidth: 1.5, borderColor: 'transparent' },
  filterChipActive: { backgroundColor: colors.blueLight, borderColor: colors.blue },
  filterChipText: { fontSize: 14, fontWeight: '500', color: colors.slate },
  filterChipTextActive: { color: colors.blue, fontWeight: '600' },
  dateHeader: { fontSize: 13, fontWeight: '700', color: colors.gray, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8, marginBottom: 4, paddingHorizontal: 4 },

  // ═══════════════════════════════════════════════════════════
  //  DONUT CHART
  // ═══════════════════════════════════════════════════════════
  donutContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  donutCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  donutCenterAmount: { fontSize: 28, fontWeight: '800', color: colors.navy, letterSpacing: -0.8 },
  donutCenterLabel: { fontSize: 13, color: colors.grayLight, fontWeight: '500', marginTop: 2 },

  // ═══════════════════════════════════════════════════════════
  //  CATEGORY BREAKDOWN
  // ═══════════════════════════════════════════════════════════
  catItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  catIconWrap: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  catInfo: { flex: 1 },
  catName: { fontSize: 15, fontWeight: '600', color: colors.navy, marginBottom: 8 },
  catBarTrack: { height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, overflow: 'hidden' },
  catBarFill: { height: 6, borderRadius: 3 },
  catBarRow: { flexDirection: 'row', alignItems: 'center' },
  catPercent: { fontSize: 13, fontWeight: '600', color: colors.gray, marginLeft: 10, minWidth: 36, textAlign: 'right' },
  catAmount: { fontSize: 15, fontWeight: '700', color: colors.navy, marginLeft: 12, minWidth: 60, textAlign: 'right', letterSpacing: -0.3 },

  // ═══════════════════════════════════════════════════════════
  //  SUMMARY CARDS
  // ═══════════════════════════════════════════════════════════
  summaryCard: { borderRadius: 20, padding: 18, flex: 1, ...StyleSheet.flatten({ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }) },
  summaryLabel: { fontSize: 12, fontWeight: '600', color: colors.gray, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  summaryValue: { fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  summaryIconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },

  // ═══════════════════════════════════════════════════════════
  //  LEGEND
  // ═══════════════════════════════════════════════════════════
  legendContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 8, gap: 20 },
  legendDot: { width: 10, height: 10, borderRadius: 3, marginRight: 6 },
  legendText: { fontSize: 13, fontWeight: '500', color: colors.slate },

  // ═══════════════════════════════════════════════════════════
  //  BUTTONS
  // ═══════════════════════════════════════════════════════════
  btnPrimary: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16 },
  btnSecondary: { backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16 },
  btnOutlinePrimary: { borderWidth: 1, borderColor: colors.primary, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  primaryButton: { backgroundColor: colors.blue, borderRadius: 18, paddingVertical: 18, alignItems: 'center', justifyContent: 'center', ...StyleSheet.flatten({ elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10 }) },
  primaryButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },

  // ═══════════════════════════════════════════════════════════
  //  CATEGORY PILLS
  // ═══════════════════════════════════════════════════════════
  categoryPill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 16, backgroundColor: colors.surfaceAlt, marginRight: 10, borderWidth: 1.5, borderColor: 'transparent' },
  categoryPillActive: { backgroundColor: colors.blueLight, borderColor: colors.blue },
  categoryPillText: { fontSize: 14, fontWeight: '500', color: colors.slate, marginLeft: 8 },
  categoryPillTextActive: { color: colors.blue, fontWeight: '600' },

  // ═══════════════════════════════════════════════════════════
  //  KEYPAD
  // ═══════════════════════════════════════════════════════════
  keypadContainer: { backgroundColor: colors.surface, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 28, borderTopWidth: 1, borderTopColor: colors.grayBorder },
  keypadRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  keyBtn: { width: 78, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginHorizontal: 6, backgroundColor: colors.surfaceAlt },
  keyBtnZero: { width: 174, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginHorizontal: 6, backgroundColor: colors.surfaceAlt },
  keyBtnText: { fontSize: 26, fontWeight: '600', color: colors.navy },
  amountDisplay: { fontSize: 44, fontWeight: '700', color: colors.navy, letterSpacing: -1.5, textAlign: 'center', paddingVertical: 8 },
  amountLabel: { fontSize: 13, color: colors.grayLight, fontWeight: '500', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.8 },

  // ═══════════════════════════════════════════════════════════
  //  PROFILE
  // ═══════════════════════════════════════════════════════════
  profileHeader: { alignItems: 'center', paddingTop: 20, paddingBottom: 28 },
  profileAvatar: { width: 80, height: 80, borderRadius: 28, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center', marginBottom: 14, ...StyleSheet.flatten({ elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10 }) },
  profileName: { fontSize: 22, fontWeight: '700', color: colors.navy, letterSpacing: -0.5, marginBottom: 4 },
  profileEmail: { fontSize: 14, color: colors.grayLight, fontWeight: '500' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 4 },
  menuIconWrap: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.navy },
  menuDivider: { height: 1, backgroundColor: colors.grayBorder, marginLeft: 56 },

  // ═══════════════════════════════════════════════════════════
  //  DRAWER SIDEBAR
  // ═══════════════════════════════════════════════════════════
  drawerContainer: { flex: 1, backgroundColor: colors.surface, },
  drawerHeader: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: colors.grayBorder },
  drawerAvatar: { width: 50, height: 50, borderRadius: 10, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center', marginBottom: 14, },
  drawerUserName: { fontSize: 18, fontWeight: '700', color: colors.navy, letterSpacing: -0.3 },
  drawerUserEmail: { fontSize: 13, fontWeight: '500', color: colors.grayLight, marginTop: 2 },
  drawerBalanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, backgroundColor: colors.bg, borderRadius: 14, padding: 14 },
  drawerBalanceLabel: { fontSize: 11, fontWeight: '600', color: colors.gray, textTransform: 'uppercase', letterSpacing: 0.5 },
  drawerBalanceAmount: { fontSize: 20, fontWeight: '800', color: colors.navy, letterSpacing: -0.5 },
  drawerSection: { paddingTop: 12, paddingHorizontal: 16 },
  drawerSectionTitle: { fontSize: 11, fontWeight: '700', color: colors.grayLight, textTransform: 'uppercase', letterSpacing: 1.2, paddingHorizontal: 12, marginBottom: 8 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 12, borderRadius: 14, marginBottom: 2 },
  drawerItemActive: { backgroundColor: colors.blueLight },
  drawerItemIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  drawerItemLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: colors.navy },
  drawerItemLabelActive: { fontWeight: '700', color: colors.blue },
  drawerItemBadge: { backgroundColor: colors.danger, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2, minWidth: 22, alignItems: 'center' },
  drawerItemBadgeText: { fontSize: 11, fontWeight: '700', color: colors.white },
  drawerFooter: { borderTopWidth: 1, borderTopColor: colors.grayBorder, paddingHorizontal: 24, paddingVertical: 16 },
  drawerVersion: { fontSize: 11, fontWeight: '500', color: colors.grayLight, textAlign: 'center' },
  drawerCloseBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
});

export { colors };
export default styles;

styles.colors = colors;
