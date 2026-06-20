import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import styles from '@/styles';

const PickerDropdown = ({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select...',
  icon: Icon,
}) => {
  const [visible, setVisible] = React.useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label || value || '';

  return (
    <>
      <View style={styles.mb4}>
        <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
          {label}
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setVisible(true)}
          style={{
            height: 62,
            borderRadius: 20,
            paddingHorizontal: 18,
            borderWidth: 1,
            borderColor: '#E2E8F0',
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {Icon && <Icon size={20} color="#64748B" />}

          <Text
            style={[
              styles.flex1,
              Icon ? styles.ml3 : null,
              styles.textNavy,
              styles.fw500,
            ]}
            numberOfLines={1}
          >
            {selectedLabel || placeholder}
          </Text>

          <ChevronDown size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={[styles.flex1, { backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end' }]}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: 24,
              maxHeight: '70%',
            }}
          >
            <Text
              style={[styles.fs20, styles.fw700, styles.textNavy, styles.mb6]}
            >
              {label}
            </Text>

            <FlatList
              data={options}
              keyExtractor={item => item.value || item.label}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const active = item.value === value;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      onSelect(item.value);
                      setVisible(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 18,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F1F5F9',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={[
                          styles.fs16,
                          active ? styles.textPrimary : styles.textNavy,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>

                    {active && <Check size={20} color={styles.colors.blue} />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default PickerDropdown;
