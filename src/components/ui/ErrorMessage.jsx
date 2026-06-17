import React from 'react';
import { Text } from 'react-native';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Text
      style={{
        marginTop: 6,
        color: '#EF4444',
        fontSize: 13,
        fontWeight: '500',
      }}
    >
      {'\u2022'} {message}
    </Text>
  );
};

export default ErrorMessage;
