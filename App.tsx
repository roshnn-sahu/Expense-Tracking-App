import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView
    >
      <View>
        <Text style={{ fontSize: 56, fontWeight: 'bold', color: '#fff' }}>
          App
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
