import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RatingProps {
  value: number;
  max?: number;
}

const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: max }).map((_, i) => (
        <MaterialIcons
          key={i}
          name={i < value ? 'star' : 'star-border'}
          size={20}
          color="#FFD700"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Rating;