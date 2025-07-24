import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

interface ScrollContainerProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children, contentContainerStyle }) => {
  return (
    <ScrollView contentContainerStyle={[styles.container, contentContainerStyle]}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
});

export default ScrollContainer;