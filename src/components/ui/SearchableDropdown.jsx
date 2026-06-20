import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import { Search, ChevronDown, Check } from 'lucide-react-native';
import styles from '@/styles';

const SearchableDropdown = ({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Search...',
  icon: Icon,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter(
      opt =>
        opt.label.toLowerCase().includes(q) ||
        opt.value?.toLowerCase().includes(q),
    );
  }, [options, search]);

  const selectedLabel = options.find(o => o.value === value)?.label || value || '';

  return (
    <>
      <View style={styles.mb4}>
        <Text style={[styles.fs13, styles.fw700, styles.textGray, styles.mb2]}>
          {label}
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setSearch('');
            setVisible(true);
          }}
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
              maxHeight: '75%',
            }}
          >
            <Text
              style={[styles.fs20, styles.fw700, styles.textNavy, styles.mb4]}
            >
              {label}
            </Text>

            {/* Search input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 16,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                backgroundColor: '#F8FAFC',
                marginBottom: 8,
              }}
            >
              <Search size={18} color="#94A3B8" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                style={[styles.flex1, styles.ml2, styles.textNavy, styles.fw500, { fontSize: 15 }]}
                autoFocus
              />
            </View>

            <FlatList
              data={filtered}
              keyExtractor={item => item.value || item.label}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 400 }}
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
                      {item.emoji && (
                        <Text style={{ fontSize: 18, marginRight: 10 }}>{item.emoji}</Text>
                      )}
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
              ListEmptyComponent={
                <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                  <Text style={[styles.fs15, styles.textGrayLight]}>
                    No results found
                  </Text>
                </View>
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default SearchableDropdown;
