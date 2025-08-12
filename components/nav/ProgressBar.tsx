import CustomTheme from '@/theme';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ProgressBarProps {
  step: number; // 0 - 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const progressBarWidth = width * (step / 100);

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: progressBarWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: CustomTheme.colors.zircon,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
    height: 10,
    top: 0,
    left: 0,
    backgroundColor: CustomTheme.colors.cornflowerBlue,
  },
});

export default ProgressBar;
