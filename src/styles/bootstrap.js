import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal:5
  },

  flex1: {
    flex: 1,
  },

  dFlex: {
    display: 'flex',
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },


  row: {
    flexDirection: 'row',

  },



  /* =========================
     JUSTIFY CONTENT
  ========================= */

  justifyCenter: {
    justifyContent: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  justifyAround: {
    justifyContent: 'space-around',
  },

  justifyEvenly: {
    justifyContent: 'space-evenly',
  },

  justifyEnd: {
    justifyContent: 'flex-end',
  },

  /* =========================
     ALIGN ITEMS
  ========================= */

  alignCenter: {
    alignItems: 'center',
  },

  alignStart: {
    alignItems: 'flex-start',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  /* =========================
     WIDTH / HEIGHT
  ========================= */

  wFull: {
    width: '100%',
  },

  hFull: {
    height: '100%',
  },

  /* =========================
     PADDING
  ========================= */

  p1: {
    padding: 4,
  },

  p2: {
    padding: 8,
  },

  p3: {
    padding: 12,
  },

  p4: {
    padding: 16,
  },

  p5: {
    padding: 20,
  },

  p6: {
    padding: 24,
  },

  px1: {
    paddingHorizontal: 4,
  },

  px2: {
    paddingHorizontal: 8,
  },

  px3: {
    paddingHorizontal: 12,
  },

  px4: {
    paddingHorizontal: 16,
  },

  px5: {
    paddingHorizontal: 20,
  },

  px6: {
    paddingHorizontal: 24,
  },

  py1: {
    paddingVertical: 4,
  },

  py2: {
    paddingVertical: 8,
  },

  py3: {
    paddingVertical: 12,
  },

  py4: {
    paddingVertical: 16,
  },

  py5: {
    paddingVertical: 20,
  },

  py6: {
    paddingVertical: 24,
  },

  pt1: {
    paddingTop: 4,
  },

  pt2: {
    paddingTop: 8,
  },

  pt3: {
    paddingTop: 12,
  },

  pt4: {
    paddingTop: 16,
  },

  pt5: {
    paddingTop: 20,
  },

  pb1: {
    paddingBottom: 4,
  },

  pb2: {
    paddingBottom: 8,
  },

  pb3: {
    paddingBottom: 12,
  },

  pb4: {
    paddingBottom: 16,
  },

  pb5: {
    paddingBottom: 20,
  },

  pb10: {
    paddingBottom: 40,
  },

  pb12: {
    paddingBottom: 48,
  },

  pb14: {
    paddingBottom: 56,
  },

  /* =========================
     MARGIN
  ========================= */

  m1: {
    margin: 4,
  },

  m2: {
    margin: 8,
  },

  m3: {
    margin: 12,
  },

  m4: {
    margin: 16,
  },

  m5: {
    margin: 20,
  },

  mt1: {
    marginTop: 4,
  },

  mt2: {
    marginTop: 8,
  },

  mt3: {
    marginTop: 12,
  },

  mt4: {
    marginTop: 16,
  },

  mt5: {
    marginTop: 20,
  },

  mt6: {
    marginTop: 24,
  },

  mt7: {
    marginTop: 28,
  },

  mb1: {
    marginBottom: 4,
  },

  mb2: {
    marginBottom: 8,
  },

  mb3: {
    marginBottom: 12,
  },

  mb4: {
    marginBottom: 16,
  },

  mb5: {
    marginBottom: 20,
  },

  mb6: {
    marginBottom: 24,
  },

  mxAuto: {
    marginHorizontal: 'auto',
  },

  ml1: {
    marginLeft: 4,
  },

  ml2: {
    marginLeft: 8,
  },

  ml15: {
    marginLeft: 60,
  },

  mt8: {
    marginTop: 32,
  },

  /* =========================
     GAP
  ========================= */

  gap1: {
    gap: 4,
  },

  gap2: {
    gap: 8,
  },

  gap3: {
    gap: 12,
  },

  gap4: {
    gap: 16,
  },

  gap5: {
    gap: 20,
  },

  /* =========================
     BORDER RADIUS
  ========================= */

  roundedSm: {
    borderRadius: 8,
  },

  roundedMd: {
    borderRadius: 12,
  },

  roundedLg: {
    borderRadius: 18,
  },

  roundedXL: {
    borderRadius: 24,
  },

  roundedXXL: {
    borderRadius: 28,
  },

  roundedFull: {
    borderRadius: 999,
  },

  /* =========================
     BACKGROUND COLORS
  ========================= */

  bgWhite: {
    backgroundColor: colors.white,
  },

  bgPrimary: {
    backgroundColor: colors.primary,
  },

  bgSurface: {
    backgroundColor: colors.surface,
  },

  bgSoft: {
    backgroundColor: colors.soft,
  },

  bgSurfaceAlt: {
    backgroundColor: colors.surfaceAlt,
  },

  bgGreenLight: {
    backgroundColor: colors.greenLight,
  },

  bgRedLight: {
    backgroundColor: colors.redLight,
  },
  /* =========================
     TEXT COLORS
  ========================= */

  textWhite: {
    color: colors.white,
  },

  textPrimary: {
    color: colors.primary,
  },

  textNavy: {
    color: colors.navy,
  },

  textGray: {
    color: colors.gray,
  },
  textBlack: {
    color: colors.black,
  },

  textRed: {
    color: colors.red,
  },

  textGreen: {
    color: colors.green,
  },

  textGrayLight: {
    color: colors.grayLight,
  },

  textGreenDark: {
    color: colors.greenDark,
  },

  textRedDark: {
    color: colors.redDark,
  },


  /* =========================
     FONT SIZE
  ========================= */

  fs12: {
    fontSize: 12,
  },

  fs14: {
    fontSize: 14,
  },

  fs16: {
    fontSize: 16,
  },

  fs18: {
    fontSize: 18,
  },

  fs20: {
    fontSize: 20,
  },

  fs24: {
    fontSize: 24,
  },

  fs32: {
    fontSize: 32,
  },

  fs38: {
    fontSize: 38,
  },
  fontSM: {
    fontSize: 12,
  },

  fontLG: {
    fontSize: 20,
  },

  fontXXL: {
    fontSize: 28,
  },

  /* =========================
     FONT WEIGHT
  ========================= */

  fw400: {
    fontWeight: '400',
  },

  fw500: {
    fontWeight: '500',
  },

  fw600: {
    fontWeight: '600',
  },

  fw700: {
    fontWeight: '700',
  },

  /* =========================
     TEXT ALIGN
  ========================= */

  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  textRight: {
    textAlign: 'right',
  },

  /* =========================
     BORDERS
  ========================= */

  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },

  borderTop: {
    borderTopWidth: 1,
    borderColor: colors.border,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  /* =========================
     SHADOWS
  ========================= */

  shadowSm: {
    elevation: 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.03,

    shadowRadius: 10,
  },

  shadowMd: {
    elevation: 4,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.04,

    shadowRadius: 14,
  },

  shadowLg: {
    elevation: 6,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.06,

    shadowRadius: 20,
  },

  /* =========================
     OVERFLOW
  ========================= */

  overflowHidden: {
    overflow: 'hidden',
  },

  /* =========================
     TEXT COLRS
  ========================= */
  /* =========================
     DIVIDERS
  ========================= */

  divider: {
    height: 1,
    backgroundColor: colors.grayBorder,
  },

  dividerVertical: {
    width: 1,
    backgroundColor: colors.grayBorder,
  },

  /* =========================
     SCROLL
  ========================= */

  scrollContentCompact: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  /* =========================
     ICON BUTTON
  ========================= */

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* =========================
     PRIMARY BUTTON
  ========================= */

  primaryButton: {
    backgroundColor: colors.blue,

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 6,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,

    shadowRadius: 10,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',

    letterSpacing: 0.3,
  },



});
