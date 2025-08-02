import React from 'react';
import { LayoutChangeEvent, SafeAreaView, ViewStyle } from 'react-native';
import { styles } from '../../../../../styles';

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

export default Outer;
