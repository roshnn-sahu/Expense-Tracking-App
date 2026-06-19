import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Menu, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { constant_variables } from '@/config/constant';

import styles from '@/styles';
import { useCompany } from '@/context/CompanyContext';

const Header = ({ onMenuPress, onUserPress }) => {
  const navigation = useNavigation();
  const { aSite, loading, refreshCompany } = useCompany();
  const [imgError, setImgError] = useState(false);

  const logoUrl = aSite?.logo_url;
  const companyName = aSite?.display_name || constant_variables.display_name;
  const showLogo = logoUrl && !imgError;

  const handleLogoPress = () => {
    setImgError(false);
    refreshCompany();
  };

  return (
    <View style={[styles.headerContainer, styles.borderBottom]}>
      <TouchableOpacity
        style={[styles.iconBtn, styles.bgSurfaceAlt]}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLogoPress}
        style={{ flex: 1, alignItems: 'center' }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={styles.colors.navy} />
        ) : showLogo ? (
          <Image
            source={{ uri: logoUrl, cache: 'reload' }}
            style={{ width: 130, height: 42 }}
            resizeMode="contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <Text style={[styles.headerTitle]} numberOfLines={1}>
            {companyName}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconBtn, styles.bgSurfaceAlt]}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.7}
      >
        <User size={22} color={styles.colors.navy} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
