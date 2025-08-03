import React from 'react';
import {
  GestureResponderEvent, Platform, TouchableOpacity,
  View, ViewStyle
} from 'react-native';
import { styles } from '../../../styles';

interface TileProps {
  style?: ViewStyle;
  handleTileSelection?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  shadowColor?: string;
  shadowless?: boolean;
  activeOpacity?: number;
  disabled?: boolean;
}

const Tile: React.FC<TileProps> = ({
  style,
  handleTileSelection,
  children,
  shadowColor = '#000',
  shadowless = false,
  activeOpacity = 0.8,
  disabled = false,
}) => {
  const baseStyle = [
    styles.tile,
    style,
    !shadowless && Platform.OS === 'ios' ? styles.iosShadow : {},
    !shadowless && Platform.OS === 'android' ? styles.androidShadow : {},
    shadowColor && Platform.OS === 'ios' && !shadowless ? { shadowColor } : {},
  ];

  const Wrapper = disabled ? View : TouchableOpacity;

  return (
    <Wrapper
      style={styles(style).button}
      onPress={handleTileSelection}
      activeOpacity={activeOpacity}
    >
      {children}
    </Wrapper>
  );
};

export default Tile;
