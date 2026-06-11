import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles/style';

const PrimaryButton = ({ label = 'Save', onPress, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.primaryButton, styles.mt3, style]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
