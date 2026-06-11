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

    /* =========================
       GREETING
    ========================= */

    greeting: {
        fontSize: 38,
        fontWeight: '700',
        color: colors.navy,

        letterSpacing: -1.8,
    },

    greetingSub: {
        fontSize: 15,
        color: colors.gray,

        marginTop: 8,

        lineHeight: 22,

        fontWeight: '500',
    },

    trackingTighter: {
        letterSpacing: -1.8,
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

        shadowOffset: {
            width: 0,
            height: 6,
        },

        shadowOpacity: 0.04,

        shadowRadius: 14,

        elevation: 2,
    },
});