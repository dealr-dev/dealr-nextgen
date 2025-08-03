import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function ListView({ children, ...props }: ViewProps) {
  return <View style={styles.view} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
  },
});
