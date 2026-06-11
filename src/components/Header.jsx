import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native';

import styles from '../styles';

const Header = ({ title = 'Expense Tracker', onMenuPress, onUserPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={[styles.iconBtn, styles.bgSurfaceAlt]}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity
        style={[styles.iconBtn, styles.bgSurfaceAlt]}
        onPress={onUserPress}
        activeOpacity={0.7}
      >
        <User size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
