import React from 'react';
import {
    GestureResponderEvent, Platform, StyleSheet, TouchableOpacity,
    View, ViewStyle
} from 'react-native';

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
      style={baseStyle}
      onPress={handleTileSelection}
      activeOpacity={activeOpacity}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
  iosShadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
  },
  androidShadow: {
    elevation: 3,
  },
});

export default Tile;
