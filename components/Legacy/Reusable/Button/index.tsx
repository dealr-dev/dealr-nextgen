import React from 'react';
import {
    GestureResponderEvent, StyleSheet, TouchableOpacity,
    View
} from 'react-native';

interface ReusableButtonProps {
  style?: any;
  handleOnPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
  activeOpacity?: number;
}

export default function ReusableButton({
  style,
  handleOnPress,
  disabled = false,
  children,
  activeOpacity = 0.8,
}: ReusableButtonProps) {
  const ButtonComponent = disabled ? View : TouchableOpacity;

  return (
    <ButtonComponent
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={!disabled ? handleOnPress : undefined}
      activeOpacity={activeOpacity}
    >
      {children}
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#5A89EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
