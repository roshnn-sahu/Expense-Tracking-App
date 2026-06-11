import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const SectionHeader = ({ title, actionLabel, onActionPress }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel && (
        <TouchableOpacity activeOpacity={0.7} onPress={onActionPress}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
