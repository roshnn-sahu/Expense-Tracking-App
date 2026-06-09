const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    // ===== LAYOUT =====
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    canvas: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // ===== CARDS =====
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
    balanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 28,
        marginBottom: 20,
        elevation: 6,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
    },

    // ===== INCOME / EXPENSE CARDS =====
    incomeCard: {
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        borderRadius: 20,
        padding: 18,
        flex: 1,
        marginRight: 8,
        elevation: 1,
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
    },
    expenseCard: {
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        borderRadius: 20,
        padding: 18,
        flex: 1,
        marginLeft: 8,
        elevation: 1,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
    },

    // ===== BUTTONS =====
    primaryButton: {
        backgroundColor: '#2563EB',
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
    },
    secondaryButton: {
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderRadius: 18,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ===== CATEGORY PILLS =====
    categoryPill: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        marginRight: 12,
        marginBottom: 8,
    },
    categoryPillActive: {
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
    },
    categoryPillText: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    categoryPillTextActive: {
        color: '#2563EB',
        fontWeight: '600',
    },

    // ===== NAV BAR =====
    navBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 28,
        paddingHorizontal: 24,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
    navItemActive: {
        backgroundColor: 'rgba(37, 99, 235, 0.10)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    navItemInactive: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    // ===== TYPOGRAPHY =====
    textNavy: { color: '#0F172A' },
    textNavyDark: { color: '#1E293B' },
    textWhite: { color: '#FFFFFF' },
    textGreen: { color: '#22C55E' },
    textRed: { color: '#EF4444' },
    textBlue: { color: '#2563EB' },
    textGray: { color: '#6B7280' },
    textGrayLight: { color: '#9CA3AF' },

    amountText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -0.8,
    },
    balanceAmount: {
        fontSize: 40,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -1,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 16,
    },
    bodyText: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '500',
    },
    captionText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    labelText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '500',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },

    // ===== PROGRESS BARS =====
    progressTrack: {
        height: 6,
        backgroundColor: 'rgba(229, 231, 235, 0.6)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressIndicator: {
        height: 6,
        borderRadius: 3,
    },

    // ===== NUMBER KEYPAD =====
    numberKeypad: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 36,
    },
    numberKeyRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    numberKey: {
        width: 72,
        height: 64,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    numberKeyText: {
        fontSize: 26,
        fontWeight: '600',
        color: '#0F172A',
    },
    numberKeyZero: {
        width: 168,
        height: 64,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    numberDisplay: {
        fontSize: 40,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -1,
        textAlign: 'right',
        paddingRight: 4,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    numberLabel: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
        textAlign: 'right',
        paddingRight: 4,
    },

    // ===== DONUT CHART =====
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    donutCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutCenterAmount: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    donutCenterLabel: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
        marginTop: 2,
    },

    // ===== CATEGORY LIST ITEMS =====
    categoryListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 0,
    },
    categoryIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    categoryInfo: {
        flex: 1,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 6,
    },
    categoryMeta: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    categoryAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        textAlign: 'right',
    },

    // ===== TRANSACTION ITEMS =====
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 0,
    },
    transactionIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 3,
    },
    transactionMeta: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
    },

    // ===== HEADER AREA =====
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(37, 99, 235, 0.10)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ===== BALANCE SECTION =====
    balanceLabel: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 4,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },

    // ===== ANALYTICS HEADER =====
    analyticsPeriod: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
    },
});

export default styles;
