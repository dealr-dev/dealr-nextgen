import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export default function Button({ children, ...props }: TouchableOpacityProps) {
  return <TouchableOpacity style={styles.button} {...props}>{children}</TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d7dd',
  },
});
