import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, size = 24, color = '#000' }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default IconButton;