import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const baseStyle = {
  borderLeftWidth: 0,
  width: '92%',
  borderRadius: 14,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.18,
  shadowRadius: 6,
};

const text1Style = {
  fontSize: 15,
  fontWeight: '600',
  color: '#FFFFFF',
};

const text2Style = {
  fontSize: 13,
};

const contentContainerStyle = {
  paddingHorizontal: 16,
};

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ ...baseStyle, backgroundColor: '#16A34A' }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={{ ...text2Style, color: '#F0FDF4' }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{ ...baseStyle, backgroundColor: '#DC2626' }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={{ ...text2Style, color: '#FEF2F2' }}
    />
  ),
  warning: props => (
    <BaseToast
      {...props}
      style={{ ...baseStyle, backgroundColor: '#F59E0B' }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={{ ...text2Style, color: '#FFFBEB' }}
    />
  ),
  info: props => (
    <ErrorToast
      {...props}
      style={{ ...baseStyle, backgroundColor: '#2563EB' }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={{ ...text2Style, color: '#EFF6FF' }}
    />
  ),
};