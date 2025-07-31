import React from 'react';
import { LayoutChangeEvent, SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

interface OuterProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onRef?: (ref: any) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const Outer: React.FC<OuterProps> = ({ style, children, onRef, onLayout }) => {
  return (
    <SafeAreaView
      style={[styles.wrapperBlock, style]}
      ref={onRef}
      onLayout={onLayout}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperBlock: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

export default Outer;
