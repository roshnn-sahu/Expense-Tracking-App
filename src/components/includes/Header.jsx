import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '@/styles';
import { useCompany } from '@/context/CompanyContext';

const Header = ({ onMenuPress, onUserPress }) => {
  const navigation = useNavigation();
  const { company } = useCompany();

  const title = company?.name || 'Expense Tracker';

  return (
    <View style={[styles.headerContainer, styles.borderBottom]}>
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
        onPress={() => { navigation.navigate('Profile'); }}
        activeOpacity={0.7}
      >
        <User size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;