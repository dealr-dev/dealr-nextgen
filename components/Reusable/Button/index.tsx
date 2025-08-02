import React from 'react';
import {
  GestureResponderEvent, TouchableOpacity,
  View
} from 'react-native';
import { styles } from '../../../../styles';

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
      style={styles(style).button}
      onPress={!disabled ? handleOnPress : undefined}
      activeOpacity={activeOpacity}
    >
      {children}
    </ButtonComponent>
  );
}
