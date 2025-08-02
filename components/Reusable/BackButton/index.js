import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 

export default function BackButton({iconName, handleOnPress, iconSize, iconColor, material}) {
    if( material ) {
        return <MaterialIcons name={iconName} onPress={handleOnPress} size={iconSize} color={iconColor} />
    }
    return <AntDesign name={iconName} onPress={handleOnPress} size={iconSize} color={iconColor} />
}
