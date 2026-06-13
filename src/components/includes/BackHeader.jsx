import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '@/styles';

const BackHeader = ({ title = 'Back', onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerContainer, styles.borderBottom]}>
      <TouchableOpacity
        style={[styles.iconBtn, styles.bgSurfaceAlt]}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.iconBtn} />
    </View>
  );
};

export default BackHeader;