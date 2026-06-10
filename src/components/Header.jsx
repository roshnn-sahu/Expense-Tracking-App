import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native';
import s from '../styles/style';
import { colors } from '../styles/custom';

const Header = ({ title = 'Expense Tracker', onMenuPress, onUserPress }) => {
  return (
    <View style={s.headerContainer}>
      <TouchableOpacity
        style={[s.iconBtn, s.bgSurfaceAlt]}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color={colors.navy} strokeWidth={2} />
      </TouchableOpacity>

      <Text style={s.headerTitle}>{title}</Text>

      <TouchableOpacity
        style={[s.iconBtn, s.bgSurfaceAlt]}
        onPress={onUserPress}
        activeOpacity={0.7}
      >
        <User size={22} color={colors.navy} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
