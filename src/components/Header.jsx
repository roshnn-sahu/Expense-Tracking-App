import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native';
import custom from '../styles/custom';

const Header = ({ title = 'Expense Tracker', onMenuPress, onUserPress }) => {
  return (
    <View style={custom.headerContainer}>
      <TouchableOpacity
        style={custom.headerIconBtn}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color="#0F172A" strokeWidth={2} />
      </TouchableOpacity>

      <Text style={custom.headerTitle}>{title}</Text>

      <TouchableOpacity
        style={custom.headerIconBtn}
        onPress={onUserPress}
        activeOpacity={0.7}
      >
        <User size={22} color="#0F172A" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
