import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#16A34A', borderLeftColor: '#15803D' }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' }}
      text2Style={{ fontSize: 13, color: '#F0FDF4' }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#DC2626', borderLeftColor: '#B91C1C' }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' }}
      text2Style={{ fontSize: 13, color: '#FEF2F2' }}
    />
  ),
  warning: props => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#F59E0B', borderLeftColor: '#D97706' }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' }}
      text2Style={{ fontSize: 13, color: '#FFFBEB' }}
    />
  ),
  info: props => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#2563EB', borderLeftColor: '#1a4fc1ff' }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' }}
      text2Style={{ fontSize: 13, color: '#FEF2F2' }}
    />
  ),
};