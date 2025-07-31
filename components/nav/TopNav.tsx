import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from '../../styles';

interface ScreenTopNavProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScreenTopNav: React.FC<ScreenTopNavProps> = ({ children, style }) => {
  return <View style={[styles.screenTopNav, style]}>{children}</View>;
};

export default ScreenTopNav;
