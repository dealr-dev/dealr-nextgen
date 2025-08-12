import colors from '@/theme/colors';
import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

const Text: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
});

export default Text;