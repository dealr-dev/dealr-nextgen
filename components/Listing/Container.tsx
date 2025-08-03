import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function Container({ children, ...props }: ViewProps) {
  return <View style={styles.container} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 220,
  },
});
