import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface ReusableTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const ReusableText: React.FC<ReusableTextProps> = ({ children, style }) => {
  return <Text style={[styles.appText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  appText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
});

export default ReusableText;
