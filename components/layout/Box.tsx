// layout/Box.tsx
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface BoxProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Box: React.FC<BoxProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

export default Box;
