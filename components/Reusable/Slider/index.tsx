import Slider from '@react-native-community/slider';
import React from 'react';
import { ViewStyle } from 'react-native';

interface ReusableSliderProps {
  maximumValue: number;
  minimumValue: number;
  value: number;
  step?: number;
  activeColor?: string;
  thumbTintColor?: string;
  style?: ViewStyle;
  onValueChange: (val: number) => void;
}

const ReusableSlider: React.FC<ReusableSliderProps> = ({
  maximumValue,
  minimumValue,
  value,
  step = 500,
  activeColor = '#5A89EA',
  thumbTintColor = '#5A89EA',
  style,
  onValueChange
}) => {
  return (
    <Slider
      style={style}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      value={value}
      step={step}
      minimumTrackTintColor={activeColor}
      maximumTrackTintColor="#EDEDED"
      thumbTintColor={thumbTintColor}
      onValueChange={onValueChange}
    />
  );
};

export default ReusableSlider;
