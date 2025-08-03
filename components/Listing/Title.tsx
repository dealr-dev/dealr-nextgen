import React from 'react';
import { Text, TextProps } from 'react-native';

export default function Title({ children, ...props }: TextProps) {
  return <Text {...props}>{children}</Text>;
}
