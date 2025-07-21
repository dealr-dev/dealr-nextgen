import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import colors from '../theme/colors';

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
  },
});

export default Text;