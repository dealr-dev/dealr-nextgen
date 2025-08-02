import {
    AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5,
    Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons';
import React from 'react';
import CustomTheme from '../../../theme';

export default function Icon({
    iconName, 
    iconSize, 
    iconColor, 
    fontisto, 
    fontAwesome, 
    materialCommunityIcons,
    ionicons,
    materialIcons,
    feather,
    evilicons,
    antDesign
}) {
    if(iconColor !== 'black' || iconColor !== 'white') {
        iconColor = CustomTheme.colors[iconColor];
    }
    if(materialCommunityIcons) {
        return <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />;
    }
    if(fontAwesome) {
        return <FontAwesome name={iconName} size={iconSize} color={iconColor} />;
    }
    if(fontisto) {
        return <Fontisto name={iconName} size={iconSize} color={iconColor} />;
    }
    if(ionicons) {
        return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
    }
    if(materialIcons) {
        return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />;
    }
    if(feather) {
        return <Feather name={iconName} size={iconSize} color={iconColor} />;
    }
    if(evilicons) {
        return <EvilIcons name={iconName} size={iconSize} color={iconColor} />;
    }
    if(antDesign) {
        return <AntDesign name={iconName} size={iconSize} color={iconColor} />;
    }
    return <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />;
}