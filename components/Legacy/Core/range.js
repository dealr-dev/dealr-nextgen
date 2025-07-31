import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RangeSliderCustom = ({
  min = 0,
  max = 100,
  currentMin,
  currentMax,
  onFromValueChange,
  onToValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`R${currentMin} to R${currentMax}${currentMax >= max ? '+' : ''}`}</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={currentMax}
        step={1}
        value={currentMin}
        onValueChange={onFromValueChange}
        minimumTrackTintColor="#5A89EA"
        maximumTrackTintColor="#ddd"
      />
      <Slider
        style={styles.slider}
        minimumValue={currentMin}
        maximumValue={max}
        step={1}
        value={currentMax}
        onValueChange={onToValueChange}
        minimumTrackTintColor="#5A89EA"
        maximumTrackTintColor="#ddd"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default RangeSliderCustom;
