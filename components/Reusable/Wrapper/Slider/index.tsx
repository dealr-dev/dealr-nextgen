import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

interface SliderWrapProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const SliderWrap: React.FC<SliderWrapProps> = ({ style, children }) => {
  return (
    <SafeAreaView style={[styles.sliderBlock, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sliderBlock: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});

export default SliderWrap;
