import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function ListContainer({ children, ...props }: ViewProps) {
  return <View style={styles.container} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
