import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function Overlay({ children, ...props }: ViewProps) {
  return <View style={styles.overlay} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 5,
    width: '40%',
    backgroundColor: 'white',
  },
});
