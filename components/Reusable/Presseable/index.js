import React from 'react';
import { Pressable } from 'react-native';
import { styles } from '../../../../styles';

export default function ReuseablePressable({style, handleTileSelection, children}) {
    return (
        <Pressable 
            style={styles(style).button} 
            onPressIn={handleTileSelection} 
        >
            {children}
        </Pressable>
    );  
}