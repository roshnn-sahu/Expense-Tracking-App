import React from 'react';
import { View, Text } from 'react-native';

/**
 * Lightweight replacement for react-native-table-component.
 * Supports the same props used in Statement.jsx:
 *   <Table borderStyle={{ borderWidth, borderColor }}>
 *     <Row data={[]} widthArr={[]} style={} textStyle={} />
 *   </Table>
 */

export const Table = ({ borderStyle, style, children }) => {
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { _borderStyle: borderStyle });
      })}
    </View>
  );
};

export const Row = ({ data, widthArr, style, textStyle, _borderStyle }) => {
  const border = _borderStyle || {};

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          borderBottomWidth: border.borderWidth || 0,
          borderColor: border.borderColor || 'transparent',
        },
        style,
      ]}
    >
      {data.map((cell, index) => {
        const width = widthArr ? widthArr[index] : undefined;
        const cellStyle = {
          width,
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: border.borderWidth || 0,
          borderColor: border.borderColor || 'transparent',
          paddingVertical: 4,
          paddingHorizontal: 2,
        };

        // If the cell is already a React element, render it directly
        if (React.isValidElement(cell)) {
          return (
            <View key={index} style={cellStyle}>
              {cell}
            </View>
          );
        }

        // Otherwise render as text
        return (
          <View key={index} style={cellStyle}>
            <Text style={textStyle}>{cell != null ? String(cell) : ''}</Text>
          </View>
        );
      })}
    </View>
  );
};
