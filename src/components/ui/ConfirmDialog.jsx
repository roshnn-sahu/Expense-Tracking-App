import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertTriangle, X } from 'lucide-react-native';
import colors from '@/styles/colors';

const ConfirmDialog = ({
  visible,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
}) => {
  const confirmBgColor =
    confirmVariant === 'danger' ? colors.red : colors.blue;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={s.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={s.dialog}
          activeOpacity={1}
          onPress={() => {}}
        >
        

          {/* Icon */}
          <View
            style={[
              s.iconWrap,
              {
                backgroundColor:
                  confirmVariant === 'danger'
                    ? 'rgba(239,68,68,0.12)'
                    : 'rgba(37,99,235,0.12)',
              },
            ]}
          >
            <AlertTriangle
              size={28}
              color={confirmVariant === 'danger' ? colors.red : colors.blue}
              strokeWidth={1.8}
            />
          </View>

          {/* Title */}
          <Text style={s.title}>{title}</Text>

          {/* Message */}
          <Text style={s.message}>{message}</Text>

          {/* Actions */}
          <View style={s.actions}>
            <TouchableOpacity
              style={[s.btn, s.btnCancel]}
              onPress={onClose}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text style={s.btnCancelText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.btn, { backgroundColor: confirmBgColor }]}
              onPress={onConfirm}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text style={s.btnConfirmText}>
                {loading ? 'Deleting...' : confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'stretch',
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },
  btnCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
  },
  btnConfirmText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
});

export default ConfirmDialog;
