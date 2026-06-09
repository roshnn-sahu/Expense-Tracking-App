import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Layout utilities
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerFluid: {
        flex: 1,
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
    flex1: {
        flex: 1,
    },

    // Bootstrap-inspired spacing utilities
    m0: { margin: 0 },
    mt1: { marginTop: 4 },
    mt2: { marginTop: 8 },
    mt3: { marginTop: 12 },
    mt4: { marginTop: 16 },
    mt5: { marginTop: 20 },
    mb1: { marginBottom: 4 },
    mb2: { marginBottom: 8 },
    mb3: { marginBottom: 12 },
    mb4: { marginBottom: 16 },
    mb5: { marginBottom: 20 },
    mx2: { marginHorizontal: 8 },
    mx3: { marginHorizontal: 12 },
    my2: { marginVertical: 8 },
    my3: { marginVertical: 12 },
    p1: { padding: 4 },
    p2: { padding: 8 },
    p3: { padding: 12 },
    p4: { padding: 16 },
    p5: { padding: 20 },
    px2: { paddingHorizontal: 8 },
    px3: { paddingHorizontal: 12 },
    py2: { paddingVertical: 8 },
    py3: { paddingVertical: 12 },
    gap2: { gap: 8 },
    gap3: { gap: 12 },

    // Typography utilities
    textCenter: {
        textAlign: 'center',
    },
    textLeft: {
        textAlign: 'left',
    },
    textRight: {
        textAlign: 'right',
    },
    textPrimary: {
        color: '#0d6efd',
    },
    textSecondary: {
        color: '#6c757d',
    },
    textSuccess: {
        color: '#198754',
    },
    textDanger: {
        color: '#dc3545',
    },
    textWarning: {
        color: '#ffc107',
    },

    // Background utilities
    bgPrimary: {
        backgroundColor: '#0d6efd',
    },
    bgSecondary: {
        backgroundColor: '#6c757d',
    },
    bgSuccess: {
        backgroundColor: '#198754',
    },
    bgDanger: {
        backgroundColor: '#dc3545',
    },
    bgLight: {
        backgroundColor: '#f8f9fa',
    },
    bgWhite: {
        backgroundColor: '#ffffff',
    },

    // Button-like helpers
    btnPrimary: {
        backgroundColor: '#0d6efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    btnSecondary: {
        backgroundColor: '#6c757d',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    btnOutlinePrimary: {
        borderWidth: 1,
        borderColor: '#0d6efd',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
