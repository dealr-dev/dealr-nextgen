import React from 'react';
import { View } from 'react-native';
import { styles } from '../../../../../styles';

export default function Inner({style, children, safe = false}) {
    if( safe ) {
        return (
            <View
                safe
                style={styles(style).innerBlock} 
            >
                {children}
            </View>
        );
    }
    return (
        <View
            style={styles(style).innerBlock} 
        >
            {children}
        </View>
    );
}